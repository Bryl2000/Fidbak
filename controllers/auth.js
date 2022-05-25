const User = require('../models/User')
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, UnauthenticatedError} = require('./errors')
const bcrypt = require('bcryptjs')


const register = async (req, res) => {
    // const salt = await bcrypt.genSalt(10) //these provide random bytes for extra security of the passwords
    // const hashedPassword = await bcrypt.hash(password, salt)

    // const tempUser = {name, email, password: hashedPassword}

    // }
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user: {name: user.getName()}, token})
}
const login = async (req, res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password){
    throw new BadRequestError('Please provide name, email and password')
    }

const user = await User.findOne({email})

//compare password
if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
}
const isPasswordCorrect = await user.comparePassword(password)
if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
}

const token = user.createJWT();
res.status(StatusCodes.OK).json({user:{name:user.name}, token })



}


module.exports = {
    register,
    login,
}