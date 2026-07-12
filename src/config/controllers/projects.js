const Project = require('../models/Project');
const asyncHandler = require('express-async-handler');
const CustomError = require('../utils/CustomError');

//Create project
exports.CreateProject = asyncHandler(async(req,res)=>{
    const {projectsName,description,team,owner,status,deadline} = req.body;
    const newProject = await Project.create({
            projectsName,
            description,
            team,
            owner,
            status,
            deadline
    });

    if(!newProject){
        throw new CustomError('Invalid request',400);
    }
    res.status(201).json({
        status:'success',
        ProjectMessage:'Project has been created',
        ProjectData:{
            projectsName:newProject.projectsName,
            description:newProject.description,
            team:newProject.team,
            owner:newProject.owner,
            status:newProject.status,
            deadline:newProject.deadline
        }
    })
});

exports.GetProjects = asyncHandler (async(req,res)=>{
    const projects = await Project.find().populate('team owner');
    if(!projects){
        throw new CustomError('Invalid Request',400);
    }
    res.status(200).json({
        status:'success',
        projectData:{
            projects
        }
    })
});

//TODO Update project 


//TODO Archive project 


//TODO Delete project 
