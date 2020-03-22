const express = require("express");
const router = express.Router();
const head = require("./head");

router.get("/", async (req, res) => {
    const Head = await head(req);
    const tab = req.query.tab;
    res.render("construct/aboutus", {title: "About Us", status: Head, tab: tab});
});

module.exports = router;