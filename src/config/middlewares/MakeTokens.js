const jwt = require('jsonwebtoken');


//TODO short term token 
const CreateAccessToken  = (id, role)=>{
        return jwt.sign({id,role},process.env.ACCESS_JWT_TOKEN,{
            expiresIn:'24h'
        });
};

//TODO long term token
const CreateRefreshToken  = (id, role)=>{
        return jwt.sign({id,role},process.env.REFRESH_JWT_TOKEN,{
            expiresIn:'12d'
        });
};

module.exports = {CreateAccessToken,CreateRefreshToken};