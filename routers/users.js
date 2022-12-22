const User = require('../models/users')

const express = require('express');

const router = express.Router()

// async methods for user

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send("sorry user not found please check the id you've entered !")
        }

        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

// update user by id
router.patch('/users/:id', async (req, res) => {
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
})

// delete user
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send("sorry user not found please check the id you've entered !")
        }

        res.send(`User with email ${user.email} is deleted successfully !`)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router
