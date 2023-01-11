const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
        },
        googleId: {
            type: String,
            unique: true,
            required: true,
        }
    }, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)
module.exports = User
