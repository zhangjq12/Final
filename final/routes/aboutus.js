const express = require("express");
const router = express.Router();
const head = require("./head");
const data = require("../data");
const calendar = data.calendar;

router.get("/", async (req, res) => {
    const Head = await head(req);
    const tab = req.query.tab;
    res.render("construct/aboutus", {title: "About Us", status: Head, tab: tab, table: calendar});
});

module.exports = router;