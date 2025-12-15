const express = require('express');
const {
    register,
    login,
    userInformation,
    validateToken,
} = require('./users.controller');

const usersRouter = express.Router();

usersRouter.post('/register',register);
usersRouter.post('/login', login);

usersRouter.get('/information',validateToken, userInformation);


module.exports = usersRouter;