const  {Task,ValidateForNewTask,ValidateForUpdateTask} = require('../models/Task');
// import asyncHandler = from 'express-async-handler'; Only for typescript fiels
const asyncHandler = require('express-async-handler');
const CustomError = require('../utils/CustomError');


exports.CreateNewTask = asyncHandler(async(req,res)=>{
    //Validation for new error
    const {error} = ValidateForNewTask(req.body);
        if(error){
            throw new CustomError(error.details[0].message, 400);
        }
    const {title,description,board,status,priority,attachment,assignedTo,createdBy} = req.body;
    const newTask =  await Task.create({
    title,description,board,status,priority,attachment,assignedTo,createdBy
    });
    
    res.status(201).json({
        status:'success',
        data:{
        title:newTask.title,
        description:newTask.description,
        board:newTask.board,
        status:newTask.status,
        priority:newTask.priority,
        assignedTo:newTask.assignedTo,
        attachment:newTask.attachment,
        createdBy:newTask.createdBy
        }
    });
});

exports.getAllTasks = asyncHandler(async(req,res)=>{
    //COPY FROM QUERY OBJECT
    const queryObj = {...req.query};
    //Remove special query fields
    const excludeFields = ['sort','page','limit','fields'];

    excludeFields.forEach(el => delete queryObj[el]);

    //Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr =queryStr.replace(
        /\b(gte|gt|lte|lt)\b/g,
        match => `$${match}`
    )
    const mongoQuery = JSON.parse(queryStr);
    let query = Task.find(mongoQuery);

    //TODO SORT
    if(req.query.sort){
        const SortBy = req.query.sort.split(',').join(' ');
        query = query.sort(SortBy);
    }else{
        query = query.sort('-createdAt');
    }


    //TODO field LIMIT
    if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
    }else{
        query = query.select('-__v');
    }
    //TODO PAGINATION
    const page = Math.max(Number(req.query.page)||1,1);
    const limit= Number(req.query.limit)||10;
    const skip=(page - 1)*limit;
    query = query.skip(skip).limit(limit);


    query = query.populate('board assignedTo createdBy attachment');

    
    const tasks = await query;
    
    
    // const getTasks =  await Task.find();
    //     if(!getTasks){
    //             throw  new CustomError('Tasks not found',404);
    //     }
    res.status(200).json({
        status : 'success',
        results: tasks.length,
        data: tasks
    });

});

exports.deleteTask = asyncHandler(async(req,res)=>{
const removeTask = await Task.findByIdAndDelete(req.params.id);
    if (!removeTask) {
        throw new CustomError("Task not found", 404);
    }

res.status(200).json({
    status: "success",
    message: "Task removed successfully"
});
});




