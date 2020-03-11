const express = require("express");
const router = express.Router();
const head = require("./head");

router.get("/", async (req, res) => {
    const Head = await head(req);
    res.render("construct/aboutus", {title: "About Us", status: Head});
});

module.exports = router;