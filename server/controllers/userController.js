const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User,Basket, Type, Rating} = require('../models/models')

const generateJwt = (id, email,role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async getAll(req, res) {
        const users = await User.findAll()
        return res.json(users)
    }

    async registration(req, res, next) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const basket = await Basket.create({userId: user.id})
//      const rating = await Rating.create({userId: user.id, deviceId: device.id}}
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async updatePassword(req, res, next) {
        const {email, newPassword} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        const hashPassword = await bcrypt.hash(newPassword, 5)
        await User.update({password: hashPassword},
            {
                where: {email}
            })
/*        const token = generateJwt(user.id, user.email)
        return res.json({token})*/
        return res.json({user})
}

/*        if(user.password) {
            let comparePassword = bcrypt.compareSync(password, user.password)

            if (!comparePassword) {
                return next(ApiError.internal('Указан неверный пароль'))
            }
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }*/

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)

        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }

        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt((req.user.id, req.user.email, req.role))
        return res.json({token})
    }

    async passwordReset(req, res) {
        let {id} = req.body
        const user = User.update({password: null}, {where: {id}})
        return res.json("reset completed !")
    }


/*    const Sequelize = require('sequelize');
    const Op = Sequelize.Op;*/



    async findByPartOfEmail (req, res) {
//        let {} = req.query
//        const user = await User.findAll({ where: { email: "user1@mail.ru" } })
        const user = await User.findAll({ where: { email: { [Op.like]: `%${req.query.email}%` } } })
//        const user = await User.findAll({ where: { email: { [Op.like]: '%12%' } } })
        return res.json(user)
    }
}

module.exports = new UserController()