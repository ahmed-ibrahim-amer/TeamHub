const express = require('express');
const route = express();
const  invitationsController =
require('../controllers/InvitationComtroller');
const {VerifyToken,VerifyTokenAndAdmin,VerifyTokenAndAuthorization}  = require('../middlewares/VerifyToken');

route.post('/Invations',VerifyTokenAndAuthorization,
    invitationsController.NewInvitation
);

module.exports = route;