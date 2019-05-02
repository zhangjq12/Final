const head = require("../head");

isLogin = async (req, res, next) =>{
    const HEAD = await head(req);
    if(req.session.user) {
        res.status(403).render("construct/user/fail", {title: "Error", status: HEAD, operation: "You have already logged in!"});
    }
    else {
        next();
    }
}

module.exports = isLogin;