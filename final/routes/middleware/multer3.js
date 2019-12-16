const multer = require('multer');
//const hash = require('password-hash');

var upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            if(file.fieldname === "license")
                cb(null, __dirname + '../../../public/image/license');
            else
            if(file.fieldname === "personal")
                cb(null, __dirname + '../../../public/image/personal');
        },
        filename: function (req, file, cb) {
            var changedName = (new Date().getTime())+'-'+file.originalname;
            cb(null, changedName);
        }
    })
});

module.exports = upload;