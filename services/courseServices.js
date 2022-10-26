const Course = require('../models/Course')


exports.create = (CourseData) => Course.create(CourseData)
exports.getAll = () => Course.find()
exports.getOne = (CourseID) => Course.findById(CourseID)
// exports.getOneDetailed = (CourseID) => Course.findById(CourseID)
exports.delete = (CourseID) => Course.deleteOne({ _id: CourseID })
exports.update = (CourseID, CourseData) => Course.updateOne({ _id: CourseID }, { $set: CourseData }, { runValidators: true })
// exports.updateOne = (CourseID, seatsNew) => Course.updateOne({ _id: CourseID }, { $set: { "seats" : seatsNew } }, { runValidators: true })
// exports.addBuddies = (CourseID, userId) => Course.updateOne({ _id: CourseID }, { $push: { "Buddies" : userId } }, { runValidators: true })
// // exports.addBuddies = (CourseID, userId) => Course.updateOne({_id: CourseID}, {$push: {Buddies: userId}})

// exports.getCourseByID = (userId) => Course.find({CoursesHistory: userId})
exports.updateRooms = (CourseID, CourseData) => Course.updateOne({ _id: CourseID }, { $set: CourseData }, { runValidators: true })
exports.addcourse = (userId, tripID) => Course.updateOne({_id: userId}, {$push: {usersEnrolled: tripID}})
