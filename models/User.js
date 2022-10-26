const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { SALT_ROUNDS } = require('../config/env')
const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        match: [/^[a-zA-Z0-9]+$/i, 'Username may contain only english letters and numbers']
    },
    password: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9]+$/i, 'Password may contain only english letters and numbers']

    },
    enrolledCourses: {
        type: String,
    }
})

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, SALT_ROUNDS)
        .then(hashedPassword => {

            this.password = hashedPassword
            next()
        })
})

const User = mongoose.model('User', userSchema)

module.exports = User
