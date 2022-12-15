const mongoose = require('mongoose')
const Order = require('../models/order');
require('dotenv').config();

// controller for order list
exports.orders_list = (req, resp, next) => {
    Order.find().select('quantity product _id').populate('product').exec().then(result => {
        const response = {
            count: result.length,
            products: result.map(doc => {
                return {
                    quantity: doc.quantity,
                    product: doc.product,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: `http://${process.env.PROJECT_HOST}:${process.env.PROJECT_PORT}/orders/${doc._id}`
                    }
                }
            })
        };
        resp.status(200).json(response)
    }).catch(error => {
        resp.status(400).json({
            message: "Something went wrong !",
            errors: error
        })
    })
}

// controller for  order_create
exports.order_create = (req, resp, next) => {
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.product_id
    });
    order.save().then(result => {
        resp.status(200).json({
            message: "Handling POST requests to /orders",
            createdOrder: {
                name: result.name,
                price: result.price,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: `http://${process.env.PROJECT_HOST}:${process.env.PROJECT_PORT}/orders/${result._id}`

                }
            }
        })
    }).catch(error => {
        resp.status(500).json({
            message: "Something went wrong !",
            error: error
        })
    });
}

// controller for order_get_by_id
exports.order_get_by_id = (req, resp, next) => {
    const id = req.params.order_id;
    Order.findById(id).populate('product').exec().then(result => {
        resp.status(200).json({
            message: `You got your order for id ${result._id}.`,
            data: result
        })
    }).catch(error => {
        resp.status(400).json({
            message: `Oops!!! Your order ${id} not found!`,
            error: error
        })
    })
}

// controller for order_patch
exports.order_patch = (req, resp, next) => {
    const id = req.params.order_id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Order.updateOne({ _id: id }, { $set: updateOps }).exec().then(result => {
        resp.status(200).json({
            message: `your Order ${id} is updated successfully`,
            result: updateOps
        })
    }).catch(error => {
        resp.status(500).json({
            message: `Something went wrong !`,
            error: error
        })
    })
}

// controller for order_delete
exports.order_delete = (req, resp, next) => {
    const id = req.params.order_id;
    Order.remove({ _id: id }).exec().then(result => {
        resp.status(200).json({
            message: `Your Order ${id} is deleted successfully`
        })
    }).catch(error => {
        resp.status(500).json({
            message: `Some thing went wrong with your order!`,
            error: error
        })
    })
}
