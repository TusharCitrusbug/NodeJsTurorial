require('dotenv').config();
const Task = require('../models/tasks');
const csv_ganerator = require('../utils/csv_generator')
const QueryString = require('querystring');
const url = require('url');
exports.create_task = async (req, res) => {
    if (!req.file) {
        res.status(404).json({
            error: "Uploaded file should not be empty or sould be with required mimetype jpg/png.",
        })
    }
    req.body.task_image = req.file.path
    const task = new Task(req.body)
    task.addOwner(req.user.id, task)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
}

exports.list_tasks = async (req, res) => {
    let filter_obj = QueryString.parse(url.parse(req.url).query)
    let page_size = parseInt(filter_obj.page_size);
    let page_no = parseInt(filter_obj.page_no);

    try {
        if (req.user.isAdmin) {
            let updatedTasks = []
            let tasks = await Task.find(filter_obj).select('title description completed owner createdAt updatedAt task_image').populate('owner', 'name email age').limit(page_size).skip((page_no - 1) * page_size)
            tasks.forEach((task) => {
                let newObj = { ...task.toObject() }
                newObj.detailUrl = `${process.env.HOST_URL}tasks/${task.id}`
                updatedTasks.push(newObj)
            });
            let paginate_obj = {};
            if (filter_obj.page_size && filter_obj.page_no) {
                if (!(tasks.length % page_size === tasks.length)) {
                    paginate_obj.next_page = `${process.env.HOST_URL}tasks?page_no=${page_no + 1}&page_size=${filter_obj.page_size}`
                }
                if (page_no !== 1) {
                    paginate_obj.previous_page = `${process.env.HOST_URL}tasks?page_no=${page_no - 1}&page_size=${page_size}`
                }
                updatedTasks.push(paginate_obj)
            }
            res.send(updatedTasks)
        } else {
            let updatedTasks = []
            filter_obj.owner = req.user.id
            let task = await Task.find(filter_obj).select('title description completed owner createdAt updatedAt').populate('owner', 'name email age').limit(page_size).skip((page_no - 1) * page_size)
            res.send(task)
        }
    } catch (e) {
        res.status(500).send(e)
    }
}

exports.get_tasks_csv = async (req, res) => {
    let filter_obj = QueryString.parse(url.parse(req.url).query)
    filter_obj.owner = req.user.id
    try {
        let tasks = await Task.find(filter_obj).select('title description completed owner createdAt updatedAt')
        let tasksForCsv = []
        tasks.forEach(task => {
            tasksForCsv.push(task.toObject())
        })
        let csv_path = csv_ganerator.csvGenerator(tasksForCsv, 'task_csv')
        res.send({ message: "Csv generated successfully !", path: csv_path })
    } catch (e) {
        res.status(500).send(e)
    }
}

exports.task_get_by_id = async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id).select('title description completed owner createdAt updatedAt task_image').populate('owner', 'name email age')
        if (!task) {
            return res.status(404).send("sorry task not found please check the id you've entered !")
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
}

exports.patch_task = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!task) {
            return res.status(404).send("sorry task not found please check the id you've entered !")
        }

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
}


exports.delete_task = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            res.status(404).send("sorry task not found please check the id you've entered !")
        }

        res.send(`Task with title ${task.title} is deleted successfully !`)
    } catch (e) {
        res.status(500).send()
    }
}