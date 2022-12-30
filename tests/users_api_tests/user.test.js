require('dotenv').config();
const { faker } = require('@faker-js/faker');
const request = require('supertest')
const app = require('../../app')
const test_helper = require('./test_helper')
const dbHandler = require('../test_db_handler');
const userData = {
    name: faker.name.fullName(), email: 'test_user@gmail.com', age: 22, password: 'test@password'
}
beforeAll(async () => {
    await dbHandler.connectDB();
});

test('test Create super user', async () => {
    let user = await test_helper.CreateUser(true)
    expect(user.isAdmin).toBe(true);
})

test('test sign-up new user', async () => {
    let superuser = await test_helper.CreateUser(true)
    expect(superuser.isAdmin).toBe(true);
    request(app).post('/users').set('Authorization', 'Bearer ' + superuser.token).send(userData).expect(201)
})

test('test login created user', async () => {
    request(app).post('/users/login').set('Authorization', 'Bearer ' + superuser.token).send(userData).expect(201)
})
afterEach(async () => {
    await dbHandler.dropCollections();
});

afterAll(async () => {
    await dbHandler.dropDB();
});

