// This script is to populate initial example data to perform api calls
require('dotenv').config();
require('../database/mongo_db');
const jwt = require('jsonwebtoken');
const users = require('./populate/populate_users.json').users
const userModel = require('../models/users')
const TaskModel = require('../models/tasks')
const { faker } = require('@faker-js/faker');

let users_ids = []
const CreateSingleUser = async (user) => {
    let uModel = await userModel(user)
    const token = jwt.sign({ _id: uModel.id }, process.env.JWT_KEY, { expiresIn: process.env.TOKEN_EXPIRATION });
    uModel.token = token;
    uModel.save();
    users_ids.push(uModel.id)
    console.log(`${user.email} is created successfully !`);
}

const CreateSingleTask = async (task_data) => {
    let task_obj = await TaskModel(task_data)
    task_obj.save();
    console.log(`${task_data.title} is created successfully !`);
}
const createUsers = async () => {
    console.log("******************USERS******************");
    users.forEach(result => {
        CreateSingleUser(result);
    });
}

const createTasks = async () => {
    console.log("******************TASKS******************");
    let usersList = await userModel.find({}).select('id')
    if (usersList.length === 0) {
        users_ids.forEach(id => {
            let task_data = {}
            task_data.title = faker.name.jobTitle()
            task_data.description = faker.address.city()
            task_data.completed = false
            task_data.owner = id
            CreateSingleTask(task_data);
        })
    } else {
        usersList.forEach(user => {
            let task_data = {}
            task_data.title = faker.name.jobTitle()
            task_data.description = faker.address.city()
            task_data.completed = false
            task_data.owner = user._id
            CreateSingleTask(task_data);
        })
    }
}

const PopulateDb = async () => {
    let allUsers = await userModel.find({});
    if (allUsers.length === 0) {
        await createUsers();
    }
    await createTasks();
    console.log();
    console.log('PRESS CLT + C TO EXIT !!');
}

PopulateDb();


