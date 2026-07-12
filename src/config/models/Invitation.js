const mongoose = require('mongoose');
const joi   = require('joi');



const InvitationShema =  new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    team:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Teams",
        required:true
    },
    role:{
        type:String,
        enum:[
            'admin','manager','user'
        ],
        default:"user"
    },
    expiersAt:{
        type:String,
        required:true
    }
});

const Invitations = mongoose.model('Invitations',InvitationShema);

function ValidateInvitations(obj){
    const  schema = joi.object({
        email:joi.string().required(),
        role:joi.string().required(),
        expiersAt:joi.string().required()
    })
    return schema.validate(obj);
}
module.exports = {Invitations,ValidateInvitations};