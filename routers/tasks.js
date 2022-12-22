const express = require('express');
const controllers = require('../controllers/tasks')
const router = express.Router()


// async methods for task

router.post('/tasks', controllers.create_task)

router.get('/tasks', controllers.list_tasks)

router.get('/tasks/:id', controllers.task_get_by_id)

router.patch('/tasks/:id', controllers.patch_task)

// delete tasks by id
router.delete('/tasks/:id', controllers.delete_task)

module.exports = router
