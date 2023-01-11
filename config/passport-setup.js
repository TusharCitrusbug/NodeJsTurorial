require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

passport.use(new GoogleStrategy(
    {
        callbackURL: process.env.GOOGLE_REDIRECT_URL,
        clientID: process.env.OAUTH_CLIENT_ID,
        clientSecrate: process.env.OAUTH_CLIENT_SECRATE,
    },
    () => {
        // console.log(profile);
        console.log("profile");

    })
)