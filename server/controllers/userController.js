const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const nodemailer = require("nodemailer");
const validator = require('validator');

const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User,Basket, Type, Rating} = require('../models/models')

const {createToken, verifyToken} = require("../utils/jwtToken");
const {hashPassword, comparePassword} = require("../utils/workPassword");

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

    async sendResetLink(req, res, next) {
        try {
            const { email } = req.body;
            const user = await User.findOne({where: { email } });
            if (!email) {
                return next(ApiError.badRequest('Email is required'))
            }
            if (!validator.isEmail(email)) {
                return next(ApiError.badRequest('Invalid email'))
            }
            if (!user) {
                return next(ApiError.badRequest('User not found'))
            }

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'dmitriytuz123@gmail.com',
                    pass: 'dimonchidimadim1',
                },
            })

            const token = createToken(user);
            const link = `${req.protocol}://localhost:5000/api/user/reset_password/${token}`
            let info = await transporter.sendMail({
                from: '"Node js" <nodejs@example.com>', // sender address
                to: "dmitriytuz123@gmail.com", // list of receivers
                subject: "Your IntShop password reset !", // Subject line
//                text: "Your IntShop password reset", // plain text body
                html: `<div>Click the link below to reset your password</div></br>
                       <div>${link}</div>
                      `

            });
            console.log("Message sent: %s", info.messageId);
            return res.status(200).send({message: 'Password reset link has been successfully sent to your inbox' })

        } catch (e) {
            return next (new Error(e));
        }
    }

    async getFormForNewPassword(req, res, next) {
// redirect('updatePassword.html');
        return res.status(200).send('Переходим к форме для введения нового пароля !');
    }

    async updatePassword(req, res, next) {
        try {
            const { password } = req.body;
            const { token } = req.params;
            const decoded = verifyToken(token);
            const hash = hashPassword(password)
            const decodedPassword = req.body.password;
            const updatedUser = await User.update(
                { password: hash },
                {
                    where: { id: decoded.id },
                    returning: true,
                    plain: true
                }
            )
            return res.status(200).send({ token, user: updatedUser[1], decodedPassword });

        } catch (e) {
            return next(new Error(e));
        }
    }

}

module.exports = new UserController()