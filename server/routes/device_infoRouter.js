const Router = require('express')
const router = new Router()
const device_infoController = require('../controllers/device_infoController')

router.get('/', device_infoController.getAll)
//router.get('/find/:id', deviceController.getOne)

//router.put('/UpdateFieldInfoInDevice', deviceController.UpdateFieldInfoInDevice)

module.exports = router