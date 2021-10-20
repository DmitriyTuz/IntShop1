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
        let res1 = await Basket.findOne({attributes: [],
            include: [{
                model: BasketDevice, attributes:["id"],
                required: false,
                include: [{
                    model: Device, attributes:["name", "price", "rating"],
                    required: false
                }]
            }]
        })

        return res.json(res1)
    };

}


module.exports = new BasketController()