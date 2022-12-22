const controllers = require('../controllers/users')
const express = require('express');

const router = express.Router()

// async methods for user

router.post('/users', controllers.create_user)

router.get('/users', controllers.list_user)

router.get('/users/:id', controllers.get_user_by_id)

// update user by id
router.patch('/users/:id', controllers.patch_user)

// delete user
router.delete('/users/:id', controllers.delete_user)

router.post('/users/login', controllers.login_user)

module.exports = router
