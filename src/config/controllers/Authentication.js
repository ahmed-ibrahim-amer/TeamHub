// import user model for signup / login / forgotpassword / resetPassword
const {User , validateForUsersSignUp , validateForUsersLogin , validateForUsersUpdate} = require('../models/UserSchema');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const CustomError = require('../utils/CustomError');
const {CreateAccessToken,CreateRefreshToken} = require('../middlewares/MakeTokens');



//SignUp Function
exports.signup = asyncHandler(async(req , res)=>{
    //Validation for signup bu joi
    const {error} = validateForUsersSignUp(req.body);
        if(error){
            throw new CustomError(error.details[0].message, 400);
        }
    //Destructring for schema fields    
    const {username,email,passowrd,role} = req.body;
    
    //Make hash for user password
    const hashPassword = await bcrypt.hash(req.body.password , 10);
    
    //Check if user is exists
    let findUser = await User.findOne({email});
        if(findUser){
            throw new CustomError('This user already exists',400);
        }
    
    //Create new user 
    const createSignUp = await User.create({
        username,
        email,
        password:hashPassword,
        role:'user'
    });
    

    //TODO CREATE TOKEN
    const accessToken = CreateAccessToken(createSignUp.id,createSignUp.role);
    const longTermToken = CreateRefreshToken(createSignUp.id,createSignUp.role);

    //TODO RESPONSE 201
    res.status(201).json({
        status:'success',
        signupData:{
            username:createSignUp.username,
            email:createSignUp.email,
            role:createSignUp.role
        },
        accessToken,
        longTermToken
    });
});


//Function for Login
exports.login = asyncHandler(async(req,res)=>{
    //Validation for user Login
    const {error} = validateForUsersLogin(req.body);
        if(error){
            throw new CustomError(error.details[0].message, 400);
        }
    //fields from body
    const {email, password} = req.body;
    //find user 
    const userLogin = await User.findOne({email});
        if(!userLogin){
            throw new CustomError('Password or email is Invalid',404);
        }
    const isMatch =  await bcrypt.compare(password, userLogin.password);
        if(!isMatch){
            throw new CustomError('Password or email is Invalid',400);
        }    
    const smallTermToken = CreateAccessToken(userLogin.id , userLogin.role);
    const longtermToken  = CreateRefreshToken(userLogin.id , userLogin.role);

    res.status(200).json({
        status:'success',
        loginData:{
            id:userLogin.id,
            username:userLogin.username,
            email:userLogin.email,
            role:userLogin.role,
        },
        smallTermToken,
        longtermToken
    });
}); 

exports.getResetPassword = asyncHandler(async(req,res)=>{

});
exports.getResetPassword = asyncHandler(async(req,res)=>{

});


// exports.GetAllUsers = asyncHandler(async(req,res)=>{
//     const findUsers = await User.find({role: 'user'});
// });
// exports.GetAlladmin = asyncHandler(async(req,res)=>{
//     const findAdmins = await User.find({role: 'admin'});
// });