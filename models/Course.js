const mongoose = require('mongoose')
const validator = require('validator')
const URL_PATTERN = /^https?:\/\/.+$/i
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: [4, 'Title name must be at leats 4 characters long!']
    },
    description: {
        type: String,
        required: true,
        minlength: [20, 'Description must be at leats 20 characters long!'],
        maxlength: [50, 'Description must be at max 50 characters long!']

    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: (value) => URL_PATTERN.test(value),
            message: "Image URL is not valid!"
        }
    },
    duration: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        required: true,
        default: () => (new Date()).toISOString().slice(0, 10)
    },
    usersEnrolled: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
    }
})

const Course = mongoose.model('Course', courseSchema)
module.exports = Course
