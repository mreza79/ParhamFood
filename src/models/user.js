const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    phoneNumber: {
        type: Number,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error('Mobile phone is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if ( !validator.isStrongPassword(value, [
                  (minLength = 8),
                  (minLowercase = 1),
                  (minUppercase = 1),
                  (minNumbers = 1),
                  (minSymbols = 1),
                ])
              )  {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    name: {
        type: String, 
    },
    address: {
        type: String,
        //location: { type: [Number], index: { type: '2dsphere', sparse: true}}
    },
    region: {
        type: String,
    },
    cash: {
        type: Number, 
    }, 
    orderList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food"
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '30 minutes' })

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await user.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.pre('remove', async function (next) {
    const user = this
    next()
})

const user = mongoose.model('user', userSchema)


module.exports = user