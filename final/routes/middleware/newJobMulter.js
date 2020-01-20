const multer = require('multer');
//const hash = require('password-hash');

var upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            if(file.fieldname === "elec")
                cb(null, __dirname + '../../../public/image/exhibitor/electricity');
            else
            if(file.fieldname === "dsgn")
                cb(null, __dirname + '../../../public/image/exhibitor/designPlan');
        },
        filename: function (req, file, cb) {
            var changedName = (new Date().getTime())+'_+_'+file.originalname;
            cb(null, changedName);
        }
    })
});

module.exports = upload;