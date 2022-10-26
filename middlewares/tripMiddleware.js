const courseServices = require('../services/courseServices')


exports.preloadTrip = async (req, res, next) => {
    const course = await courseServices.getOne(req.params.courseID).lean()

    req.course = course

    next()
}

exports.isTripAuthor = async (req, res, next) => {
    const course = await courseServices.getOne(req.params.courseID).lean()
    // console.log(req.user._id)
    // console.log(course)
    if (course?.owner != req.user._id) {
        return next({ message: 'You are not authorized', status: 401 })
    }
    next()
}