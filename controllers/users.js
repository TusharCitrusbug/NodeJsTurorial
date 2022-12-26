require('dotenv').config();

const User = require('../models/users')

exports.create_user = async (req, res) => {
    const user = new User(req.body)

    try {
        const token = await user.generateAuthToken(user);
        res.status(201).send({ user, token })
    } catch (e) {
        console.log(e);
        res.status(400).send(e)
    }
}
exports.list_user = async (req, res) => {
    try {
        if (req.user.isAdmin) {
            let users = await User.find({}).select("id name email age createdAt updatedAt isAdmin token");
            let updatedUsers = [];
            users.forEach((user) => {
                let newObj = { ...user.toObject() }
                newObj.detailUrl = `${process.env.HOST_URL}users/${user.id}`
                updatedUsers.push(newObj)
            });
            res.send(updatedUsers)
        } else {
            const user = await User.findById(req.user.id).select("id name email age createdAt updatedAt isAdmin token");
            res.send(user)
        }
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
}
exports.get_user_by_id = async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id).select("id name email age createdAt updatedAt isAdmin token")
        if (!user) {
            return res.status(404).send("sorry user not found please check the id you've entered !")
        }

        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
}

exports.patch_user = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!user) {
            return res.status(404).send("sorry user not found please check the id you've entered !")
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
}

exports.delete_user = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send("sorry user not found please check the id you've entered !")
        }

        res.send(`User with email ${user.email} is deleted successfully !`)
    } catch (e) {
        res.status(500).send(e)
    }
}


exports.login_user = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken(user);
        res.send({ user, token })
    } catch (e) {
        res.status(400).send("Something went wrong incorrect email or password please try again !")
    }
}


exports.log_out = async (req, res) => {
    try {
        console.log("called");
        const token = req.header('Authorization').replace('Bearer ', '')
        const user = await User.findOne({ 'token': token })
        user.token = null
        await user.save()
        res.status(200).send("User successfully logged out")
    } catch (e) {
        res.status(400).send("Something went wrong incorrect Token!")
    }
}