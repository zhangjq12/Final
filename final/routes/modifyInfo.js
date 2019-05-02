const express = require("express");
const router = express.Router();
const data = require("../data");
const users = data.users;
const head = require("./head");
const authentication = require("./authentication");
const upload = require("./middleware/multer");

router.get("/", async (req, res) => {
    const Head = await head(req);
    const auth = await authentication(req);
    if(auth != null){
        const datas = await users.getName(auth);
        res.render("construct/user/modify", {title: "New Tabs", status: Head, user: auth, first: datas[0]["firstName"], last: datas[0]["lastName"], email: datas[0]["email"], portrait: datas[0]["portrait"]});
    }
    else
        res.render("construct/index", {title: "Guitar Tabs", status: Head, error: "You should log in first!"});
});

router.post("/", upload.single('portrait'), async (req, res) => {
    const Head = await head(req);
    const request = req.body;
    const auth = await authentication(req);
    const fileName = req.file.filename;
    try {
        var res1, res2, res3, res4;
        if(request["password"] != undefined)
            res1 = await users.modifyPassword(auth, request["password"]);
        if(request["email"] != undefined)
            res2 = await users.modifyEmail(auth, request["email"]);
        if(request["firstName"] != undefined && request["lastName"])
            res3 = await users.modifyName(auth, request["firstName"], request["lastName"]);
        res4 = await users.modifyPortrait(auth, fileName);
        res.render("construct/user/success", {title: "Modify Successful!", status: Head, user: auth, operation: "'s Information has been modified!"});
    }
    catch(e) {
        res.render("construct/user/fail", {title: "Modify failed!", status: Head, operation: "Modify failed!"});
    }
});

module.exports = router;
