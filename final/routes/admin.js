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
    const Head = head(req);
    try {
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

router.post("/finish", async (req, res) => {
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
            const res1 = await progress.modifyEprogress(data1[i]["_id"].toString(), "paychecked");
            const res2 = await progress.modifyVprogress(data1[i]["_id"].toString(), "paychecked");
        }
        const data3 = await price.getBoothId(request["id"]);
        const data4 = await users.getId(data3[0]["vendorId"].toString());
        const data5 = await users.getId(data3[0]["exhibitorId"].toString());
        const booth = await tab.getBoothNum(request["id"]);
        res.send({success: "success", showName: booth[0]["showName"], vendor: data4[0]["userName"], exhibitor: data5[0]["userName"]});
    }
    catch(e) {
        res.send({error: "error"});
    }
});

module.exports = router;