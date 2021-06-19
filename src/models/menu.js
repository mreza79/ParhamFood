const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    time: {
        type: Date, 
    },
    status: {
        type: Number,   //0 delete 1 active -1 Not active
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'Restaurant',
    }
}, {
    timestamps: true
})

menuSchema.virtual('foods', {
    ref: 'Food',
    localField: '_id',
    foreignField: 'menu'
})

const Menu = mongoose.model('menu', menuSchema)


module.exports = Menu