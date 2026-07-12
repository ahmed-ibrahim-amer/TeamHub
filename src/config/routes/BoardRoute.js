const BoardController = require('../controllers/board');
//const asyncHandler = require('express-async-handler');
const express = require('express');
const route = express.Router();
const {VerifyToken,VerifyTokenAndAdmin,VerifyTokenAndAuthorization}  = require('../middlewares/VerifyToken');



route.post('/createBoard' ,VerifyTokenAndAuthorization,
    BoardController.CreateBoard);

route.get('/',VerifyTokenAndAuthorization,
    BoardController.GetBoard);

route.delete('/:id',VerifyTokenAndAuthorization,
    BoardController.DeleteBoard);
    
module.exports = route;