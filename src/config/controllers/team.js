const Teams = require('../models/team');
const asyncHandler = require('express-async-handler');
const CustomError = require('../utils/CustomError');



//TODO Create Team
exports.CreateTeam = asyncHandler(async(req,res)=>{
    
    const {teamsName, organization}= req.body;

    if(!organization ||!teamsName){
        throw new CustomError('invalid request',400);
    }

    const user = await Teams.create({
            teamsName,organization
    });
    if(!user){
        throw new CustomError('Invalid reqest',400);
    }
    res.status(201).json({
        status:'success',
        message:'Team has been created',
        teamData:{
            teamsName: user.teamsName,
            organization: user.organization
        }
    });
});

exports.DeleteTeam = asyncHandler(async(req,res)=>{
    const team = await Teams.findByIdAndDelete(req.params.id);
        if(!user){
            throw new CustomError('Invalid reqest',400);
    }
    res.status(200).json({
        status:'success',
        message:'team has been deleted'
    });
});


