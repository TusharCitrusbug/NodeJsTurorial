require('dotenv').config();
const Task = require('../models/tasks');
const scheduler = require('node-schedule');
const scheduler_timer = { hour: parseInt(process.env.SCHEDULER_HOURS), minute: parseInt(process.env.SCHEDULER_MINUTES), dayOfWeek: parseInt(process.env.SCHEDULER_DAY_OF_WEEKS) }
const timer_for_every_minit = process.env.SCHEDULER_CHRONES
exports.tasks_complition_job = scheduler.scheduleJob(timer_for_every_minit, function () {
    Task.find({ expired: false }).exec().then((tasks => {
        if (tasks.length !== 0) {
            tasks.forEach(task => {
                Task.updateOne({ _id: task._id }, { $set: { expired: true } }).exec().then(res => {
                    console.log(`Expired task with title "${task.title}" successfully !`);
                }).catch(err => {
                    console.log(err);
                })
            })
        }else{
            console.log("No tasks for expiration");
        }
    }))
});