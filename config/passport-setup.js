require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user')

exports.strategy = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRATE,
        callbackURL: process.env.GOOGLE_REDIRECT_URL,
    },
    (accessToken, refreshToken, profile, done) => {
        const id = profile.id
        const userName = profile.displayName
        User.findOne({ googleId: id }).then(user => {
            if (user) {
                done(null, user)
                console.log(`${user} is already exists.`);
            } else {
                new User({
                    userName: userName,
                    googleId: id
                }).save().then(newUser => {
                    done(null, newUser)
                })
            }
        })
        console.log("profile", profile);
    })
