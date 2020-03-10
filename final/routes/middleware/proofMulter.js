const multer = require('multer');
//const hash = require('password-hash');

var upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            switch(file.fieldname) {
                case "bills": cb(null, __dirname + '../../../public/image/Proofs/bills'); break;
                case "finished": cb(null, __dirname + '../../../public/image/Proofs/finished'); break;
            }
        },
        filename: function (req, file, cb) {
            var changedName = (new Date().getTime())+'_+_'+file.originalname;
            cb(null, changedName);
        }
    })
});

module.exports = upload;