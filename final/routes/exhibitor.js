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
const upload2 = require("./middleware/multer2");
const newjobUpload = require("./middleware/newJobMulter");
const xss = require('xss');
const ObjectID = require('mongodb').ObjectID;

router.get("/", async (req, res) => {
    const Head = await head(req);
    try {
        const auth = await authentication(req);
        const voe = await users.getName(auth);
        if(voe[0]["voe"] == "vendor")
            throw "error";
        const data = await tab.getAuthor(auth);
        var existdata = [];
        var invaliddata = [];
        for(var i = 0; i < data.length; i++) {
            const iprogress = await progress.getBoothId(data[i]["boothNum"]);
            data[i]["progress"] = iprogress[0]["eprogress"];
            //console.log(data);
            var outofdate = false;
            var date1 = new Date(data[i]["date"]["end"]);
            var date2 = new Date();
            var yy = date2.getFullYear();
            var mm = date2.getMonth() + 1;
            var dd = date2.getDate();
            var ddd2 = yy + "-" + mm + "-" + dd;
            var date3 = new Date(ddd2);
            if(date1 < date3)
                outofdate = true;

            if(outofdate) {
                invaliddata.splice(0, 0, data[i]);
            }
            else {
                existdata.splice(0, 0, data[i]);
            }
        }
        res.render("construct/exhibitor/index", {title: "EXHIBITOR for exhibitor", status: Head, existdata: existdata, invaliddata: invaliddata});
    }
    catch (e) {
        res.render("construct/error", {title: "Error!", status: Head});
    }
});

router.get("/newjob", async (req, res) => {
    const Head = await head(req);
    const auth = await authentication(req);
    const category = categories;
    if(auth != null){
        res.render("construct/exhibitor/newjob", {title: "New Job", status: Head, author: auth, category: category});
    }
    else {
        res.render("construct/error", {title: "Error!", status: Head});
    }
});

router.post("/newjob", newjobUpload.fields([{name: "elec", maxCount: 1}, {name: "dsgn", maxCount: 1}]), async (req, res) => {
    const request = {
        boothId: xss(req.body.boothId),
        showName: xss(req.body.showName),
        date: xss(req.body.date),
        author: xss(req.body.author),
        size: xss(req.body.size),
        category: xss(req.body.category),
        details: xss(req.body.details)
    }
    try {
        //console.log(typeof request["category"]);
        //console.log(request["category"]);
        var elecFile;
        if(req.files["elec"] != undefined)
            elecFile = req.files["elec"][0].filename;
        else
            elecFile = "";
        const dsgnFile = req.files["dsgn"][0].filename;
        var date = JSON.parse(request["date"]);
        var category = JSON.parse(request["category"]);
        var details = JSON.parse(request["details"]);
        console.log(details);
        //console.log(elecFile);
        if(elecFile == "") {
            category["electricity"]["nonupload"] = "yes";
            category["electricity"].filename = "";
        }
        else
            category["electricity"].filename = elecFile;
        details["designFile"].filename = dsgnFile;
        //console.log(category.electricity);
        //console.log(date);
        //var category = request["category"].split('},');
        //console.log(category);
        //for(var i = 0; i < category.length - 1; i++) {
            //category[i] += "}"
            //category[i] = JSON.parse(category[i]);
        //}
        //category[category.length - 1] = JSON.parse(category[category.length - 1]);
        //console.log(category);
        const data = await tab.getBoothNum(request["boothId"]);
        if(data.length == 0) {
            const data = await tab.create(request["boothId"], request["showName"], date, request["author"], request["size"], category, details);
            const author = await users.getName(request["author"]);
            const time = new Date();
            const t = time.toISOString();
            const data2 = await progress.create("", request["boothId"], author[0]["_id"], "", t, "", "bidding", "");
            const data3 = await progress.getBoothId(request["boothId"]);
            res.send({success: "success"});
        }
        else
            res.send({success: "exist"});
    }
    catch (e) {
        res.send({error: "error"});
    }
});

router.post("/imageUpload", upload2.single('img'), async (req, res) => {
    var fileName = "";
    if(req.file != undefined)
        fileName = req.file.filename;
    try {
        res.send({des: "/public/image/exhibitor/" + fileName});
    }
    catch (e) {
        res.send({error: "error"});
    }
})

router.get("/show", async (req, res) => {
    const Head = await head(req);
    const id = req.query.id;
    try {
        const data = await tab.getBoothNum(id);
        const designFileName = data[0]["details"]["designFile"]["filename"].split("_+_")[1];
        //console.log(designFileName);
        const progressData = await progress.getBoothId(id);
        for(var i = 0; i < data.length; i++) {
            data[i]["progress"] = progressData[0]["eprogress"];
            //console.log(data);
        }
        const priceData = await price.getBoothId(id);
        for(var i = 0; i < priceData.length; i++) {
            //console.log(priceData[i]["vendorId"]);
            const usr = await users.getId(priceData[i]["vendorId"]);
            //console.log(usr);
            priceData[i]["vendorName"] = usr[0]["userName"];
        }
        res.render("construct/exhibitor/show", {title: "Details of " + data[0]["showName"], status: Head, data: data, price: priceData, designFileName: designFileName});
    }
    catch (e) {
        res.render("construct/error", {title: "error", status: Head});
    }
});

router.post("/jobConfirm", async (req, res) => {
    const request = {
        id: req.body.id,
        vendorId: req.body.vendorId
    }
    //console.log(request);
    try {
        const data1 = await progress.getBoothId(request["id"]);
        //console.log(data1);
        for(var i = 0; i < data1.length; i++) {
            if(data1[i]["vendorId"].toString() != request["vendorId"]) {
                const res1 = await progress.remove(data1[i]["_id"].toString());
            }
            else {
                const res2 = await progress.modifyEprogress(data1[i]["_id"].toString(), "waitContract");
                const res3 = await progress.modifyVprogress(data1[i]["_id"].toString(), "waitContract");
            }
        }
        //console.log(data1);
        const data2 = await price.getBoothId(request["id"]);
        //console.log(data2);
        for(var i = 0; i < data2.length; i++) {
            if(data2[i]["vendorId"].toString() != request["vendorId"]) {
                const res1 = await price.remove(data2[i]["_id"].toString());
            }
        }
        //const data4 = await contract.create(request["id"], data3[0]["exhibitorId"], data3[0]["vendorId"], "yes");
        //console.log(data2);
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

router.get("/jobUpdate", async (req, res) => {
    const Head = await head(req);
    const id = req.query.id;
    try {
        const data = await tab.getId(id);
        const progressData = await progress.getBoothId(data[0]["boothId"]);
        res.render("construct/exhibitor/show", {title: "Confirm " + data[0]["showName"], status: Head, data: data, progress: progressData});
    }
    catch(e) {
        res.render("construct/error", {title: "Error!", status: Head});
    }
});

router.get("/contract", async (req, res) => {
    const Head = await head(req);
    const id = req.query.id;
    try {
        const data1 = await tab.getBoothNum(id);
        const data2 = await price.getBoothId(id);
        const data3 = await users.getId(data2[0]["exhibitorId"].toString());
        const data4 = await users.getId(data2[0]["vendorId"].toString());
        const size12 = data1[0]["size"].split(",");
        const size = size12[0] + "✕" + size12[1];
        var data = {exhibitor: data3[0]["userName"], vendor: data4[0]["userName"], showName: data1[0]["showName"], category: data1[0]["category"], size: size, price: data2[0]["price"], details: data1[0]["details"]};
        res.render("construct/contract", {title: "Contract of " + id, status: Head, boothNum: id, voe: "exhibitor", data: data});
    }
    catch (e) {
        res.render("construct/error", {title: "Error!", status: Head});
    }
});

router.get("/payment", async (req, res) => {
    const Head = await head(req);
    const id = req.query.id;
    try {
        const data = await price.getBoothId(id);
        const pricedata = data[0]["price"];
        //console.log(pricedata);
        res.render("construct/exhibitor/payment", {title: "Payment of " + id, status: Head, boothNum: id, price: pricedata});
    }
    catch (e) {
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
            const res1 = await progress.modifyEprogress(data1[i]["_id"].toString(), "waitOppoContract");
            if(data1[i]["vprogress"] == "waitOppoContract") {
                const res2 = await progress.modifyEprogress(data1[i]["_id"].toString(), "waitPayment");
                const res3 = await progress.modifyVprogress(data1[i]["_id"].toString(), "waitPayment");
            }
            //const res2 = await progress.modifyVprogress(data1[i]["_id"].toString(), "waitPayment");
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

router.post("/pay", async (req, res) => {
    const request = {
        id: req.body.id,
        success: req.body.success
    }
    //console.log(request);
    try {
        if(request["success"] != "y")
            throw "error";
        const data1 = await progress.getBoothId(request["id"]);
        //console.log(data1);
        for(var i = 0; i < data1.length; i++) {
            const res1 = await progress.modifyEprogress(data1[i]["_id"].toString(), "paid");
            const res2 = await progress.modifyVprogress(data1[i]["_id"].toString(), "paid");
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