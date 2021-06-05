const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const managerRouter = require('./routers/manager')
const restaurantRouter = require('./routers/restaurant')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(managerRouter)
app.use(restaurantRouter)

module.exports = app
