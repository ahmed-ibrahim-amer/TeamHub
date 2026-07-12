const {teamMembers,ValidateteamMembersSchema} = require('../models/TeamMemberModel');
const asyncHandler = require('express-async-handler');
const CustomError = require('../utils/CustomError');



exports.MaketeamMembers = asyncHandler(async(req,res)=>{
        const {error} = ValidateteamMembersSchema(req.body);
            if(error){
                throw new CustomError('Invalid request' , 400);
            }
        const{user,team,role,JoinAt} = req.body;
        const CreateteamMembers = await   teamMembers.create({
            user,team,role,JoinAt
        });
        if(!CreateteamMembers){
            throw new CustomError()
        }
        res.status(201).json({
            status:"success",
            DataMembers:{
                user:CreateteamMembers.user,
                team:CreateteamMembers.team,
                role:CreateteamMembers.role,
                JoinAt:CreateteamMembers.JoinAt
            }
        })
});


exports.DeleteTeamMembers = asyncHandler(async(req,res)=>{
    const deleteMembers =  await teamMembers.findByIdAndDelete(req.params.id);
    if(!deleteMembers){
        throw new CustomError('Invalid Request ' , 400);
    }
    res.status(200).json({
        status:'success',
        message:"TeamMemeber has been deleted"
    });
});