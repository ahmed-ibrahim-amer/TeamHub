const mongoose = require('mongoose');
const Joi = require('joi');



const NotificationSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    type:{
        type:String,
        enum: [
        "TASK_ASSIGNED",
        "TASK_UPDATED",
        "TASK_COMPLETED",
        "COMMENT_ADDED",
        "PROJECT_INVITATION",
        "TEAM_INVITATION"
        ],
        required:true
    },
    read:{
        type:Boolean,
        required:true
    },
    Message:{
        type:String,
        required:true
    }
    ,
    data:{
        type:mongoose.Schema.Types.Mixed
    }
},{timestamps: true});


const Notification = mongoose.model('Notification' , NotificationSchema);

//TODO VALIDATION FOR INPUTS HERE

function ValidateForNewNotification(obj){
    const schema = Joi.object({
        type: Joi.string().required(),
        Message:Joi.string().required(),
        read: Joi.boolean().required()
    });
    return schema.validate(obj);
}


module.exports = {Notification,ValidateForNewNotification};