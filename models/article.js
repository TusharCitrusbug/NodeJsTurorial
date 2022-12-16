const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify')
const createDomPurifier = require('dompurify');
const { JSDOM } = require('jsdom')
const dompurify = createDomPurifier(new JSDOM().window)
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
    },
    sanatizedHtml: {
        type: String,
        required: true
    }
})

articleSchema.pre('validate', (next) => {
    if (this.title) {
        console.log("here------------------------------------------");
        this.slug = slugify(this.title, { lower: true, strict: true })
    }
    if (this.markdown) {
        this.sanatizedHtml = dompurify.sanitize(marked(this.markdown));
    }
    next();
})

module.exports = mongoose.model('Article', articleSchema)