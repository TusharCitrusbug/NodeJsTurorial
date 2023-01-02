require('dotenv').config();
const { faker } = require('@faker-js/faker');
const request = require('supertest')
const app = require('../../app')
const test_helper = require('./test_helper')
const dbHandler = require('../test_db_handler');
const User = require('../../models/users');
const Task = require('../../models/tasks')
const super_user_email = 'superuser1@example.com';

const SuperUserdata = {
    name: 'SuperUser',
    email: super_user_email,
    password: 'MyPass777!',
    isAdmin: true
}
beforeAll(async () => {
    await dbHandler.connectDB();
});

// test('test Create Task', async () => {
//     let user = await test_helper.CreateUser(true, SuperUserdata)
//     expect(user.isAdmin).toBe(true);
// })

test('test list tasks', async () => {
    let user = await new User(SuperUserdata);
    user.save();
    await test_helper.list_tasks(5, user._id)
    request(app).get('/tasks').set('Authorization', 'Bearer ' + user.token).send({}).expect(201)
})

// test('test get task by id', async () => {
//     let user = await test_helper.CreateUser(true, SuperUserdata)
//     await request(app).get(`/users/${user._id}`).set('Authorization', 'Bearer ' + user.token).send({}).expect(200)
// })


// test('test update task by id', async () => {
//     let user = await test_helper.CreateUser(true, SuperUserdata)
//     let users = await test_helper.list_users();
//     const update_data = { age: 33 }
//     await request(app).patch(`/users/${users[0]._id}`).set('Authorization', 'Bearer ' + user.token).send(update_data).expect(200)
//     let updated_user = await User.findById({_id:users[0]._id})
//     const actual_age = users[0].age
//     expect(actual_age).not.toBe(updated_user.age)
// })


// test('test delete task by id', async () => {
//     let user = await test_helper.CreateUser(true, SuperUserdata)
//     let users = await test_helper.list_users();
//     await request(app).delete(`/users/${users[0]._id}`).set('Authorization', 'Bearer ' + user.token).send({}).expect(200)
//     let deleted_user = await User.findById({_id:users[0]._id})
//     expect(deleted_user).toBe(null)
// })

// it'll run after each test cases
afterEach(async () => {
    await dbHandler.dropCollections();
});

afterAll(async () => {
    await dbHandler.dropCollections();
    await dbHandler.dropDB();
});

