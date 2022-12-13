const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/econ_db", {
    useNewUrlParser: true, useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log(err.message,"errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
    } else {
        console.log("database is successfully connected");
    }
})

module.exports = mongoose