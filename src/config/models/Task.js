const mongoose = require('mongoose');
const joi = require('joi');


const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String
    },
    board:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Boards',
        required:true
    }
    ,
    status:{
        type:String,
        enum:[
            'todo',
            'in-progress',
            'review',
            'completed'
        ],
        default:'todo'
    },
    priority:{
        type:String,
        enum:[
            'low',
            'medium',
            'high'
        ],
        default:'medium'
    },

    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    attachment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Attachment'
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    dueDate:{
        type:Date
    },

    completedAt:{
        type:Date
    }

},{
    timestamps:true
});

const Task = mongoose.model('Task' , TaskSchema);


//TODO function for validate new  post
function ValidateForNewTask(obj){
    const schema = joi.object({
        title:joi.string().trim().required(),
        description:joi.string().max(100),
        board:joi.string(),
        status:joi.string(),
        priority:joi.string(),
        assignedTo: joi.string(),
        createdBy: joi.string()
    });
    return schema.validate(obj);
}

//TODO function for validate Update post
function ValidateForUpdateTask(obj){
    const schema = joi.object({
        title:joi.string().trim(),
        description:joi.string().max(100),
        status:joi.string(),
        priority:joi.string(),
        assignedTo: joi.string(),
        createdBy: joi.string()
    });
    return schema.validate(obj);
}






module.exports = {Task,ValidateForNewTask,ValidateForUpdateTask};