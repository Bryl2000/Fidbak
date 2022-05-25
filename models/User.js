const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 4,
        maxlength: 20,
    },
    designation: {
        type: String,
        enum: ['AM', 'Team Lead', 'IT', 'Engineering', 'Management'],
        required: [true, 'Please provide your role'],
    },
    email: {
        type: String,
        required: [true, 'Please provide a valid bfreemail'],
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid bfreemail'],
    },
    bfreeID: {
        type: String,
        unique: true,
        required: [true, 'Please provide your Bfree ID or Staff ID'],
    },
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 4,
    },
    // status: {
    //     type: String,
    //     enum: ['Resolved', 'Pending'],
    //     default: 'Pending',
    // },
    createdBy: {
        type:mongoose.Types.ObjectId,
        ref: 'User',
        required:[true, 'Please provide user']
    },
}, {timestamps:true})

UserSchema.pre('save', async function(){

    const salt = await bcrypt.genSalt(10) //these provide random bytes for extra security of the passwords
    this.password = await bcrypt.hash(this.password, salt)

})
UserSchema.methods.createJWT = function () {
    return jwt.sign({userId: user._id, name: user.name}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
})
}


UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model('User', UserSchema);