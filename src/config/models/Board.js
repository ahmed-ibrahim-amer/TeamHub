const mongoose = require('mongoose');
const Joi = require('joi');



const boardsSchema = new mongoose.Schema({
    boardsName:{
        type:String,
        required:true,
    },
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'projects',
        required:true,
    },
    order:{
        type:String,
        required:true
    },
},{
    timestamps:true
});

const Boards = mongoose.model('Boards',boardsSchema);


module.exports = Boards;