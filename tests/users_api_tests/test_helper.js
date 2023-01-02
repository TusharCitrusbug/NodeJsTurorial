const { faker } = require('@faker-js/faker');
const User = require('../../models/users')
const jwt = require('jsonwebtoken');

exports.CreateUser = async (is_super_user = false, data) => {
    let user = await new User(data);
    const token = jwt.sign({ _id: user.id }, process.env.JWT_KEY, { expiresIn: process.env.TOKEN_EXPIRATION })
    user.token = token
    if (is_super_user) {
        user.isAdmin = true;
    }
    user.save()
    return user
}
exports.list_users = async (number = 5) => {
    let users = []
    for (let index = 0; index < number; index++) {
        let name = faker.name.fullName()
        let data = {
            name: name, email: faker.internet.email(name), age: 22, password: 'test@123'
        }
        let user = await new User(data);
        let token = jwt.sign({ _id: user.id }, process.env.JWT_KEY, { expiresIn: process.env.TOKEN_EXPIRATION })
        user.token = token
        user.save()
        users.push(user)
    }
    return users
}
