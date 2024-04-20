const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = function (req, file, cb) {
    // Allowed file extensions
    const allowedFileTypes = /jpeg|jpg|png|gif/;

    // Check the file extension
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());

    // Check the mime type
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        return cb(new Error('Only image files (jpeg, jpg, png, gif) are allowed!'), false);
    }
};
const upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 1024 * 1024 * 5, // 5MB file size limit
    // },
    fileFilter: fileFilter, // Apply the file filter
});

const multerUpload = multer({
    storage: storage,
    fileFilte: fileFilter
})

module.exports = {
    storage,
    upload,
    multerUpload
}