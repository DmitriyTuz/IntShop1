const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')


router.get('/', basketController.getAll)
router.get('/find/:id', basketController.getOne)
router.get('/getBasketWithDevises', basketController.getBasketWithDevises)

router.post('/create', basketController.create)

router.put("/edit", basketController.edit)

router.delete("/delete/:id", basketController.delete)



module.exports = router