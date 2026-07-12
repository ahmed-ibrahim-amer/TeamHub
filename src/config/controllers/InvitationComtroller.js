const {Invitations,ValidateInvitations} = require('../models/Invitation');
const asyncHandler = require('express-async-handler');
const CustomError = require('../utils/CustomError');


exports.NewInvitation = asyncHandler(async(req,res)=>{
    const {error} = ValidateInvitations(req.body);
        if(error){
            throw new CustomError(error.details[0].message , 400);
        }
    const{email,team,role,expiersAt}  = req.body; 
    const invitation = await Invitations.create({
                email,team,role,expiersAt
    });
    if(!invitation){
        throw new CustomError('Invalid Request' , 400);
    }
    res.status(201).json({
        status:'success',
        invitationData:{
            email:invitation.email,
            team:invitation.team,
            role:invitation.role,
            expiersAt:invitation.expiersAt
        }
    });    
});