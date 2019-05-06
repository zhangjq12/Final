const express = require("express");
const router = express.Router();
const data = require("../data");
const head = require("./head");
const users = data.users;
const NodeRSA = require('node-rsa');
const keyArr = require("../data/key/key");
const xss = require('xss');

router.get("/", async (req, res) => {
    const Head = await head(req);
    res.render("construct/signup", {title: "Sign Up", status: Head});
});

router.post("/", async (req, res) => {
    const Head = await head(req);
    const request = {
        user: xss(req.body.user),
        password: xss(req.body.password),
        conPassword: xss(req.body.conPassword),
        firstName: xss(req.body.firstName),
        lastName: xss(req.body.lastName),
        email: xss(req.body.email)
    }
    try {
        var key = keyArr[0];
        const data = await users.check(request["user"]);
        if(request["password"] != request["conPassword"]) {
            res.send({"user": request["user"], "status": "passworderror"});
        }
        else
        if(data.length == 0) {
            const result = await users.create(request["user"], request["password"], request["firstName"], request["lastName"], request["email"]);
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
