const  {Comments,ValidateNewComments} = require('../models/Comment');
const asynHandler = require('express-async-handler');
const CustomError = require('../utils/CustomError');


exports.MakeComments = asyncHandler(async(req,res)=>{
    const {error} = ValidateNewComments(req.body);
        if(error){
            throw new CustomError(error.details[0].message, 400);
        }
    const{task, user , content} = req.body;
    const makeComment = await Comments.create({
        task,
        user,
        content
    });
    res.status(201).json({
        status:'success',
        message:'New Comment',
        data:{
            task:makeComment.task,
            user:makeComment.user,
            content:makeComment.content
        }
    });
});

exports.GetAllComments = asyncHandler(async(req,res)=>{
    const comments = await Comments.find();
        if(!comments){
                throw new CustomError('Invalid requests', 400);
        }
    res.status(201).json({
        status:'success',
        data:{
            task:comments.task,
            user:comments.user,
            content:comments.content
        }
    });    
})

//delete comments
exports.DeleteComments = asyncHandler(async(req,res)=>{
    const deleteComment = await Comments.findByIdAndDelete(req.params.id);
        if(!deleteComment){
            throw new CustomError('Invalid requests', 400);
            }
    res.status(200).json({
        status:'success',
        message:'Comment has been deleted'
    });
});

