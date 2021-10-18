const {Basket, BasketDevice, Device} = require('../models/models')
const ApiError = require('../error/ApiError');

class BasketController {
    async create(req, res) {
        let {userId} = req.body
        const basket = await Basket.create({userId})
        return res.json(basket)
    }

    async getAll(req, res) {
        const baskets = await Basket.findAll()
        return res.json(baskets)
    }

    async delete(req, res) {
        await Basket.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.send("успешное удаление")
    }

    async edit(req, res) {
        await Basket.update(
            {
                userId: req.body.userId
            },
            {
                where: { id: req.body.id }
            }
        );
        return res.send("успешное обновление")
    }

    async getOne(req, res) {
        const {id} = req.params
        const basket = await Basket.findOne(
            {
                where: {id}
            }
        )
        return res.json(basket)
    }

    async getBasketWithDevises(req, res) {
        let res1 = await Basket.findOne({attributes: ["id"],
            include: [{
                model: BasketDevice, attributes:["basketId"],
                required: false,
                include: [{
                    model: Device, attributes:["name", "price", "rating"],
                    required: false
                }]
            }]
        })
        // let res2 = await db.book.findAll({where: {res1}}, {include: [{model: db.autor, attributes:['name']}]})
        return res.json(res1)
    };

}

/*exports.getBasketWithDevises = async function(req, res) {

    let res1 = await Basket.findAll({attributes: ["id"],
        include: [{
            model: BasketDevice, attributes:["basketId"],
            required: false,
            include: [{
                model: Device, attributes:["id", "name", "price", "rating"],
                required: false
            }]
        }]
    })
    // let res2 = await db.book.findAll({where: {res1}}, {include: [{model: db.autor, attributes:['name']}]})
    return res.json(res1)
};*/

/*exports.getUsersWithBooksAndAutor = async function(req, res) {

    let res1 = await db.user.findAll({attributes: ["id","first_name"],
        include: [{
            model: db.book, attributes:["name"],
            required: false,
            include: [{
                model: db.autor, attributes:["name"],
                required: false
            }]
        }]
    })
    // let res2 = await db.book.findAll({where: {res1}}, {include: [{model: db.autor, attributes:['name']}]})
    return res.json(res1)
};*/

module.exports = new BasketController()