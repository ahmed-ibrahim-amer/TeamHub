const express = require('express');
const route = express();
const TeamMemberController = require('../controllers/TeamMemeber');
const {VerifyToken,VerifyTokenAndAdmin,VerifyTokenAndAuthorization}  = require('../middlewares/VerifyToken');


route.post('/CreateTeamMemeber',VerifyToken,
    TeamMemberController.MaketeamMembers);


route.delete('/:id',VerifyTokenAndAdmin ,
    TeamMemberController.DeleteTeamMembers);

module.exports = route

