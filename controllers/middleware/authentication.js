const User = require('../modelsUser')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')
const CustomAPIError = require('../errors/custom-error')

const auth = async (req, res, next) => {
    const authHeader = req.headers.aurhorization

    if(!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Authentication invalid')
    }

    const token = authHeader.split(' ')[1]
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        // const {id, username} decoded
        req.user = {id, username}
        next()
    } catch (error) {

    }
}


module.exports = auth