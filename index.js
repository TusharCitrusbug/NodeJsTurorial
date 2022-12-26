require('./database/mongo_db')
require('dotenv').config();
const user_routes = require('./routers/users');
const tasks_routes = require('./routers/tasks');

const express = require('express');

const app = express();
const port = Number(process.env.PROJECT_PORT);
const logger = require('morgan');

app.use(logger('dev'));
app.use(express.json());

// all user routes
app.use(user_routes)

// all tasks routes
app.use(tasks_routes)

const multer = require('multer');
const upload = multer({

})
// app.post('/users', (req, res) => {
//     const user = new User(req.body)
//     user.save().then(() => {
//         res.send(user)
//     }).catch((e) => {
//         res.status(400).send(e)
//     })
// })

// // list users 
// app.get('/users', (req, res) => {
//     User.find({}).then((users) => {
//         res.send(users)
//     }).catch((e) => {
//         res.status(500).send()
//     })
// })

// // get user by id
// app.get('/users/:id', (req, res) => {
//     const _id = req.params.id

//     User.findById(_id).then((user) => {
//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     }).catch((e) => {
//         res.status(500).send()
//     })
// })


// // create tasks
// app.post('/tasks', (req, res) => {
//     const task = new Task(req.body)

//     task.save().then(() => {
//         res.status(201).send(task)
//     }).catch((e) => {
//         res.status(400).send(e)
//     })
// })


// // list tasks 
// app.get('/tasks', (req, res) => {
//     Task.find({}).then((tasks) => {
//         res.send(tasks)
//     }).catch((e) => {
//         res.status(500).send()
//     })
// })

// // get task by id
// app.get('/tasks/:id', (req, res) => {
//     const _id = req.params.id
//     Task.findById(_id).then((task) => {
//         if (!task) {
//             return res.status(404).send()
//         }
//         res.send(task)
//     }).catch((e) => {
//         res.status(500).send()
//     })
// })

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

