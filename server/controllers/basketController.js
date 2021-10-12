const {Basket} = require('../models/models')
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
}

module.exports = new BasketController()