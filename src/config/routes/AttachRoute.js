const express = require('express');
const route  =express();
const {VerifyToken,VerifyTokenAndAdmin,VerifyTokenAndAuthorization}  = require('../middlewares/VerifyToken');

const upload  = require('../middlewares/upload');
const attachController = require('../controllers/Attachments');

route.post('/',
    VerifyToken,
    upload.single('image'),
    attachController.UploadAttatchment
);

module.exports = route;