const express = require('express')

const router = express.Router();

const dummy_array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]

router.get('/', (req, resp, next) => {
    resp.status(200).json({
        message:"Handling GET requests to /products"
    })
})


router.post('/', (req, resp, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price,

    }
    resp.status(200).json({
        message:"Handling POST requests to /products",
        createdProduct:product
    })
})


router.get('/:product_id', (req, resp, next) => {
    const id = req.params.product_id;

    if (dummy_array.includes(Number(id))) {
        resp.status(200).json({
            message:`Congrats you have entered id -> ${id} correctly!`,
            id:id
        })
    }else{
        resp.status(400).json({
            message:`Oops!!! Your id -> ${id} is wrong!`
        })
    }
})


router.patch('/:product_id', (req, resp, next) => {
    resp.status(200).json({
        message:"Handling PATCH requests to /products"
    })
})


router.delete('/:product_id', (req, resp, next) => {
    resp.status(200).json({
        message:"deleted successfully"
    })
})

module.exports = router;