const multer = require('multer');
//const hash = require('password-hash');

var upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + '../../../public/image/portrait');
        },
        filename: function (req, file, cb) {
            var changedName = (new Date().getTime())+'-'+file.originalname;
            cb(null, changedName);
        }
    })
});

module.exports = upload;