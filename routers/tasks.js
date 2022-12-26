const express = require('express');
const controllers = require('../controllers/tasks')
const router = express.Router()
const auth = require('../middlewears/auth')
const superUserAuth = require('../middlewears/superUserAuth')
const storage_utils = require('../utils/storage')

const multer = require('multer');

// included all components to multer 
const uploader = multer({
    storage: storage_utils.Storage('../static/media/'), limits: {
        fieldSize: 1024 * 1024 * 5
    }, fileFilter: storage_utils.FileFilter(['image/jpeg', 'image/png'])
})

// async methods for task

router.post('/tasks', auth,uploader.single('task_image'), controllers.create_task)

router.get('/tasks', auth, controllers.list_tasks)

router.get('/tasks/:id', auth, superUserAuth, controllers.task_get_by_id)

router.patch('/tasks/:id', auth, controllers.patch_task)

// delete tasks by id
router.delete('/tasks/:id', auth, superUserAuth, controllers.delete_task)

module.exports = router
