const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify')
const createDomPurifier = require('dompurify');
const { JSDOM } = require('jsdom')
const articleSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    markdown: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    slug: {
        required: true,
        unique: true,
        type: String
    }
})

articleSchema.pre('validate', (next) => {
    if (this.title) {
        console.log("here------------------------------------------");
        this.slug = slugify(this.title, { lower: true, strict: true })
    }
    next();
})

module.exports = mongoose.model('Article', articleSchema)