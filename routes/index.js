const express = require('express')
const router = express.Router()
const homePageController = require('../controllers/homePage')
const authController = require('../controllers/auth')

router.get('/', homePageController.getHomePage)
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.getLogout)
router.get('/register', authController.getRegister)
router.post('/register', authController.postRegister)

module.exports = router