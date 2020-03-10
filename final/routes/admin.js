const express = require("express");
const router = express.Router();
const data = require("../data");
const tab = data.tab;
const users = data.users;
const head = require("./head");
const comments = data.comments;
const progress = data.progress;
const contract = data.contract;
const categories = data.categories;
const price = data.price;
const authentication = require("./authentication");
const xss = require('xss');

router.get("/", async (req, res) => {
    const Head = await head(req);
    try {
        const auth = await authentication(req);
        const voe = await users.getName(auth);
        if(voe[0]["voe"] != "admin")
            throw "error";
        const data1 = await progress.getAll();
        var data = [];
        for(var i = 0; i < data1.length; i++) {
            var data4, data5;
            if(data1[i]["vendorId"] != "") {
                data4 = await users.getId(data1[i]["vendorId"].toString());
                data1[i]["vendorName"] = data4[0]["userName"];
            }
            else {
                data1[i]["vendorName"] = "";
            }
            //console.log(data4);
            if(data1[i]["exhibitorId"] != "") {
                data5 = await users.getId(data1[i]["exhibitorId"].toString());
            //console.log(data1[i]);
                data1[i]["exhibitorName"] = data5[0]["userName"];
            }
            else {
                data1[i]["exhibitorName"] = "";
            }
            data.splice(0, 0, data1[i]);
            //console.log(data);
        }
        //console.log(data);
        res.render("construct/admin/index", {title: "Progress management", status: Head, data: data});
    }
    catch(e) {
        res.render("construct/error", {title: "Error!", status: Head});
    }
});

router.post("/confirmExh", async (req, res) => {
    const request = {
        id: req.body.id
    }
    //console.log(request);
    try {
        const data1 = await progress.getShowName(request["id"]);
        for(var i = 0; i < data1.length; i++) {
            const res1 = await progress.modifyVprogress(data1[i]["_id"].toString(), "30% Paid");
            const res2 = await progress.modifyEprogress(data1[i]["_id"].toString(), "done");
        }
        const data3 = await users.getId(data1[0]["exhibitorId"].toString());
        const data4 = await users.getId(data1[0]["vendorId"].toString());
        res.send({success: "success", showName: request["id"], admin: "administrator", exhibitor: data3[0]["userName"], vendor: data4[0]["userName"]});
    }
    catch(e) {
        res.send({error: "error"});
    }
});

router.post("/proof/manager", async (req, res) => {
    const request = {
        id: req.body.id
    }
    //console.log(request);
    try {
        const data1 = await progress.getShowName(request["id"]);
        for(var i = 0; i < data1.length; i++) {
            const res1 = await progress.modifyVprogress(data1[i]["_id"].toString(), "Proved by Finance");
        }
        res.send({success: "success", showName: request["id"], admin: "administrator", manager: "manager"});
    }
    catch(e) {
        res.send({error: "error"});
    }
});

router.post("/proof/vendor", async (req, res) => {
    const request = {
        id: req.body.id
    }
    //console.log(request);
    try {
        const data1 = await progress.getShowName(request["id"]);
        for(var i = 0; i < data1.length; i++) {
            if(data1[0]["vprogress"] == "Proved by Manager") {
                const res2 = await progress.modifyVprogress(data1[i]["_id"].toString(), "done");
            }
        }
        const data4 = await users.getId(data1[0]["vendorId"].toString());
        res.send({success: "success", showName: request["id"], vendor: data4[0]["userName"], admin: "administrator"});
    }
    catch(e) {
        res.send({error: "error"});
    }
});

module.exports = router;