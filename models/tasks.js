const mongoose = require('mongoose')
const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, unique: true
    },
    description: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    expired: {
        type: Boolean,
        default: false
    },
    task_image: { type: String, required: true }
}, {
    timestamps: true
})

TaskSchema.methods.addOwner = async (user_id, task) => {
    task.owner = user_id
    return true
}
TaskSchema.pre('save', function (next) {
    next();
});
const Task = mongoose.model('Task', TaskSchema)

module.exports = Task