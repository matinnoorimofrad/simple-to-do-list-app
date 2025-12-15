const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const tasksRouter = require('../controller/tasks/tasks.router');
const usersRouter = require('../controller/users/users.router');

const app = express();

app.use(cors({
    origin : '*'
}));

app.use(morgan('dev'));

app.use(express.json());

app.use('/tasks',tasksRouter);
app.use('/users',usersRouter);



module.exports = app;