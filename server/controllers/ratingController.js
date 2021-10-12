const {Rating} = require('../models/models')
const ApiError = require('../error/ApiError');

class RatingController {
    async create(req, res) {
        const {userId, deviceId, rate} = req.body
        const rating = await Rating.create({userId, deviceId, rate})
        return res.json(rating)
    }

    async getAll(req, res) {
        const rating = await Rating.findAll()
        return res.json(rating)
    }

    async delete(req, res) {
        await Rating.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.send("успешное удаление")
    }

    async edit(req, res) {
        await Rating.update(
            {
                rate: req.body.rate
            },
            {
                where: {
                        userId: req.body.userId,
                        deviceId: req.body.deviceId
                       }
            }
        );
        return res.send("успешное обновление")
    }

    async getOne(req, res) {
        const {id} = req.params
        const rating = await Rating.findOne(
            {
                where: {id}
            }
        )
        return res.json(rating)
    }
}

module.exports = new RatingController()