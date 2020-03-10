const multer = require('multer');
//const hash = require('password-hash');

var upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            switch(file.fieldname) {
                case "carpet": cb(null, __dirname + '../../../public/image/Requests/carpet'); break;
                case "panel": cb(null, __dirname + '../../../public/image/Requests/panel'); break;
                case "lighting": cb(null, __dirname + '../../../public/image/Requests/lighting'); break;
                case "electricity": cb(null, __dirname + '../../../public/image/Requests/electricity'); break;
                case "graphic": cb(null, __dirname + '../../../public/image/Requests/graphic'); break;
                case "display": cb(null, __dirname + '../../../public/image/Requests/display'); break;
                case "furniture": cb(null, __dirname + '../../../public/image/Requests/furniture'); break;
                case "accessories": cb(null, __dirname + '../../../public/image/Requests/accessories'); break;
                case "showsite": cb(null, __dirname + '../../../public/image/Requests/showsite'); break;
            }
        },
        filename: function (req, file, cb) {
            var changedName = (new Date().getTime())+'_+_'+file.originalname;
            cb(null, changedName);
        }
    })
});

module.exports = upload;