const express = require("express");
const router = express.Router();
const data = require("../data");
const tab = data.tab;
const users = data.users;
const head = require("./head");
const comments = data.comments;
const progress = data.progress;
const contract = data.contract;
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
            const size12 = data[i]["size"].split(",");
            data[i]["size"] = size12[0] + "✕" + size12[1];
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

/*router.get("/show", async (req, res) => {
    const Head = await head(req);
    const id = req.query.id;
    try {
        const data = await tab.getBoothNum(id);
        const progressData = await progress.getBoothId(id);
        for(var i = 0; i < data.length; i++) {
            data[i]["progress"] = progressData[0]["vprogress"];
            //console.log(data);
        }
        const priceData = await price.getBoothId(id);
        for(var i = 0; i < priceData.length; i++) {
            //console.log(priceData[i]["vendorId"]);
            const usr = await users.getId(priceData[i]["vendorId"]);
            //console.log(usr);
            priceData[i]["vendorName"] = usr[0]["userName"];
        }
        res.render("construct/exhibitor/show", {title: "Details of " + data[0]["showName"], status: Head, data: data, price: priceData});
    }
    catch (e) {
        res.render("construct/error", {title: "error", status: Head});
    }
});*/

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
        res.send({success: "success"});
    }
    catch(e) {
        res.send({error: "error"});
    }
});

router.post("/jobConfirm", async (req, res) => {
    const request = {
        id: req.body.id,
        success: req.body.success
    }
    //console.log(request);
    try {
        if(request["success"] != "y")
            throw "error";
        const data1 = await progress.getBoothId(request["id"]);
        for(var i = 0; i < data1.length; i++) {
            const res1 = await progress.modifyEprogress(data1[i]["_id"].toString(), "done");
            const res2 = await progress.modifyVprogress(data1[i]["_id"].toString(), "done");
        }
        const data3 = await price.getBoothId(request["id"]);
        const data4 = await users.getId(data3[0]["vendorId"].toString());
        const data5 = await users.getId(data3[0]["exhibitorId"].toString());
        const booth = await tab.getBoothNum(request["id"]);
        res.send({success: "success", showName: booth[0]["showName"], vendor: data4[0]["userName"], exhibitor: data5[0]["userName"]});
    }
    catch(e) {
        res.send({error: "error"})
    }
});

router.get("/contract", async (req, res) => {
    const Head = await head(req);
    const id = req.query.id;
    try {
        res.render("construct/contract", {title: "Contract of " + id, status: Head, boothNum: id, voe: "vendor"});
    }
    catch (e) {
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

router.post("/acceptContract", async (req, res) => {
    const request = {
        id: req.body.id,
        accept: req.body.accept
    }
    //console.log(request);
    try {
        if(request["accept"] != "y")
            throw "error";
        const data1 = await progress.getBoothId(request["id"]);
        for(var i = 0; i < data1.length; i++) {
            //const res1 = await progress.modifyEprogress(data1[i]["_id"].toString(), "waitPayment");
            const res1 = await progress.modifyVprogress(data1[i]["_id"].toString(), "waitOppoContract");
            if(data1[i]["eprogress"] == "waitOppoContract") {
                const res2 = await progress.modifyEprogress(data1[i]["_id"].toString(), "waitPayment");
                const res3 = await progress.modifyVprogress(data1[i]["_id"].toString(), "waitPayment");
            }
        }
        const data3 = await price.getBoothId(request["id"]);
        const data4 = await users.getId(data3[0]["vendorId"].toString());
        const data5 = await users.getId(data3[0]["exhibitorId"].toString());
        const booth = await tab.getBoothNum(request["id"]);
        res.send({success: "success", showName: booth[0]["showName"], vendor: data4[0]["userName"], exhibitor: data5[0]["userName"]});
    }
    catch(e) {
        res.send({error: "error"})
    }
});

module.exports = router;