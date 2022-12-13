const express = require('express')

const router = express.Router();

const dummy_array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
router.get('/', (req, resp, next) => {
    resp.status(200).json({
        message:"Handling GET requests to /orders"
    })
})

router.post('/place', (req, resp, next) => {
    const order = {
        id: req.body.id,
        quantity: req.body.quantity,

    }
    resp.status(200).json({
        message:"Handling POST requests to /orders",
        createdOrder:order
    })
})


router.get('/:order_id', (req, resp, next) => {
    const id = req.params.order_id;

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


router.patch('/:order_id', (req, resp, next) => {
    resp.status(200).json({
        message:"Handling PATCH requests to /orders"
    })
})


router.delete('/:order_id', (req, resp, next) => {
    resp.status(200).json({
        message:"deleted successfully"
    })
})

module.exports = router;