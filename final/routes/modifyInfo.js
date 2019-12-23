const express = require("express");
const router = express.Router();
const data = require("../data");
const users = data.users;
const head = require("./head");
const authentication = require("./authentication");
const upload = require("./middleware/multer");
const deletefile = require("./delete");
const xss = require('xss');

router.get("/", async (req, res) => {
    const Head = await head(req);
    const auth = await authentication(req);
    if(auth != null){
        const datas = await users.getName(auth);
        res.render("construct/user/modify", {title: "Modify Infomation", status: Head, user: auth, portrait: datas[0]["portrait"]});
    }
    else
        res.render("construct/index", {title: "Guitar Tabs", status: Head, error: "You should log in first!"});
});

router.post("/", upload.single('portrait'), async (req, res) => {
    const Head = await head(req);
    const request = {
        password: xss(req.body.password),
        conPassword: xss(req.body.conPassword),
    }
    const auth = await authentication(req);
    var fileName = "";
    if(req.file != undefined)
        fileName = req.file.filename;
    try {
        var data = await users.getName(auth);
        var res1, res2, res3, res4, res5;
        if(request["password"] != '' && request["conPassword"] == request["password"]) {
            res1 = await users.modifyPassword(auth, request["password"]);
        }
        if(fileName != "") {
            res4 = await users.modifyPortrait(auth, fileName);
            if(data[0]["portrait"] != "defaultHead.jpg")
                res5 = deletefile('/../public/image/portrait/', data[0]["portrait"]);
        }
        if(!res5)
            throw "e";
        res.send({"user": auth, "name": "success"});
        //res.render("construct/user/success", {title: "Modify Successful!", status: Head, user: auth, operation: "'s Information has been modified!"});
    }
    catch(e) {
        res.send({"user": auth, "name": "fail"});
        //res.render("construct/user/fail", {title: "Modify failed!", status: Head, operation: "Modify failed!"});
    }
});

module.exports = router;
