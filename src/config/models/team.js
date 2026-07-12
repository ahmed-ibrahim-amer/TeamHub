const mongoose = require('mongoose');
const Joi = require('joi');



const teamsSchema = new mongoose.Schema({
    teamsName:{
        type:String,
        required:true,
        trim:true
    },
    organization:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'organizations',
        required:true,
    }
},{
    timestamps:true
});

const Teams = mongoose.model('Teams',teamsSchema);


function ValidateNewOrganaization(obj){
        const schema = Joi.object({
            teamsName: Joi.string().required(),

        })
}
// if(!mongoose.Schema.Types.ObjectId.isValid(req.body.organization)){
//     throw new CustomError('Invalid organization Id');
// }
module.exports = Teams;