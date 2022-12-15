const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const mongoose = require('mongoose');

router.get('/', (req, resp,) => {

    Article.find().exec().then(results => {
        resp.render('articles/index', { articles: results })
    }).catch(error => {
        console.log(error);
    })
})

router.get('/article/:blog_id', (req, resp,) => {
    const id = req.params.blog_id;
    Article.findById(id).exec().then(result => {

    }).catch(error => {

    })
    resp.send(`articlekdfkljfksjdfk with id ${id}`)
})

router.get('/new', (req, resp,) => {
    resp.render('articles/new')
})

router.post('/create', (req, resp,) => {

    const article = new Article({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
    });
    article.save().then(result => {
        resp.redirect(`/articles/article/${result._id}`)
    }).catch(error => {
        resp.render('articles/new', { article: article, error: error })
    })

})

module.exports = router