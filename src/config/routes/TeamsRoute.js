const express = require('express');
const route = express.Router();
const teamController = require('../controllers/team');
const {VerifyToken,VerifyTokenAndAdmin,VerifyTokenAndAuthorization}  = require('../middlewares/VerifyToken');

route.post('/CreateTeam' ,VerifyToken,
    teamController.CreateTeam);


route.delete('/:id',VerifyTokenAndAdmin,
    teamController.DeleteTeam
);    





module.exports = route;