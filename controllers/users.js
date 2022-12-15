require('dotenv').config();
const User = require('../models/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')

exports.create_user = (req, resp, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            resp.status(500).json({
                message: "Password Error!",
                error: err
            })
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
            });
            user.save().then(result => {
                resp.status(201).json({
                    message: "You have signup successfully !",
                })
            }).catch(error => {
                resp.status(500).json({
                    message: "Something went wrong !",
                    error: error
                })
            });

        }
    })
}


exports.login = (req, resp, next) => {
    User.find({ email: req.body.email }).exec().then(user => {
        if (user.length < 1) {
            resp.status(404).json({
                error: `We cound not find the user with email : ${req.body.email} or something went wrong !`,
            })
        } else {
            if (req.body.password) {

                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        resp.status(404).json({
                            message: `Login failed`,
                            error: err,
                        })
                    }
                    if (result) {
                        const token = jwt.sign({
                            email: user[0].email,
                            user_id: user[0]._id
                        }, process.env.JWT_KEY, {
                            expiresIn: "1h"
                        })
                        resp.status(201).json({
                            message: `Login Successfull`,
                            token: token    
                        })
                    }
                    else {
                        resp.status(500).json({
                            error: `Login Failed: password does not matched`,
                        })
                    }
                })
            }

        }
    }).catch(error => {
        resp.status(500).json({
            message: `You can not Login`,
            error: error
        })
    })
}

exports.delete_user = (req, resp, next) => {
    const id = req.params.user_id;
    User.remove({ _id: id }).exec().then(result => {
        resp.status(200).json({
            message: `User with id ${id} is deleted successfully`
        })
    }).catch(error => {
        resp.status(500).json({
            message: `Some thing went wrong with your order!`,
            error: error
        })
    })
}