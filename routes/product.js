const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
const Product = require('../models/product');
const router = express.Router();
const multer = require('multer');
// created storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './media/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname);
    }
})

// added file filtration for muletr
const fileFilter = (req, file, cb) => {
    // reject file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

// included all components to multer 
const upload = multer({
    storage: storage, limits: {
        fieldSize: 1024 * 1024 * 5
    }, fileFilter: fileFilter
})

/**
 * @swagger
 * components:
 *   schemas:
 *      Products:
 *          type: object
 *          required:
 *              - name
 *              - price
 *          properties:
 *              name:
 *                  type : string
 *                  description : Name of the product.
 *              price:
 *                  type : integer
 *                  description : Price of the product.
 *          example:
 *              id : 6399595439ea2bddb8ab5965
 *              name: product name
 *              price: 78888
 *      ApiResponse:
 *          type: object
 *          properties:
 *              code:
 *                  type: integer
 *                  format: int32
 *              type:
 *                  type: string
 *              message:
 *                  type: string
 *          xml:
 *              name: '##default'
*/



/**
 * @swagger
 * /products:
 *  get:
 *      summery: Rerturns all products list.
 *      tags: [Products]
 *      responses: 
 *          200:
 *              description: The list of the products.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/Products'
 */
router.get('/', (req, resp, next) => {
    Product.find().select('name price _id product_image').exec().then(result => {
        const response = {
            count: result.length,
            products: result.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    product_image:doc.product_image,
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

})

/**
 * @swagger
 * /products:
 *  post:
 *      summery: Create a new product.
 *      tags: [Products]
 *      requestBody:
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Products'
 *      responses: 
 *          200:
 *              description: successful operation
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ApiResponse'
 *          404:
 *              description: Something went wrong.
 */
router.post('/', upload.single('product_image'), (req, resp, next) => {
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
})


/**
 * @swagger
 * /products/{id}:
 *  get:
 *      summery: Rerturns product by id.
 *      tags: [Products]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: This is the id for the product.
 *      responses: 
 *          200:
 *              description: Product by id.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Products'
 *          400:
 *              description: The book was not found.
 */


// get a product by id 
router.get('/:product_id', (req, resp, next) => {
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
})


router.patch('/:product_id', (req, resp, next) => {
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
})


router.delete('/:product_id', (req, resp, next) => {
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

})

module.exports = router;