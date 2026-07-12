const multer = require('multer');
const path = require('path');
const imageFileFilter = require('../utils/imageFileFilter');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../images'));
    },
    
    filename: function (req, file, cb) {
        cb(
            null,
            new Date().toISOString().replace(/:/g, '-') +
            '-' +
            file.originalname
        );
    }
});
const uploadImageMulter = multer({
        storage,
        imageFileFilter,
        limits: {
            fileSize: 5 * 1024 * 1024
        }
});
const upload = multer({ storage });

module.exports = upload;