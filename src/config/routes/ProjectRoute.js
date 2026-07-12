const express = require('express');
const route = express.Router();
const ProjectController = require('../controllers/projects');
const {VerifyToken,VerifyTokenAndAdmin,VerifyTokenAndAuthorization}  = require('../middlewares/VerifyToken');



route.post('/CreateProject',VerifyToken,
    ProjectController.CreateProject);


route.get('/',VerifyTokenAndAdmin,
    ProjectController.GetProjects);


module.exports = route;    