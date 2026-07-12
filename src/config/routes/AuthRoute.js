const express = require('express');
const route = express.Router();
const AuthController = require('../controllers/Authentication');
//const {VerifyToken,VerifyTokenAndAdmin,VerifyTokenAndAuthorization}  = require('../middlewares/VerifyToken');


route.post('/signup' , AuthController.signup);
route.post('/login' , AuthController.login);

module.exports = route;
