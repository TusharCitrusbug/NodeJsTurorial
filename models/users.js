require('dotenv').config();
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid')
                }
            }
        },
        age: {
            type: Number,
            default: 0,
            validate(value) {
                if (value < 0) {
                    throw new Error('Age must be a postive number')
                }
            }
        },
        password: {
            type: String,
            required: true,
            minlength: 7,
            validate(value) {
                if (value.toLowerCase().includes('password')) {
                    throw new Error('Password is invalid or it does not contains "password" keyword')
                }
            }
        },
        token: {
            type: String,
        },
        updated_at: { type: Date, default: new Date() },
        created_at: { type: Date, default: new Date() },
        isAdmin: {
            type: Boolean,
            default:false,
            require:true
        },
    })



userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}
userSchema.pre('save', async function (next) {
    const user = this
    this.updated_at = Date.now();
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

userSchema.methods.generateAuthToken = async (user) => {
    const token = jwt.sign({ _id: user.id }, process.env.JWT_KEY, { expiresIn: process.env.TOKEN_EXPIRATION })
    user.token = token
    await user.save()
    return token;
}
const User = mongoose.model('User', userSchema)
module.exports = User