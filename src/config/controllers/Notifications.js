const {Notification,ValidateForNewNotification}  = require('../models/Notification');
const asyncHandler = require('express-async-handler');
const CustomError = require('../utils/CustomError');


exports.NewNotification = asyncHandler(async(req,res)=>{
    const {error} = ValidateForNewNotification(req.body);
        if(error){
            throw new CustomError(error.details[0].message,400);
        }
    const {user, type ,read , data} = req.body;    
    const notification = await Notification.create({
        user,
        type,
        read, 
        data
    });
    if(!notification){
        throw new CustomError('Invalid Requests' , 400);
    }
    res.status(201).json({
        status: 'success',
        message:'Notification has been created',
        NotifiData:{
            user:notification.user,
            type:notification.type,
            Message:notification.Message,
            read:notification.read, 
            data:notification.data
        }
    });
});


exports.DeleteNotification = asyncHandler (async(req,res)=>{
    const RemoveNotification = await Notification.
    findByIdAndDelete(req.params.id);
        if(!RemoveNotification){
            throw new CustomError('Invalid Requests' , 400);
        }
    res.status(200).json({
        status:'success',
        messsage:'Notification has been deleted'
    })
})