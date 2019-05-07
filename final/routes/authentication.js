const passwordHash = require('password-hash');
const keyArr = require("../data/key/key");
const NodeRSA = require('node-rsa');
const user = require("../data/users");
const xss = require('xss');

async function auth(req) {
    var key = keyArr[0];
    var Session = req.session;
    var hashedSession = undefined;
    if(Session != undefined)
        hashedSession = Session.user;
    if(hashedSession != undefined) {
        const userSession = key.decrypt(hashedSession, 'utf8');
        const res1 = await user.check(userSession);
        if(res1.length > 0) {
            return res1[0]["userName"];
        }
        else
            return null;
    }
    else {
        return null;
    }
}

module.exports = auth;