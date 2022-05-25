const Task = require('../models/User')
const {StausCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../controllers/errors')

const getAllTasks = (req, res) => {
    const task = await Task.find({createdBy: req.user.userId}).sort('createdAt')
    res.status(StausCodes.OK).json({task, count: task.length})
}

const createTask = async (req, res) => {
        req.body.createdBy = req.user.userId
        const task = await Task.create(req.body) //findOne is the method name
        res.status(StausCodes.CREATED).json({ task })
}


const getTask = (req, res) => {
    const {user:{userId},params:{id:taskId}} = req

    const task = await Task.findOne({
        _id:taskId,
        createdBy: userId,
    })
    if (!task) {
        throw new NotFoundError(`No task with id ${taskId}`)
    }
    res.status(StausCodes.OK).json({ task })
}

const updateTask = (req, res) => {
    res.send('update task')
}

const deleteTask = (req, res) => {
    res.send('delete task')
}