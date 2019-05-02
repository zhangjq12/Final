const head = require("../head");
isLogout = async (req, res, next) =>{
    const HEAD = await head(req);
    if(req.session.user) {
        next();
    }
    else {
        res.status(403).render("construct/user/fail", {title: "Error", status: HEAD, operation: "You have already logged out!"});
    }
}

module.exports = isLogout;