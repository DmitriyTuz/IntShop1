const Router = require('express')
const router = new Router()
const basket_deviceController = require('../controllers/basket_deviceController')


router.post('/create', basket_deviceController.create)
router.get('/', basket_deviceController.getAll)
router.delete("/delete/:id", basket_deviceController.delete)
router.put("/edit", basket_deviceController.edit)
router.get('/:id', basket_deviceController.getOne)

module.exports = router