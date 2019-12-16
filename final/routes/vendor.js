const express = require("express");
const router = express.Router();
const data = require("../data");
const tab = data.tab;
const users = data.users;
const head = require("./head");
const comments = data.comments;
const progress = data.progress;
const authentication = require("./authentication");
const upload2 = require("./middleware/multer2");
const xss = require('xss');
const ObjectID = require('mongodb').ObjectID;

router.get("/", async (req, res) => {
    const Head = await head(req);
    try {
        const data = await tab.getAll();
        res.render("construct/vendor/index", {title: "EXHIBITOR for vendor", status: Head, data: data});
    }
    catch (e) {
        res.render("construct/error", {title: "Error!", status: Head});
    }
});

router.post("/priceChange", async (req, res) => {

});

router.get("/jobConfirm", async (req, res) => {
    const Head = await head(req);
    const id = req.query.id;
    try {
        const data = await tab.getId(id);
        const data2 = await 
        res.render("construct/vendor/jobConfirm", {title: "Confirm " + data[0]["showName"], status: Head, data: data});
    }
    catch(e) {
        res.render("construct/error", {title: "Error!", status: Head});
    }
});

router.get("/jobUpdate", async (req, res) => {
    const Head = await head(req);
    const id = req.query.id;
    try {
        const data = await tab.getId(id);
        res.render("construct/vendor/jobConfirm", {title: "Confirm " + data[0]["showName"], status: Head, data: data});
    }
    catch(e) {
        res.render("construct/error", {title: "Error!", status: Head});
    }
});

module.exports = router;