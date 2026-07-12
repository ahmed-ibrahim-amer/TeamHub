const NotificationController = require('../controllers/Notifications');
const express = require('express');
const route = express.Router();
const {VerifyToken,VerifyTokenAndAdmin,VerifyTokenAndAuthorization}  = require('../middlewares/VerifyToken');



route.post('/AddNotification',VerifyToken ,
    NotificationController.NewNotification);

route.delete('/:id',VerifyTokenAndAuthorization,
    NotificationController.DeleteNotification);


    
module.exports = route;        