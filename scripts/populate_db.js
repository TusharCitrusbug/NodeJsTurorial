require('../database/mongo_db');
const jwt = require('jsonwebtoken');
const users = require('./populate/populate_users.json').users
const userModel = require('../models/users')
const TaskModel = require('../models/tasks')

require('dotenv').config();
const { faker } = require('@faker-js/faker');
const User = require('../models/users');

const PopulateUsers = new Promise((myResolve, myReject) => {
    myResolve();
    myReject();
});

var is_finished = 0;


PopulateUsers.then(() => {
    console.log("first_then");
    users.forEach(user => {
        let User = new userModel(user);
        const token = jwt.sign({ _id: User.id }, process.env.JWT_KEY, { expiresIn: process.env.TOKEN_EXPIRATION });
        User.token = token;
        User.save().then(() => {
            is_finished++;
            console.log(`${user.email} is created successfully !`);
            if (is_finished === users.length) {
                taskCreatingCallBack();
            }
        }).catch((e) => {
            console.log(e);
        });
    });
}).catch((e) => {
    console.log(e);
})


const taskCreatingCallBack = () => {
    const users = userModel.find().all()

    console.log("this is the next call back!!!!!!!!!!!!", users);
}


// function PopulateUsers() {

//     users.forEach(user => {
//         let User = new userModel(user);
//         const token = jwt.sign({ _id: User.id }, process.env.JWT_KEY, { expiresIn: process.env.TOKEN_EXPIRATION })
//         User.token = token
//         User.save().then((data) => {
//             console.log(`${user.email} is created successfully !`);
//         }).catch((e) => {
//             console.log(e);
//         })

//     });
// };



// async function PopulateData() {
//     const abcd = await PopulateUsers();
//     console.log("after----------");
// };


// PopulateData();