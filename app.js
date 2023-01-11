require('./config/db_connector');
const express = require('express');
const authRoutes = require('./routes/auth-routes');
const cookieSession = require('cookie-session');
const passport = require('passport')
const app = express();
// set view engine
app.set('view engine', 'ejs');

// set up routes

app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[process.env.COOKIE_ENCRYPTION_KEY]
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRoutes);

// create home route
app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});