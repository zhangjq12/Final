const multer = require('multer');
//const hash = require('password-hash');

var upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + '../../../public/image/Estimate/extra');
        },
        filename: function (req, file, cb) {
            var changedName = (new Date().getTime())+'_+_'+file.originalname;
            cb(null, changedName);
        }
    })
});

module.exports = upload;