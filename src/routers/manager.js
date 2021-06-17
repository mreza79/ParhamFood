const express = require('express')
const Manager = require('../models/manager')
const auth = require('../middleware/auth')
const router = new express.Router()

//create manager
router.post('/managers', async (req, res) => { 
    const manager = new Manager(req.body)

    try {
        await manager.save()
        const token = await manager.generateAuthToken()
        res.status(201).send({ manager, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

// login manager
router.post('/managers/login', async (req, res) => { 
    const { email, password } = req.body
    try {
        const manager = await Manager.findByCredentials(email, password)
        const token = await manager.generateAuthToken()
        res.send({ manager, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

//logout current manager in session
router.post('/managers/logout', auth, async (req, res) => { 
    try {
        req.manager.tokens = req.manager.tokens.filter((token) => token.token !== req.token)
        await req.manager.save()
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})

//logout all sessions that have a specific manager
router.post('/managers/logoutAll', auth, async (req, res) => { 
    try {
        req.manager.tokens = []
        await req.manager.save()
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})

//get current manager !!!
router.get('/managers/me', auth, async (req, res) => { 
    res.send(req.manager)
})

//edit manager by email, password, restaurant
router.patch('/managers/me', auth, async (req, res) => { 
    const updates = Object.keys(req.body)
    const allowedUpdates = ['email', 'password', 'restaurants']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid Updates!' })

    try {
        updates.forEach((update) => req.manager[update] = req.body[update])
        await req.manager.save()
        res.send(req.manager)
    } catch (e) {
        res.status(400).send(e)
    }
})

//delete manager in session
router.delete('/managers/me', auth, async (req, res) => { 
    try {
        await req.manager.remove()
        res.send(req.manager)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router