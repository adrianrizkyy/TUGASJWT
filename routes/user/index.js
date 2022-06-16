const express = require('express');
const userRouter = express.Router();
const userController = require('../../controller/user');
const Authentication = require('../../middleware/Authentication');

userRouter.use(Authentication.verifyToken);
userRouter.get('/get_users',  userController.get_users);
userRouter.get('/get_one_user/:userid',  userController.get_one_user);
userRouter.post('/create_user',  userController.create_user);
userRouter.put('/update_user/:userid',  userController.update_user);


module.exports = userRouter;