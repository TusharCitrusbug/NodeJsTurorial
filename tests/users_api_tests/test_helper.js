const User = require('../../models/users')
const jwt = require('jsonwebtoken');

exports.CreateUser = async(is_super_user=false)=>{
    let user = await new User({
        name: 'SuperUser',
        email: 'superuser@example.com',
        password: 'MyPass777!',
        isAdmin : true
    });
    const token = jwt.sign({ _id: user.id }, process.env.JWT_KEY, { expiresIn: process.env.TOKEN_EXPIRATION })
    user.token = token
    if (is_super_user) {
        user.isAdmin = true;
    }
    user.save()
    return user
}