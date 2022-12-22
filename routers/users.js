const controllers = require('../controllers/users')
const express = require('express');

const auth = require('../middlewears/auth')
const router = express.Router()

// async methods for user

router.post('/users', controllers.create_user)

router.get('/users',auth, controllers.list_user)

router.get('/users/:id',auth, controllers.get_user_by_id)

// update user by id
router.patch('/users/:id',auth, controllers.patch_user)

// delete user
router.delete('/users/:id',auth, controllers.delete_user)

router.post('/users/login', controllers.login_user)
router.post('/users/log_out',auth, controllers.log_out)


module.exports = router
