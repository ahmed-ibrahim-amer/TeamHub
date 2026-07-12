const mongoose = require('mongoose');
const Joi = require('joi');



const teamMembersSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true, 
    },
    team:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Teams',
        required:true,
    },
    role:{
        type:String,
        enum:[
            'admin','manager','user'
        ],
        default:'user',
        required:true
    },
    joinAt:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const teamMembers = mongoose.model('teamMembers',teamMembersSchema);


function ValidateteamMembersSchema(obj){
    const schema =joi.object({
        role:joi.string().required(),
        joinAt:joi.string().required()
    })
}
module.exports = {
    teamMembers,ValidateteamMembersSchema
};