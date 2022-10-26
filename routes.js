const router = require('express').Router()

const homeController = require('./controllers/homeController')
const authController = require('./controllers/authController')
const bookingController = require('./controllers/courseController')


router.use(homeController)
router.use('/auth', authController)
router.use('/course', bookingController)


module.exports = router