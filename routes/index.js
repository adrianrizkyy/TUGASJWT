const express = require('express');
const route = express.Router();
const loginRouter = require('./login');
const userRouter = require('./user');

route.use('/login', loginRouter);
route.use('/user', userRouter);

module.exports = route;
