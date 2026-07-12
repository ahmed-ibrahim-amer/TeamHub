const {Attachment,ValidateAttachment} = require('../models/AttachModel');
const asyncHandler = require('express-async-handler');
const CustomError = require('../utils/CustomError');
const cloudinary = require('../cloudinary');



exports.UploadAttatchment = asyncHandler(async(req,res)=>{
    const {error} = ValidateAttachment(req.body);
        if(error){
            throw new CustomError(error.details[0].message);
        }
    if (!req.file) {
        throw new CustomError('Attachment is required', 400);
    }    
    const attachment  = await  cloudinary.uploader.upload(
            req.file.path,
        { folder:'TeamHub'}
    );
    const attach = await Attachment.create({
        url: attachment.secure_url,
        public_id: attachment.public_id,
        folder: attachment.folder
    });
    res.status(201).json({
        status:'success',
        attachmentData:{
            attach
        }
    });
});

//Delete Attahment 
exports.DeleteAttachment = asyncHandler(async(req,res)=>{
    const RemoveAttach = await Attachment.findByIdAndDelete(req.params.id);
        if(!RemoveAttach){
            throw new CustomError('Invalid request',400);
        }
    const result  = await  cloudinary.uploader.destroy(RemoveAttach.public_id);

        if(result.restult !== 'ok'){
            throw new CustomError('Failed to delete attachment from Cloudinary',500);
        }    
    res.status(200).json({
        status:'success',
        message:'Attachment has been deleted'
    });    
});


// exports.DeleteCloudinary = asyncHandler(async(req,res)=>{
//     const result  = await  cloudinary.uploader.destroy(attachment.public_id);

//         if(result.restult !== 'ok'){
//             throw new CustomError('Failed to delete attachment from Cloudinary',500);
//         }
//     res.status(200).json({
//         status:'success',
//         message:'Cloudinary has been deleted'
//     });    
// });