const jwt = require('jsonwebtoken');
const CustomError = require('../utils/CustomError');





function VerifyToken(req,res,next){
    
    
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    

    if(token){
        try{
            const decoded = jwt.verify(token , process.env.ACCESS_JWT_TOKEN && process.env.REFRESH_JWT_TOKEN);
            req.user = decoded;
            next()
        }catch(error){
            throw new CustomError('Invalid token' , 401);    
        }
    }else{
        throw new CustomError('No Token Provided' , 401);
    }
    //if(req.body.id === req.params.id)
};

function VerifyTokenAndAuthorization(req,res,next){
        VerifyToken(req,res,()=>{
            if( req.user.id === req.params.id || req.body.role ==='admin' || req.body.role ==='manager'){
                next();
            }else{
                throw new CustomError('You are not allowed',403);
            }
        });
}

function VerifyTokenAndAdmin(req,res,next){
        VerifyToken(req,res,()=>{
            if(req.user.role === 'admin'){
                next()
            }else{
                throw new CustomError('You dont have any permission',403);
            }
        })
};

module.exports = {VerifyToken,VerifyTokenAndAdmin,VerifyTokenAndAuthorization};