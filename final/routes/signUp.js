const express = require("express");
const router = express.Router();
const data = require("../data");
const head = require("./head");
const users = data.users;
const NodeRSA = require('node-rsa');
const keyArr = require("../data/key/key");
const xss = require('xss');
const upload = require("../routes/middleware/multer3");

router.get("/", async (req, res) => {
    const Head = await head(req);
    const voe = req.query.name;
    res.render("construct/signup", {title: "Sign Up", status: Head, license: "defaultHead.jpg", personal: "defaultHead.jpg", voe: voe});
});

router.get("/", async (req, res) => {
    const Head = await head(req);
    res.render("construct/signup", {title: "Sign Up", status: Head, license: "defaultHead.jpg", personal: "defaultHead.jpg"});
});

router.post("/", upload.fields([{name: "personal", maxCount: 1}, {name: "license", maxCount: 1}]), async (req, res) => {
    const Head = await head(req);
    const request = {
        user: xss(req.body.user),
        password: xss(req.body.password),
        conPassword: xss(req.body.conPassword),
        email: xss(req.body.email),
        CompanyInfo: xss(req.body.company),
        ContactInfo: xss(req.body.contact),
        Address: xss(req.body.address),
        StateId: xss(req.body.stateId),
        TaxId: xss(req.body.taxId),
        voe: xss(req.body.voe)
    }
    const personal = req.files["personal"][0].filename;
    const license = req.files["license"][0].filename;
    try {
        var key = keyArr[0];
        const data = await users.check(request["user"]);
        const data2 = await users.getEmail(request["email"]);
        if(request["password"] != request["conPassword"]) {
            res.send({"user": request["user"], "status": "passworderror"});
        }
        else
        if(data.length == 0 && data2.length == 0) {
            const result = await users.create(request["user"], request["password"], request["email"], request["CompanyInfo"], request["ContactInfo"], request["Address"], license, personal, request["StateId"], request["TaxId"], request["voe"]);
            const hashedCookie = key.encrypt(request["user"], 'base64');
            req.session.user = hashedCookie;
            res.send({"user": request["user"], "status": "success"});
            //res.render("construct/user/success", {title: "Sign Up Successful!", status: Head, user: request["user"], operation: ", Welcome the new User!"});
        }
        else
            res.send({"user": request["user"], "status": "notmatched"});
            //res.render("construct/signup", {title: "Sign Up", status: Head, error: "Username exists!"});
    }
    catch(e) {
        res.render("construct/user/fail", {title: "Sign Up Failed", status: Head});
    }
});

module.exports = router;
