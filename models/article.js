const mongoose = require('mongoose');

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
    }
})



module.exports = mongoose.model('Article', articleSchema)