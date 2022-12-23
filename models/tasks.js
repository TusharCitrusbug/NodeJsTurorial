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
        type: Boolean
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }, updated_at: { type: Date, default: new Date() },
    created_at: { type: Date, default: new Date() }
})

TaskSchema.methods.addOwner = async (user, task) => {
    task.owner = user.id
    return true
}
TaskSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});
const Task = mongoose.model('Task', TaskSchema)

module.exports = Task