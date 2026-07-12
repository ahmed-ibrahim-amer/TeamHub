const mongoose = require('mongoose');
const Joi = require('joi');


const organizationsSchema = new mongoose.Schema({
    organizationName:{
        type:String,
        required:true,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    logo:{
        type:String,
        required:true,
    }
},{
    timestamps:true
});

const organizations = mongoose.model('organizations',organizationsSchema);

// function ValidateNewOrganization(obj){
//         const Schema = Joi.object(
//             {
//                 teamsName: Joi.string().required(),
//                 logo:Joi.string().required()
//             }
//         )
//         return Schema.validate(obj);
// }


// Validate owner id
// function ValidatetheUserObject(req,res){
//     if (!mongoose.Types.ObjectId.isValid(req.body.owner)) {
//         throw new CustomError("Invalid owner ID", 400);
//     }
// }

function ValidateForNewOrganization(obj){
        const Schema = Joi.object(
            {
                organizationName: Joi.string().required(),
                owner:Joi.string(),
                logo:Joi.string().required()
            }
        )
        return Schema.validate(obj);
}


function ValidateOrganizationForUpdate(){
        const Schema = Joi.object(
            {
                organizationName: Joi.string(),
                logo:Joi.string()
            }
        )
        return Schema.validate(obj);
};


module.exports = {organizations,ValidateForNewOrganization,ValidateOrganizationForUpdate};








