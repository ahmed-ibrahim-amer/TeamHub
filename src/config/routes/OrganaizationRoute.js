const express = require('express');
const route = express.Router();
const OranizationController = require('../controllers/Organization');

const {VerifyToken,VerifyTokenAndAdmin,VerifyTokenAndAuthorization}  = require('../middlewares/VerifyToken');

//Organaization route to make new Organaization
route.post('/CreateOrganaization',VerifyToken,
    OranizationController.CreateOrganaization
);

//Get Organaization
route.get('/',VerifyTokenAndAdmin,
    OranizationController.GetOrganaizations
);

//remove Organaization
route.delete('/:id',VerifyTokenAndAuthorization,
    OranizationController.RemoveOrganaization
);


module.exports = route;