const router = require('express').Router()
const { isAuth, isGueat } = require('../middlewares/authMiddleware')
const { getErrorMessage } = require('../utils/errorHelper')
const courseServices = require('../services/courseServices')
const userService = require('../services/userService')
const { preloadTrip, isTripAuthor } = require('../middlewares/tripMiddleware')

router.get('/create', isAuth, (req, res) => {
    res.render('course/create')
})


router.post('/create', isAuth, async (req, res) => {
    // console.log(req.body)
    // if(req.body.course.length <4 ){
    //     return res.render('auth/register', { error: "course name must be at leats 4 characters long!" })
    // }
    // if(req.body.city.length <3 ){
    //     return res.render('auth/register', { error: "course name must be at leats 3 characters long!" })
    // }
    try {
        const course = await courseServices.create({ ...req.body, owner: req.user })
        // const course = await courseServices.create({ ...req.body })

        // await userService.addTrip(req.user._id, course._id)
        // console.log(req.body)
        res.redirect('/')
    } catch (error) {
        // const course = await courseServices.create({ ...req.body, owner: req.user })
// let coursel = req.body
        return res.render('course/create', { error: getErrorMessage(error), course:req.body })
    }
})

router.get(
    '/:courseID/details',
    isAuth,
    async (req, res) => {
        try {
            const course = await courseServices.getOne(req.params.courseID).lean()
            
            // const user = await userService.getOne(req.user?._id).lean()
            const isAuthor = course.owner == req.user?._id
            const isAlreadyJoin = course.usersEnrolled?.find(element => element == req.user?._id) == req.user?._id
            // console.log(isAlreadyJoin)
            res.render('course/details', { ...course, isAuthor, isAlreadyJoin })
        } catch (error) {
            return res.render(`course/details`, { error: getErrorMessage(error) })
        }
    })


router.get(
    '/:courseID/delete',
    isAuth,
    isTripAuthor,
    async (req, res) => {
        await courseServices.delete(req.params.courseID)
        res.redirect('/')
    })

router.get(
    '/:courseID/edit',
    isAuth,
    isTripAuthor,
    async (req, res) => {
        try {
            const course = await courseServices.getOne(req.params.courseID).lean()
            res.render('course/edit', { ...course })
        } catch (error) {
            return res.render(`course/details`, { error: getErrorMessage(error) })
        }
    })


router.post(
    '/:courseID/edit',
    isAuth,
    isTripAuthor,
    async (req, res) => {
        try {
            await courseServices.update(req.params.courseID, req.body)
            res.redirect(`/course/${req.params.courseID}/details`)
        } catch (error) {
            res.render('course/edit', { ...req.body, error: getErrorMessage(error) })
        }
    })

router.get(
    '/:courseID/join',
    isAuth,
    preloadTrip,
    async (req, res) => {
        try {
            await courseServices.addcourse(req.course._id, req.user._id)

            // console.log(req.course._id)
            // req.course.freeRooms -= 1
            // await courseServices.updateRooms(req.params.courseID, req.course)
            res.redirect(`/course/${req.params.courseID}/details`)
        } catch (error) {
            res.render(`course/${req.params.courseID}/details`, { ...req.body, error: getErrorMessage(error) })
        }
    })


router.get('*', (req, res) => {
    res.render('404')
})

module.exports = router