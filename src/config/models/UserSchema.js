const mongoose = require('mongoose');
const Joi = require('joi');



const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','manager','admin'],
        default:'user'
    }
},{
    timestamps:true
});

const User = mongoose.model('User',UserSchema);


function validateForUsersSignUp(obj){
    const schema = Joi.object({
        username: Joi.string().trim().required(),
        email:Joi.string().lowercase().required(),
        password:Joi.string().required(),
        role:Joi.string()
    });
    return schema.validate(obj);
};


function validateForUsersLogin(obj){
    const schema = Joi.object({     
        email:Joi.string().lowercase().required(),
        password:Joi.string().required(),
    });
    return schema.validate(obj);
};

function validateForUsersUpdate(obj){
    const schema = Joi.object({
        username: Joi.string().trim(),
        email:Joi.string().lowercase(),
        password:Joi.string(),
        role:Joi.string()
    });
    return schema.validate(obj);
};

module.exports ={User , validateForUsersSignUp , validateForUsersLogin , validateForUsersUpdate};