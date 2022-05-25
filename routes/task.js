const express = require('express');
const router = express.Router();

const {login, register} = require('../controllers/auth')

const {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
} = require('../models/Tasks.js');

router.route('/').post(getAllTasks).post(createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
