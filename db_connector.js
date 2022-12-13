const express = require('express');
const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/econ_db", {
    useNewUrlParser: true, useUnifiedTopology: true,useMongoClient:true
}, (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("database is successfully connected");
    }
})

module.exports = mongoose