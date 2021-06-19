const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    userComment: {
        type: String,
        trim: true,
    },
    managerComment: {
        type: String,
        trim: true
    },
}, {
    timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema)


module.exports = Comment