const mongoose = require('mongoose')
require('dotenv').config();
const Product = require('../models/product');


exports.product_list = (req, resp, next) => {
    Product.find().select('name price _id product_image').exec().then(result => {
        const response = {
            count: result.length,
            products: result.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    product_image: doc.product_image,
                    request: {
                        type: 'GET',
                        url: `http://${process.env.PROJECT_HOST}:${process.env.PROJECT_PORT}/products/${doc._id}`
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


exports.product_create = (req, resp, next) => {
    if (!req.file) {
        resp.status(404).json({
            error: "Uploaded file should not be empty or sould be with required mimetype jpg/png.",
        })
    }
    // ading the product into the model
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        product_image: req.file.path
    });

    product.save().then(result => {
        console.log("success");
        resp.status(200).json({
            message: "Handling POST requests to /products",
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                product_image: req.file.path,
                request: {
                    type: 'GET',
                    url: `http://${process.env.PROJECT_HOST}:${process.env.PROJECT_PORT}/products/${result._id}`

                }
            }
        })
    }).catch(err => {
        console.log(err, "error");
        resp.status(404).json({
            message: "Something went wrong !",
            error: err
        })
    });
}



exports.product_get_by_id = (req, resp, next) => {
    const id = req.params.product_id;
    Product.findById(id).exec().then(result => {
        console.log("success");
        resp.status(200).json({
            message: `You got your product for id ${id} successfully!`,
            data: result
        })
    }).catch(err => {
        console.log(err, "error");
        resp.status(400).json({
            message: `Oops!!! Your id -> ${id} is wrong!`,
            error: err
        })
    })
}



exports.product_patch = (req, resp, next) => {
    const id = req.params.product_id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.updateOne({ _id: id }, { $set: updateOps }).exec().then(result => {
        resp.status(200).json({
            message: `your product ${id} is updated successfully`,
            result: updateOps
        })
    }).catch(error => {
        resp.status(500).json({
            message: `Something went wrong !`,
            error: error
        })
    })
}



exports.product_delete = (req, resp, next) => {
    const id = req.params.product_id;
    Product.remove({ _id: id }).exec().then(result => {
        console.log(result);
        resp.status(200).json({
            message: `Your product ${id} is deleted successfully`
        })
    }).catch(error => {
        resp.status(500).json({
            message: `Some thing went wrong !`,
            error: error
        })
    })

}
