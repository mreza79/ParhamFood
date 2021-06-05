const mongoose = require('mongoose')
const validator = require('validator')

const taskSchema = new mongoose.Schema({
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
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Menu'
    }
}, {
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema)


module.exports = Task