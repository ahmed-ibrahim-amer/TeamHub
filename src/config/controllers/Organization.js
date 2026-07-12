const {organizations,ValidateForNewOrganization,ValidateOrganizationForUpdate} = require('../models/Organization');
const asyncHandler = require('express-async-handler');
const CustomError = require('../utils/CustomError');


//TODO Make organaization
exports.CreateOrganaization = asyncHandler(async(req,res)=>{
    const {error} = ValidateForNewOrganization(req.body);
        if(error){
            throw new CustomError(error.details[0].message,400);
        }
     //make new organizaiton
    const{organizationName, owner, logo} = req.body;

    const newOrganaize  = await organizations.create({
        organizationName,
        owner,
        logo
});

    if(!newOrganaize){
        throw new CustomError('Invalid request',400);
    }

    res.status(201).json({
        status:"success",
        message:'Organization has been Created',
        OrganaizationData:{
            organizationName: newOrganaize.organizationName,
            owner: newOrganaize.owner,
            logo: newOrganaize.logo
        }
    });
});




//TODO join organaization
exports.GetOrganaizations = asyncHandler(async(req,res)=>{
        const getOrganaization = await organizations.find().populate('owner');
        
            if(!getOrganaization){
                throw new CustomError('Organaization not found',404);
            }
        res.status(200).json({
            status:'success',
            getOrganaizationsData:{
            getOrganaization
            }
        });    
});

//  Remove organaization
exports.RemoveOrganaization = asyncHandler(async(req,res)=>{
    //remove organaization
    const DeleteOrganaization = await organizations.findByIdAndDelete(req.params.id);
        if(!DeleteOrganaization){
            throw new CustomError("Organaization Not Found",404);
        }
    res.status(200).json({
        status:'success',
        messsage:'Organaization has been deleted'
    });    
});


exports.UpdateOrganaization = asyncHandler (async(req,res)=>{
        const {error} = ValidateOrganizationForUpdate(req.body);
            if(error){
                throw new CustomError(error.details[0].message,400);
            }
            const{organizationsName,logo} = req.body;
        const  makeUpdate = await organizations.findByIdAndUpdate(req.params.id,{
                        organizationName, logo
        },{new:true});


        res.status(200).json({
            status:'success',
            updateMessage:'The Organaization has been updated'
        });
});

//TODO manage members function after finish team memeber