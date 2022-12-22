const express = require('express');
const controllers = require('../controllers/tasks')
const router = express.Router()
const auth = require('../middlewears/auth')


// async methods for task

router.post('/tasks',auth, controllers.create_task)

router.get('/tasks',auth, controllers.list_tasks)

router.get('/tasks/:id',auth, controllers.task_get_by_id)

router.patch('/tasks/:id',auth, controllers.patch_task)

// delete tasks by id
router.delete('/tasks/:id',auth, controllers.delete_task)

module.exports = router
