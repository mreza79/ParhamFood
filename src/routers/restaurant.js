const express = require('express')
const Restaurant = require('../models/restaurant')
const auth = require('../middleware/auth')
const router = new express.Router()

//create restaurant
router.post('/restaurants', auth, async (req, res) => { 
    // const restaurant = new restaurant(req.body)
    const restaurant = new Restaurant({
        ...req.body,
        manager: req.manager._id
    })

    try {
        await restaurant.save()
        res.status(201).send(restaurant)
    } catch (e) {
        res.status(400).send(e)
    }
})

//GET /restaurants?status=true
//GET /restaurant?limit:10&skip:0 --> how many of restaurants we will get //skip first ten restaurants
router.get('/restaurants/', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.status) {
        match.status = req.query.status === 'true' //query by status
    }

    if (req.query.sortBy){ //sort restaurants by name descending maybe!?
        const parts = req.query.sortBy.split(':')
        sort[part[0]] = parts[1] === 'name' ? -1 : 1
    }

    try {
        await req.manager.populate({ // query
            path: 'restaurants', 
            match, //query based on status
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.manager.restaurants)
    } catch (e) {
        res.status(500).send(e)
    }
})
//GET restaurant by id
//Optional
router.get('/restaurants/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const restaurant = await Restaurant.findOne({ _id, owner: req.manager._id })

        if (!restaurant) {
            return res.status(404).send()
        }
        res.send(restaurant)
    } catch (e) {
        res.status(500).send(e)
    }
})
//Edit restaurant by name, address, region, service region, working hour, delivery time!!!, delivery fee!!!!
//Working hour --> { day, periods:[start, end]
router.patch('/restaurants/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'address', 'region', 'serviceRegion', 'workingHour', 'deliveryTime', 'deliveryFee']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid Updates!' })

    try {
        const restaurant = await Restaurant.findOne({ _id: req.params.id, owner: req.manager._id })

        if (!restaurant) {
            return res.status(404).send()
        }

        updates.forEach((update) => restaurant[update] = req.body[update])
        await restaurant.save()
        res.send(restaurant)
    } catch (e) {
        res.status(400).send(e)
    }
})
//delete restaurant by id
router.delete('/restaurants/:id', auth, async (req, res) => {
    try {
        const restaurant = await Restaurant.findOneAndDelete({ _id: req.params.id, owner: req.manager._id })

        if (!restaurant) {
            return res.status(404).send()
        }

        res.send(restaurant)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router