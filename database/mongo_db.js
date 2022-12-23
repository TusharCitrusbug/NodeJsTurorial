require('dotenv').config();
const mongoose = require('mongoose')

mongoose.connect(`mongodb://127.0.0.1:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
