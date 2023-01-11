const router = require('express').Router();
const passportSetup = require('../config/passport-setup')
const passport = require('passport')
const User = require('../models/user')


passport.serializeUser((user, done) => {
    done(user._id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null,user)
    })
})
passport.use(passportSetup.strategy)
// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    res.send('logging out');
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));


// callback handler for google redirect
router.get('/google/redirect', passport.authenticate('google'), (req, resp) => {
    console.log(req.query)
    resp.send('you reached the callback URI')
})
module.exports = router;