require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user')
const passport = require('passport')

passport.serializeUser((user, done) => {
    done(user._id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user)
    })
})

const strategy = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRATE,
        callbackURL: process.env.GOOGLE_REDIRECT_URL,
    },
    (accessToken, refreshToken, profile, done) => {
        const id = profile.id
        const userName = profile.displayName
        User.findOne({ googleId: id }).then(currentUser => {
            if (currentUser) {
                console.log(`${currentUser} is already exists.`);
                done(null, currentUser)
            } else {
                new User({
                    userName: userName,
                    googleId: id
                }).save().then(newUser => {
                    done(null, newUser)
                })
            }
        })
    })
passport.use(strategy)