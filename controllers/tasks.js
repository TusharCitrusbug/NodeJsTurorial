const Task = require('../models/tasks')

exports.create_task = async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
}


exports.list_tasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
}



exports.task_get_by_id = async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)

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