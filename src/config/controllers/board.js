const Board = require('../models/Board');
const asyncHandler = require('express-async-handler');
const CustomError = require('../utils/CustomError');




//Create Project
exports.CreateBoard = asyncHandler(async(req,res)=>{
        //TODO  make board
        const {boardsName,project,order} = req.body;
        const board  = await Board.create({
                boardsName,project,order
        });
                if(!board){
                        throw new CustomError("Invalid request",400);
                }
        res.status(201).json({
                status:'success',
                BoardMessage:'Board has been Created',
                boardData:{
                        boardsName:board.boardsName,
                        project:board.project,
                        order:board.order
                }
        });        
});

exports.GetBoard = asyncHandler(async(req,res)=>{
        const board = await Board.find().populate('project');
        if(!board){
                throw new CustomError('Invalid request' , 400);
        }
        res.status(200).json({
                status:'success',
                boardData:{
                        board
                }
        });
});



exports.DeleteBoard = asyncHandler(async(req,res)=>{
        const removeBoard = await Board.findByIdAndDelete(req.params.id);
                if(!removeBoard){
                        throw new CustomError('InvalidRequest',400);
                }
        res.status(200).json({
                status:'success',
                message:"Board has been deleted"        
        });        
});