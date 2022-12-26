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
    }
}, {
    timestamps: true
})

TaskSchema.methods.addOwner = async (user_id, task) => {
    task.owner = user_id
    return true
}
TaskSchema.pre('save', function (next) {
    // this.updated_at = Date.now();
    next();
});
const Task = mongoose.model('Task', TaskSchema)

module.exports = Task