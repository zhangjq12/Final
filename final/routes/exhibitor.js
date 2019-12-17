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
        const auth = await authentication(req);
        const data = await tab.getAuthor(auth);
        for(var i = 0; i < data.length; i++) {
            const iprogress = await progress.getBoothId(data[i]["_id"]);
            data[i]["progress"] = iprogress["eprogress"];
        }
        res.render("construct/exhibitor/index", {title: "EXHIBITOR for exhibitor", status: Head, data: data});
    }
    catch (e) {
        res.render("construct/error", {title: "Error!", status: Head});
    }
});

router.get("/newjob", async (req, res) => {
    const Head = await head(req);
    res.render("construct/exhibitor/newjob", {title: "New Job", status: Head});
});

router.post("/newjob", async (req, res) => {

});

router.get("/show", async (req, res) => {
    const Head = await head(req);
    const id = req.query.id;
    try {
        const data = await tab.getId(id);
        const progressData = await progress.getBoothId(id);
        res.render("construct/exhibitor/show", {title: "Confirm " + data[0]["showName"], status: Head, data: data, progress: progressData});
    }
    catch (e) {

    }
});

router.get("/jobConfirm", async (req, res) => {
    const Head = await head(req);
    const id = req.query.id;
    try {
        const data = await tab.getId(id);
        res.render("construct/exhibitor/jobConfirm", {title: "Confirm " + data[0]["showName"], status: Head, data: data});
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
        const progressData = await progress.getBoothId(id);
        res.render("construct/exhibitor/show", {title: "Confirm " + data[0]["showName"], status: Head, data: data, progress: progressData});
    }
    catch(e) {
        res.render("construct/error", {title: "Error!", status: Head});
    }
});

module.exports = router;