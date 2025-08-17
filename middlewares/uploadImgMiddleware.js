const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const ApiError = require('../utils/ApiError');
exports.uploadSingleImg = (fieldName,folderName,name) => {
   console.log(fieldName,folderName,name);
   
    const multerStorage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${folderName}`);
        },
        filename: function (req, file, cb) {
            // user-${id}-Date.now()-extension
            const ext = file.mimetype.split("/")[1]
            const fileName = `${name}-${uuidv4()}-${Date.now()}.${ext}`;            
            cb(null, fileName)
        }
    })

    function fileFilter(req, file, cb) {
        if (file.mimetype.startsWith("image")) {
            cb(null, true)
        }
        else {
            cb(new ApiError("Only Images allowed", 400), false)
        }
    }
    const upload = multer({ storage: multerStorage, fileFilter })
    console.log(fieldName);
    
    return upload.single(fieldName)
}



exports.uploadMixOfImages = (fields, folderName, fileName) => {
    console.log(fields, folderName, fileName);
    
    const multerStorage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${folderName}`);
            console.log(10);
            
        },
        filename: function (req, file, cb) {
            const ext = file.mimetype.split("/")[1];
            const customFileName = `${fileName}-${uuidv4()}-${Date.now()}.${ext}`;
            console.log(customFileName);
            
            cb(null, customFileName);
        }
    });

    function fileFilter(req, file, cb) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new ApiError("Only images (JPEG, PNG, GIF, WEBP) are allowed", 400), false);
        }
    }

    const upload = multer({ storage: multerStorage, fileFilter });
    return upload.fields(fields); // Ensure you're using upload.fields
};
