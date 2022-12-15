// importing auth middleware
const checkAuth = require('../middleware/check_auth')
const express = require('express')
require('dotenv').config();
const ProductController = require('../controllers/products')

const storage_utils = require('../utils/storage')
const router = express.Router();
const multer = require('multer');

// included all components to multer 
const uploader = multer({
    storage: storage_utils.Storage('./media/'), limits: {
        fieldSize: 1024 * 1024 * 5
    }, fileFilter: storage_utils.FileFilter(['image/jpeg','image/png'])
})
// PRODUCT SCHEMA
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
router.get('/', ProductController.product_list)

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
router.post('/', checkAuth, uploader.single('product_image'), ProductController.product_create)


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
router.get('/:product_id', ProductController.product_get_by_id)


router.patch('/:product_id', checkAuth, ProductController.product_patch)


router.delete('/:product_id', checkAuth, ProductController.product_delete)

module.exports = router;