const express = require("express");
const router = express.Router();
const data = require("../data");
const head = require("./head");
const users = data.users;
const NodeRSA = require('node-rsa');
const keyArr = require("../data/key/key");

router.get("/", async (req, res) => {
    const Head = await head(req);
    res.render("construct/signup", {title: "Sign Up", status: Head});
});

router.post("/", async (req, res) => {
    const Head = await head(req);
    const request = req.body
    try {
        var key = keyArr[0];
        const data = await users.check(request["user"]);
        if(data.length == 0) {
            const result = await users.create(request["user"], request["password"], request["firstName"], request["lastName"], request["email"]);
            const hashedCookie = key.encrypt(request["user"], 'base64');
            req.session.user = hashedCookie;
            res.render("construct/user/success", {title: "Sign Up Successful!", status: Head, user: request["user"], operation: ", Welcome the new User!"});
        }
        else
            res.render("construct/signup", {title: "Sign Up", status: Head, error: "Username exists!"});
    }
    catch(e) {
        res.render("construct/user/fail", {title: "Sign Up Failed", status: Head});
    }
});

module.exports = router;
