const express = require('express');
const route = express();
const CommentController = require('../controllers/comment');
const {VerifyToken,VerifyTokenAndAdmin,VerifyTokenAndAuthorization}  = require('../middlewares/VerifyToken');


route.post('/newComment',VerifyToken,
    CommentController.MakeComments
);

route.get('/',VerifyToken,
    CommentController.GetAllComments);
    
route.delete('/:id',VerifyToken,
    CommentController.DeleteComments
);
module.exports = route;
