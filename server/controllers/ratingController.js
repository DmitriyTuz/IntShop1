const sequelize = require('../db')
const {Rating} = require('../models/models')
const ApiError = require('../error/ApiError');

class RatingController {

/*// sequelize
    async create(req, res) {
        const {userId, deviceId, rate} = req.body
        const rating = await Rating.create({userId, deviceId, rate})
        return res.json(rating)
    }*/

// SQL
    async create(req, res) {
//        const {userId, deviceId, rate} = req.body
        let query = `INSERT INTO "ratings"("userId", "deviceId", "rate", "createdAt", "updatedAt") VALUES (${req.body.userId}, ${req.body.deviceId}, ${req.body.rate}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`
        const rating = await sequelize.query(query)
        return res.json(rating[0])
    }

/* // sequelize
    async getAll(req, res) {
        const rating = await Rating.findAll()
        return res.json(rating)
    }*/

 // SQL
    async getAll(req, res) {
        let query = 'SELECT * FROM "ratings"';
        const rating = await sequelize.query(query);
        return res.json(rating[0])
    }

/*// sequelize
    async delete(req, res) {
        await Rating.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.send("успешное удаление")
    }*/

// SQL
    async delete(req, res) {
        let query = `DELETE FROM "ratings" WHERE id = ${req.params.id}`
        await sequelize.query(query)
        return res.send("успешное удаление")
    }

/* // sequelize
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
    }*/

// SQL
    async edit(req, res) {
        let query = `UPDATE "ratings" SET rate = ${req.body.rate} WHERE "userId" = ${req.body.userId} AND  "deviceId" = ${req.body.deviceId}`
        await sequelize.query(query)
        return res.send("успешное обновление")
    }

    /* async edit(req, res) {
        await Rating.sequelize.query(`UPDATE rating SET rate = "${req.body.rate}" WHERE userId = "${req.body.userId}" AND deviceId = "${req.body.deviceId}"`,
            function(err, results, fields) {
                console.log(err);
                console.log(results); // собственно данные
                console.log(fields); // мета-данные полей
            })

        );
        return res.send("успешное обновление")
    }*/

/*// sequelize
    async getOne(req, res) {
        const {id} = req.params
        const rating = await Rating.findOne(
            {
                where: {id}
            }
        )
        return res.json(rating)
    }*/

// SQL
    async getOne(req, res) {
        let query = `SELECT * FROM "ratings" WHERE id = ${req.params.id}`
        const rating = await sequelize.query(query)
        return res.json(rating[0])
    }

}

module.exports = new RatingController()