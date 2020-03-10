const express = require("express");
const router = express.Router();
const data = require("../data");
const users = data.users;
const tab = data.tab;
const progress = data.progress;
const requests = data.requests;
const proofs = data.proof;
const head = require("./head");
const authentication = require("./authentication");
const xss = require('xss');

router.get("/", async (req, res) => {
    res.redirect("/aftersale/requests/index");
});

router.get("/requests/show", async (req, res) => {
    const Head = await head(req);
    const showName = req.query.id;
    try {
        const auth = await authentication(req);
        const voe = await users.getName(auth);
        if(voe[0]["voe"] != "aftersale") {
            throw "error";
        }
        const data1 = await progress.getShowName(showName);
        const data2 = await requests.getShowName(showName);
        res.render("construct/aftersale/requests/show", {title: "Complaints of " + showName, status: Head, showName: showName, progress: data1[0], requests: data2[0]});
    }
    catch(e) {
        res.render("construct/error", {title: "error", status: Head});
    }
});
router.get("/requests/index", async (req, res) => {
    const Head = await head(req);
    try {
        const auth = await authentication(req);
        const voe = await users.getName(auth);
        if(voe[0]["voe"] != "aftersale") {
            throw "error";
        }
        const data1 = await progress.getAll();
        var data = [];
        for(var i = 0; i < data1.length; i++) {
            if(data1[i]["eprogress"] == "Complaint" || data1[i]["eprogress"] == "Complaint Processing" || data1[i]["eprogress"] == "Complaint Solved" || data1[i]["eprogress"] == "Complaint Solved by Manager") {
                const res1 = await users.getId(data1[i]["exhibitorId"].toString());
                const res2 = await users.getId(data1[i]["vendorId"].toString());
                data1[i]["exhibitorName"] = res1[0]["userName"];
                data1[i]["vendorName"] = res2[0]["userName"];
                data.splice(0, 0, data1[i]);
            }
        }
        res.render("construct/aftersale/requests/index", {title: "After Sale Dealing: Complaints", status: Head, data: data});
    }
    catch(e) {
        res.render("construct/error", {title: "error", status: Head});
    }
});

router.get("/proof/index", async (req, res) => {
    const Head = await head(req);
    try {
        const auth = await authentication(req);
        const voe = await users.getName(auth);
        if(voe[0]["voe"] != "aftersale") {
            throw "error";
        }
        const data1 = await progress.getAll();
        var data = [];
        for(var i = 0; i < data1.length; i++) {
            if(data1[i]["vprogress"] == "Proof Uploaded") {
                const res1 = await users.getId(data1[i]["exhibitorId"].toString());
                const res2 = await users.getId(data1[i]["vendorId"].toString());
                data1[i]["exhibitorName"] = res1[0]["userName"];
                data1[i]["vendorName"] = res2[0]["userName"];
                data.splice(0, 0, data1[i]);
            }
        }
        res.render("construct/aftersale/proof/index", {title: "After Sale Dealing: Proof", status: Head, data: data});
    }
    catch(e) {
        res.render("construct/error", {title: "error", status: Head});
    }
});

router.get("/proof/show", async (req, res) => {
    const Head = await head(req);
    const showName = req.query.id;
    try {
        const auth = await authentication(req);
        const voe = await users.getName(auth);
        if(voe[0]["voe"] != "aftersale") {
            throw "error";
        }
        const data2 = await proofs.getShowName(showName);
        res.render("construct/aftersale/proof/show", {title: "Proof of " + showName, status: Head, showName: showName, proof: data2})
    }
    catch(e) {
        res.render("construct/error", {title: "error", status: Head});
    }
});

router.post("/requests/processing", async (req, res) => {
    const request = {
        showName: xss(req.body.showName)
    }
    try {
        const data1 = await progress.getShowName(request["showName"]);
        const id = data1[0]["_id"].toString();
        const res1 = await progress.modifyEprogress(id, "Complaint Processing");
        res.send({success: "success", showName: request["showName"], aftersale: "aftersale"});
    }
    catch(e) {
        res.send({error: "error"});
    }
});

router.post("/requests/solved", async (req, res) => {
    const request = {
        showName: xss(req.body.showName)
    }
    try {
        const data1 = await progress.getShowName(request["showName"]);
        const id = data1[0]["_id"].toString();
        const res1 = await progress.modifyEprogress(id, "Complaint Solved");
        const exhibitor = await users.getId(id);
        res.send({success: "success", showName: request["showName"], aftersale: "aftersale", exhibitor: exhibitor[0]["userName"]});
    }
    catch(e) {
        res.send({error: "error"});
    }
});

router.post("/proof", async (req, res) => {
    const request = {
        showName: xss(req.body.showName)
    }
    try {
        const data1 = await progress.getShowName(request["showName"]);
        const id = data1[0]["_id"].toString();
        if(data1[0]["vprogress"] == "Proof Uploaded") {
            const res2 = await progress.modifyVprogress(id, "Proved by Service");
        }
        res.send({success: "success", showName: request["showName"], admin: "administrator", aftersale: "aftersale"});
    }
    catch(e) {
        res.send({error: "error"});
    }
});



module.exports = router;
