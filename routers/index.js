
const router = require('express').Router()
const errorHandler = require('../middlewares/errorHandler')
const AuthController = require('../controllers/authController')

router.post('/login', AuthController.login)
router.post('/register', AuthController.register)
// router.post('/google-login', AuthController.googleLogin)

//error handler
router.use(errorHandler)

module.exports = router
