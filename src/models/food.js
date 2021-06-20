const mongoose = require('mongoose')
// const validator = require('validator')

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    price: {
        type: Number,
    },
    status: {
        type: Boolean
    },
    image: {
        type: Buffer,
    },
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu"
    }
}, {
    timestamps: true
})

const Food = mongoose.model('Food', foodSchema)


module.exports = Food