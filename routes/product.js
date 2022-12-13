const express = require('express')
const mongoose = require('mongoose')

const Product = require('../models/product');
const router = express.Router();

router.get('/', (req, resp, next) => {
    Product.find().exec().then(result=>{
        resp.status(200).json({
            message: "Handling GET requests to /products",
            products:result
        })
    }).catch(error=>{
        resp.status(400).json({
            message: "Something went wrong !",
            errors:error
        })
    })
    
})

// create product
router.post('/', (req, resp, next) => {
    // ading the product into the model
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product.save().then(result => {
        console.log("success");
    }).catch(err => {
        console.log(err, "error");
    });
    resp.status(200).json({
        message: "Handling POST requests to /products",
        createdProduct: product
    })
})

// get a product by id 
router.get('/:product_id', (req, resp, next) => {
    const id = req.params.product_id;
    Product.findById(id).exec().then(result => {
        console.log("success");
        resp.status(200).json({
            message: `Congrats you have entered id -> ${id} correctly!`,
            data: result
        })
    }).catch(err => {
        console.log(err, "error");
        resp.status(400).json({
            message: `Oops!!! Your id -> ${id} is wrong!`,
            error: err
        })
    })
})


router.patch('/:product_id', (req, resp, next) => {
    resp.status(200).json({
        message: "Handling PATCH requests to /products"
    })
})


router.delete('/:product_id', (req, resp, next) => {
    resp.status(200).json({
        message: "deleted successfully"
    })
})

module.exports = router;