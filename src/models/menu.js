const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
}, {
    timestamps: true
})

menuSchema.virtual('foods', {
    ref: 'Food',
    localField: '_id',
    foreignField: 'menu'
})

const Menu = mongoose.model('menu', taskSchema)


module.exports = Menu