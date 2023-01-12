require('./config/db_connector');
const express = require('express');
const authRoutes = require('./routes/auth-routes');
require('./config/passport-setup');
const cookieSession = require('cookie-session');
const session = require('express-session')
const passport = require('passport')
const app = express();
const { logged_in_event, logged_out_event } = require('./events');

logged_in_event.emit("loggedIn", { tushar: 'tusar' })
logged_out_event.emit("loggedOut", { tushar: 'tusar' })

// set view engine
app.set('view engine', 'ejs');
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_ENCRYPTION_KEY],
}))
// set up routes

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

// create home route
app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});