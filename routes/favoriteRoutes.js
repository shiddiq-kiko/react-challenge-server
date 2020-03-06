const router = require('express').Router()
const {auth} = require('../middlewares/authentification')
const {check} = require('../middlewares/authorization')
const favoriteController = require('../controllers/favoriteController')

router.use(auth)
router.post('/', check, favoriteController.inputFavorite)
router.get('/', check, favoriteController.readFavorite)
router.delete('/', check, favoriteController.deleteFavorite)

module.exports = router