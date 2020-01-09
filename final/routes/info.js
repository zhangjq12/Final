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
    const user = req.query.name;
    if(auth != null){
        const datas = await users.getName(user);
        res.render("construct/user/show", {title: "User Infomation", status: Head, data: datas});
    }
    else
        res.render("construct/error", {title: "Exhibitor", status: Head, error: "You should log in first!"});
});

module.exports = router;