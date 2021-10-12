const Router = require('express')
const router = new Router()
const ratingController = require('../controllers/ratingController')


router.post('/create', ratingController.create)
router.get('/', ratingController.getAll)
router.delete("/delete/:id", ratingController.delete)
router.put("/edit", ratingController.edit)
router.get('/:id', ratingController.getOne)

module.exports = router