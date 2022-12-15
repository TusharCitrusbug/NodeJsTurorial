const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const mongoose = require('mongoose');
const slugify = require('slugify')

router.get('/', (req, resp,) => {

    Article.find().exec().then(results => {
        resp.render('articles/index', { articles: results })
    }).catch(error => {
        console.log(error);
    })
})

router.get('/article/:slug', (req, resp,) => {
    const slug = req.params.slug;
    Article.findOne({ slug: slug }).exec().then(result => {
        resp.render('articles/get_article', { article: result })
    }).catch(error => {
        resp.render('articles', { error: error })
    })
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
        slug: slugify(req.body.title, { lower: true, strict: true })
    });
    article.save().then(result => {
        resp.redirect(`/articles/article/${result.slug}`)
    }).catch(error => {
        console.log(error);
        resp.render('articles/new', { article: article, error: error })
    })

})

router.post('/update/:blog_id', (req, resp,) => {
    resp.send("updateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
})


router.delete('/delete/:blog_id', (req, resp,) => {
    resp.send("deleteeeeeeeeeeeeeeeeeeeeeeeeeee")
})

module.exports = router