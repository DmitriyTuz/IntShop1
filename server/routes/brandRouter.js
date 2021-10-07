const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
const deviceController = require("../controllers/deviceController");

router.post('/', brandController.create)
router.get('/', brandController.getAll)
router.delete("/delete/:id", brandController.delete);
router.put("/edit", brandController.edit);
router.get('/:id', brandController.getOne)

module.exports = router