const jwt = require('jsonwebtoken')
const User = require('../models/users')
require('dotenv').config();

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        const user = await User.findOne({ 'token': token })
        if (!user) {
            throw new Error()
        }
        
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({
            error: 'Please authenticate using provided token.',
        })
    }
}

module.exports = auth