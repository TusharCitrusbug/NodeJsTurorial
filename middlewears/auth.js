const jwt = require('jsonwebtoken')
const User = require('../models/users')
require('dotenv').config();

const auth = async (req, res, next) => {
    if (process.env.TOKEN_AUTH === 'enabled') {
        try {
            const token = req.header('Authorization').replace('Bearer ', '')
            const decoded = jwt.verify(token, process.env.JWT_KEY)
            let user = await User.findOne({ token })
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
    } else {
        next()
    }
}

module.exports = auth