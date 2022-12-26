require('dotenv').config();
const Task = require('../models/tasks');

exports.create_task = async (req, res) => {
    console.log("sdjkfhsjdhsjdhsjdh");
    console.log(req.file,"(((((((((((((((((((");
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
    const match = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    try {
        if (req.user.isAdmin) {
            let updatedTasks = []
            let tasks = await Task.find(match).select('title description completed owner createdAt updatedAt task_image').populate('owner', 'name email age')
            tasks.forEach((task) => {
                let newObj = { ...task.toObject() }
                newObj.detailUrl = `${process.env.HOST_URL}tasks/${task.id}`
                updatedTasks.push(newObj)
            });
            res.send(updatedTasks)
        } else {
            match.owner = req.user.id
            let task = await Task.find(match).select('title description completed owner createdAt updatedAt').populate('owner', 'name email age')
            res.send(task)
        }
    } catch (e) {
        res.status(500).send(e)
    }
}



exports.task_get_by_id = async (req, res) => {
    const _id = req.params.id

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