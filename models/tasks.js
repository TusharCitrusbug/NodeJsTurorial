const mongoose = require('mongoose')
const TaskSchema = new mongoose.Schema( {
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
})

TaskSchema.methods.addOwner = async (user,task) => {
    task.owner =  user.id
    return true
}

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task