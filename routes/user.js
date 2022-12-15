require('dotenv').config();
const express = require('express')
const router = express.Router();
const UserController = require('../controllers/users')

router.post('/signup', UserController.create_user)


router.post('/login', UserController.login)

router.delete('/:user_id', UserController.delete_user)

module.exports = router;