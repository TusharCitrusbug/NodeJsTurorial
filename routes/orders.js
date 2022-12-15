const express = require('express')
const checkAuth = require('../middleware/check_auth')
const mongoose = require('mongoose')
require('dotenv').config();
const Order = require('../models/order');
const router = express.Router();
const OrderController = require('../controllers/orders')

router.get('/', checkAuth, OrderController.orders_list)

router.post('/place', checkAuth, OrderController.order_create)


router.get('/:order_id', checkAuth, OrderController.order_get_by_id)


router.patch('/:order_id', checkAuth, OrderController.order_patch)


router.delete('/:order_id', checkAuth, OrderController.order_delete)

module.exports = router;