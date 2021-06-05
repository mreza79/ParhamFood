const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const managerSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

managerSchema.methods.toJSON = function () {
    const manager = this
    const managerObject = manager.toObject()

    delete managerObject.password
    delete managerObject.tokens
    delete managerObject.avatar

    return managerObject
}

managerSchema.methods.generateAuthToken = async function () {
    const manager = this
    const token = jwt.sign({ _id: manager._id.toString() }, process.env.JWT_SECRET)

    manager.tokens = manager.tokens.concat({ token })
    await manager.save()

    return token
}

managerSchema.statics.findByCredentials = async (email, password) => {
    const manager = await manager.findOne({ email })

    if (!manager) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, manager.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return manager
}

managerSchema.pre('save', async function (next) {
    const manager = this

    if (manager.isModified('password')) {
        manager.password = await bcrypt.hash(manager.password, 8)
    }
    next()
})

managerSchema.pre('remove', async function (next) {
    const manager = this
    await Task.deleteMany({ owner: manager._id })
    next()
})

const Manager = mongoose.model('Manager', managerSchema)


module.exports = Manager