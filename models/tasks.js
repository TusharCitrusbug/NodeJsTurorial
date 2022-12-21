const mongoose = require('mongoose')
const validator = require('validator')
const Task = mongoose.model('Task', {
    title: {
        type: String,
        required: true, unique: true
    },
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

module.exports = Task