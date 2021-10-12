const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')


router.post('/create', basketController.create)
router.get('/', basketController.getAll)
router.delete("/delete/:id", basketController.delete)
router.put("/edit", basketController.edit)
router.get('/:id', basketController.getOne)

module.exports = router