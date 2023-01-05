require('dotenv').config();
const tasks_seduler = require('./utils/seduler_for_tasks')
const user_routes = require('./routers/users');
const tasks_routes = require('./routers/tasks');

const express = require('express');

const app = express();
const logger = require('morgan');

app.use(logger('dev'));
app.use(express.json());
app.use(express.static('static'))
// all user routes
app.use(user_routes)

// all tasks routes
app.use(tasks_routes)

tasks_seduler.tasks_complition_job
module.exports = app