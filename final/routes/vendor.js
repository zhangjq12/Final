const express = require("express");
const router = express.Router();
const data = require("../data");
const tab = data.tab;
const users = data.users;
const head = require("./head");
const comments = data.comments;
const progress = data.progress;
const price = data.price;
const authentication = require("./authentication");
const upload2 = require("./middleware/multer2");
const xss = require('xss');
const ObjectID = require('mongodb').ObjectID;

router.get("/", async (req, res) => {
    const Head = await head(req);
    const auth = await authentication(req);
    try {
        const data = await tab.getAll();
        const user = await users.getName(auth);
        if(user[0]["voe"] == "exhibitor")
            throw "error";
        var datajobs = [];
        var dataprogress = [];
        for(var i = 0; i < data.length; i++) {
            const iprogress = await progress.getBoothId(data[i]["boothNum"]);
            var boo = false;
            var bidding = false;
            for(var j = 0; j < iprogress.length; j++) {
                if(iprogress[j]["vendorId"].toString() == user[0]["_id"].toString()) {
                    data[i]["progress"] = iprogress[j]["vprogress"];
                    dataprogress.push(data[i]);
                    boo = true;
                }
                if(iprogress[j]["eprogress"] == "bidding") {
                    bidding = true;
                }
            }
            if(!boo && bidding) {
                datajobs.push(data[i]);
            }
            /*if(iprogress[0]["eprogress"] == 'bidding') {
                datajobs.push(data[i]);
            }
            if(iprogress[0]["vendorId"] == user[0]["_id"]) {
                data[i]["prgress"] = iprogress[0]["vprogress"];
                dataprogress.push(data[i]);
            }*/
        }
        res.render("construct/vendor/index", {title: "EXHIBITOR for vendor", status: Head, dataprogress: dataprogress, datajobs: datajobs});
    }
    catch (e) {
        res.render("construct/error", {title: "Error!", status: Head});
    }
});

router.post("/estimate", async (req, res) => {
    const Head = await head(req);
    const user = await authentication(req);
    const request = {
        id: req.body.id,
        price: req.body.price
    }
    //console.log(request);
    try {
        const data = await price.getBoothId(request["id"]);
        const data1 = await tab.getBoothNum(request["id"]);
        const data2 = await users.getName(data1[0]["author"]);
        const data3 = await users.getName(user);
        const progressId = data1[0]["_id"].toString() + data3[0]["_id"].toString();
        const time = new Date();
        const t = time.toISOString();
        const progressData = await progress.getBoothId(request["id"]);
        const t1 = progressData[0]["etime"];
        const progress1 = await progress.create(progressId, request["id"], data2[0]["_id"], data3[0]["_id"], t1, t, "bidding", "bidding");
        var boo = false;
        var pid;
        for(var i = 0; i < data.length; i++) {
            if(data[i]["vendorId"] == data3[0]["_id"]) {
                boo = true;
                pid = data[i]["_id"];
                break;
            }
        }
        var data4;
        if(!boo) {
            data4 = await price.create(request["id"], data2[0]["_id"], data3[0]["_id"], request["price"]);
        }
        else {
            data4 = await price.modifyPrice(pid, request["price"]);
        }
        res.redirect("/vendor");
    }
    catch(e) {
        res.render("construct/error", {title: "Error!", status: Head});
    }
});

router.post("/jobConfirm", async (req, res) => {
    
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