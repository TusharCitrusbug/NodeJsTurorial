require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.CLOUD_MONGO_DB_USER_NAME}:${process.env.CLOUD_MONGO_DB_PASSWORD}@cluster0.jg6kygs.mongodb.net/test`, () => {
    console.log("DATABASE is connected");
})