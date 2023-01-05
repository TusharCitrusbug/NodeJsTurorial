require('dotenv').config();
const Task = require('../models/tasks');
const scheduler = require('node-schedule');
const scheduler_timer = { hour: parseInt(process.env.SCHEDULER_HOURS), minute: parseInt(process.env.SCHEDULER_MINUTES), dayOfWeek: parseInt(process.env.SCHEDULER_DAY_OF_WEEKS) }
const timer_for_every_minit = process.env.SCHEDULER_CHRONES
console.log("called");
exports.tasks_complition_job = scheduler.scheduleJob(timer_for_every_minit, function () {
    Task.find({}).exec().then((tasks => {
        tasks.forEach(task => {
            Task.findByIdAndUpdate(task._id, {completed:true}, { new: true, runValidators: true })
            console.log(`Updated task with title ${task.title} successfully !`);
        })
    }))
});