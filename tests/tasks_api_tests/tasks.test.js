require('dotenv').config();
const path = require('path')
const { faker } = require('@faker-js/faker');
const request = require('supertest')
const app = require('../../app')
const test_helper = require('./test_helper')
const user_test_helper = require('../users_api_tests/test_helper')
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

test('test Create Task', async () => {
    let image = path.resolve(__dirname, '../../index.jpeg');
    let superuser = await user_test_helper.CreateUser(true, SuperUserdata);
    expect(superuser.isAdmin).toBe(true);
    await request(app).post('/tasks').set('Authorization', 'Bearer ' + superuser.token).field('title', 'test title').field('description', 'example description.....').attach('task_image', image).expect(201)
})

test('test list tasks', async () => {
    let superuser = await user_test_helper.CreateUser(true, SuperUserdata);
    expect(superuser.isAdmin).toBe(true);
    await test_helper.list_tasks(5, superuser._id)
    await request(app).get('/tasks').set('Authorization', 'Bearer ' + superuser.token).send({}).expect(200)
})

test('test get task by id', async () => {
    let user = await user_test_helper.CreateUser(true, SuperUserdata)
    expect(user.isAdmin).toBe(true);
    let tasks = await test_helper.list_tasks(5, user._id)
    await request(app).get(`/tasks/${tasks[0]._id}`).set('Authorization', 'Bearer ' + user.token).send({}).expect(200)
})


test('test update task by id', async () => {
    let user = await user_test_helper.CreateUser(true, SuperUserdata)
    let tasks = await test_helper.list_tasks(5, user._id);
    const update_data = { description: "updated documentation..." }
    await request(app).patch(`/tasks/${tasks[0]._id}`).set('Authorization', 'Bearer ' + user.token).send(update_data).expect(200)
    let updated_task = await Task.findById({ _id: tasks[0]._id })
    const actual_description = tasks[0].description
    expect(actual_description).not.toBe(updated_task.description)
})


test('test delete task by id', async () => {
    let user = await user_test_helper.CreateUser(true, SuperUserdata)
    let tasks = await test_helper.list_tasks(5, user._id);
    await request(app).delete(`/tasks/${tasks[0]._id}`).set('Authorization', 'Bearer ' + user.token).send({}).expect(200)
    let deleted_task = await Task.findById({ _id: tasks[0]._id })
    expect(deleted_task).toBe(null)
})

// it'll run after each test cases
afterEach(async () => {
    await dbHandler.dropCollections();
});

afterAll(async () => {
    await dbHandler.dropCollections();
    await dbHandler.dropDB();
});

