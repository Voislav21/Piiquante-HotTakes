// Import multer //
const multer = require('multer');

// Map of MIME_TYPES //
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
};

// Configured version of multer //
const storage = multer.diskStorage({
    // Where to save the file to //
    destination: (req, file, callback) => {
        // Error and folder //
        callback(null, 'images');
    },
    // Second argument of diskStorage function //
    filename: (req, file, callback) => {
        // Give file name and extension //
        // Split white space and replace with underscores //
        const name = file.originalname.split(' ').join('_');
        // MIME_TYPES into file extension //
        const extension = MIME_TYPES[file.mimetype];
        // Error, name and time stamp period then file extension //
        callback(null, name, + Date.now() + '.' + extension);
    }
});

// Export middleware //
// Call multer, pass object, upload single file, image type //
module.exports = multer({ storage: storage }).single('image');