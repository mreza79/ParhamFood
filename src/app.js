const express = require('express')
const cors = require("cors");
const bodyParser = require("body-parser");
require('./db/mongoose')
const userRouter = require('./routers/user')
const managerRouter = require('./routers/manager')
const restaurantRouter = require('./routers/restaurant')
const healthRouter = require('./routers/health')

const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json())
app.use(userRouter)
app.use(managerRouter)
app.use(restaurantRouter)
app.use(healthRouter)

module.exports = app
