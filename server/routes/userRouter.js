const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')



router.get('/', userController.getAll)
router.get('/findByPartOfEmail', userController.findByPartOfEmail)

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)

router.put('/PasswordReset', userController.passwordReset)
router.put('/updatePassword', userController.updatePassword)


module.exports = router