const express = require("express");
const router = express.Router();
const data = require("../data");
const head = require("./head");
const Login = require("./middleware/Login");
const users = data.users;
const passwordHash = require('password-hash');
//const userstore = require("../data/userStore");
const NodeRSA = require('node-rsa');
const keyArr = require("../data/key/key");
const xss = require('xss');

router.get("/", Login, async (req, res) => {
    const Head = await head(req);
    res.render("construct/signin", {title: "Sign In", status: Head});
});

router.post("/", async (req, res) => {
    const Head = await head(req);
    const request = {
        user: xss(req.body.user),
        password: xss(req.body.password),
        rememberme: xss(req.body.rememberme)
    }
    try {
        var key = keyArr[0];
        const data = await users.getName(request["user"]);
        const data2 = await users.getEmail(user);
        if(data.length != 0 && data[0]["userName"] == request["user"] && passwordHash.verify(request["password"], data[0]["hashedPassword"])) {
            const hashedCookie = key.encrypt(request["user"], 'base64');
            //const usernameStore = request["user"];
            //userstore.push(usernameStore);
            const rememberme = request["rememberme"];
            if(rememberme == undefined)
                req.session.user = hashedCookie;
            else {
                req.session.cookie.maxAge = 60 * 1000 * 60 * 24 * 7;
                req.session.user = hashedCookie;
            }
            res.send({"user": request["user"], "status": "success"});
            //res.render("construct/user/success", {title: "Sign In Successful!", status: Head, user: request["user"], operation: ", Welcome Back!"});
        }
        else 
        if(data2.length != 0 && data2[0]["email"] == request["user"] && passwordHash.verify(request["password"], data2[0]["hashedPassword"])) {
            const hashedCookie = key.encrypt(data2[0]["userName"], 'base64');
            //const usernameStore = request["user"];
            //userstore.push(usernameStore);
            const rememberme = request["rememberme"];
            if(rememberme == undefined)
                req.session.user = hashedCookie;
            else {
                req.session.cookie.maxAge = 60 * 1000 * 60 * 24 * 7;
                req.session.user = hashedCookie;
            }
            res.send({"user": data2[0]["userName"], "status": "success"});
        } 
        else {
            res.send({"user": request["user"], "status": "notmatched"});
            //res.render("construct/signin", {title: "Sign In", status: Head, error: "Username or password error!"});
        }
    }
    catch(e) {
        res.render("construct/user/fail", {title: "Sign In Failed", status: Head});
    }
});

module.exports = router;
