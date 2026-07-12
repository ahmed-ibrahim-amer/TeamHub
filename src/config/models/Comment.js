const mongoose = require('mongoose');
const Joi = require('joi');



const CommentsSchema = new mongoose.Schema({
    task:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Task',
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    content:{
        type:Joi.string,
        required:true
    }
},{timestamps});
const Comments = mongoose.model('Comments' , CommentsSchema);

function ValidateNewComments(obj){
    const schema = Joi.object({
        content:Joi.string()
    }); 
    return schema.validate(obj)
};




module.exports = {Comments,ValidateNewComments};