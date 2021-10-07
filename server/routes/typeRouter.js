const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')
const brandController = require("../controllers/brandController");

router.post('/', checkRole('ADMIN'), typeController.create)
router.get('/', typeController.getAll)
router.delete("/delete/:id", typeController.delete)
router.put("/edit", typeController.edit)
router.get('/:id', typeController.getOne)

module.exports = router