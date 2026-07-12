const TaskController = require('../controllers/tasks');
const express = require('express');
const route = express.Router();
const {VerifyToken,VerifyTokenAndAdmin,VerifyTokenAndAuthorization}  = require('../middlewares/VerifyToken');


route.post('/CreateTask' ,VerifyToken,
    TaskController.CreateNewTask);
route.get('/' ,VerifyTokenAndAuthorization,
    TaskController.getAllTasks);  
route.delete('/:id',VerifyTokenAndAdmin,
    TaskController.deleteTask);       

module.exports = route;
