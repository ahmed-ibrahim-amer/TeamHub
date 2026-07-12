const mongoose = require('mongoose');
const Joi = require('joi');



const projectsSchema = new mongoose.Schema({
    projectsName:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    team:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Teams',
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        required:true,
    },
    deadline:{
        type:String,
        required:true,
    },

},{
    timestamps:true
});

const projects = mongoose.model('projects',projectsSchema);

module.exports = projects;