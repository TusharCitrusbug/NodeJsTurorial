const express = require('express');
const app = express();
const ArticalRouter = require('./routes/articals');
const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override')
// db connection

mongoose.connect('mongodb://localhost:27017/blog_db', { useNewUrlParser: true, useUnifiedTopology: true })
app.set('view engine', 'ejs');
app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use('/articles', ArticalRouter);

app.get('*', (req, resp) => {
    resp.render('404')
})
app.listen(8000);