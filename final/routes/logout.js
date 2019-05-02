const express = require("express");
const router = express.Router();
const head = require("./head");
const Logout = require("./middleware/Logout");

router.get("/", Logout, async (req, res) => {
    const Head = await head(req);
    res.clearCookie("user");
    req.session.destroy();
    res.render("construct/user/logout", {title: "Log Out Successful!", status: Head});
});

module.exports = router;