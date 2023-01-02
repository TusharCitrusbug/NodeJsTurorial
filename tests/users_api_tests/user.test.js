require('dotenv').config();
const { faker } = require('@faker-js/faker');
const request = require('supertest')
const app = require('../../app')
const test_helper = require('./test_helper')
const dbHandler = require('../test_db_handler');
const User = require('../../models/users');
const super_user_email = 'superuser@example.com';
const userData = {
    name: faker.name.fullName(), email: 'test_user@gmail.com', age: 22, password: 'test@123'
}
const SuperUserdata = {
    name: 'SuperUser',
    email: super_user_email,
    password: 'MyPass777!',
    isAdmin: true
}
beforeAll(async () => {
    await dbHandler.connectDB();
});

test('test Create super user', async () => {
    let user = await test_helper.CreateUser(true, SuperUserdata)
    expect(user.isAdmin).toBe(true);
})

test('test sign-up new user', async () => {
    let superuser = await test_helper.CreateUser(true, SuperUserdata)
    expect(superuser.isAdmin).toBe(true);
    request(app).post('/users').set('Authorization', 'Bearer ' + superuser.token).send(userData).expect(201)
})

test('test login new user', async () => {
    let user = await test_helper.CreateUser(false, userData)
    expect(user.isAdmin).toBe(false);
    request(app).post('/users/login').send({ email: userData.email, password: userData.password }).expect(201)
})


test('test list all users', async () => {
    let user = await test_helper.CreateUser(true, SuperUserdata)
    await test_helper.list_users();
    await request(app).get('/users').set('Authorization', 'Bearer ' + user.token).send({}).expect(200)
})

test('test get user by id', async () => {
    let user = await test_helper.CreateUser(true, SuperUserdata)
    await request(app).get(`/users/${user._id}`).set('Authorization', 'Bearer ' + user.token).send({}).expect(200)
})


test('test update user by id', async () => {
    let user = await test_helper.CreateUser(true, SuperUserdata)
    let users = await test_helper.list_users();
    const update_data = { age: 33 }
    await request(app).patch(`/users/${users[0]._id}`).set('Authorization', 'Bearer ' + user.token).send(update_data).expect(200)
    let updated_user = await User.findById({_id:users[0]._id})
    const actual_age = users[0].age
    expect(actual_age).not.toBe(updated_user.age)
})


test('test delete user by id', async () => {
    let user = await test_helper.CreateUser(true, SuperUserdata)
    let users = await test_helper.list_users();
    await request(app).delete(`/users/${users[0]._id}`).set('Authorization', 'Bearer ' + user.token).send({}).expect(200)
    let deleted_user = await User.findById({_id:users[0]._id})
    expect(deleted_user).toBe(null)
})

// it'll run after each test cases
afterEach(async () => {
    console.log("called after each");
    await dbHandler.dropCollections();
});

afterAll(async () => {
    console.log("called after all");
    await dbHandler.dropCollections();
    await dbHandler.dropDB();
});

