const express = require('express');
const {
    showMyTasks,
    showOneTask,
    addNewTask,
    removeOneTask,
    search,
    filterByPriority,
    filterByDate,
    filterByStatus,
    edit
} = require('./tasks.controller');
const {validateToken} = require('../users/users.controller');

const tasksRouter = express.Router();

tasksRouter.use(validateToken);

tasksRouter.get('/all', showMyTasks);
tasksRouter.get('/select/:id',showOneTask);

tasksRouter.post('/add', addNewTask);
tasksRouter.post('/search',search);
tasksRouter.post('/priorityFilter', filterByPriority);
tasksRouter.post('/DateFilter', filterByDate);
tasksRouter.post('/statusFilter',filterByStatus);

tasksRouter.patch('/edit',edit);

tasksRouter.delete('/remove/:id', removeOneTask);

module.exports = tasksRouter;