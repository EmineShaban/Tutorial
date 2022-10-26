const router = require('express').Router()
const { isAuth } = require('../middlewares/authMiddleware')
const courseServices = require('../services/courseServices')


router.get('/', async (req, res) => {
    if(!req.user) {
        let courseOffer = await courseServices.getAll().lean()
        courseOffer.sort((a, b) => b.usersEnrolled.length - a.usersEnrolled.length)
        courseOffer = courseOffer.slice(0, 3)
        console.log(courseOffer)
        res.render('home', { courseOffer }) 
        
    }else{
        let courseOffer = await courseServices.getAll().lean()
        courseOffer.sort((a, b) => b.created.length - a.created.length)
    
        res.render('home', { courseOffer }) 
    }
})

module.exports = router