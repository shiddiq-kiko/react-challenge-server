const router = require('express').Router()
const favoriteRoutes = require('./favoriteRoutes')
const userController = require('../controllers/userController')
const errorHandler = require('../middlewares/errorHandler')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.use('/favorites', favoriteRoutes)
router.use(errorHandler)

module.exports = router