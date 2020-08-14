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
const requests = data.requests;
const vendorStars = data.vendorStars;
const authentication = require("./authentication");
const upload2 = require("./middleware/multer2");
const newjobUpload = require("./middleware/newJobMulter");
const requestsUpload = require("./middleware/requestsMulter");
const xss = require('xss');
const ObjectID = require('mongodb').ObjectID;

router.get("/", async (req, res) => {
    const Head = await head(req);
    try {
        const auth = await authentication(req);
        const voe = await users.getName(auth);
        if(voe[0]["voe"] != "exhibitor")
            throw "error";
        const data = await tab.getAuthor(auth);
        var existdata = [];
        var invaliddata = [];
        var datadone = [];
        for(var i = 0; i < data.length; i++) {
            const iprogress = await progress.getShowName(data[i]["showName"]);
            data[i]["progress"] = iprogress[0]["eprogress"];
            const stars = await vendorStars.getShowName(data[i]["showName"]);
            if(stars.length != 0) {
                data[i]["stars"] = stars[0]["stars"];
                data[i]["comments"] = stars[0]["description"];
            }
            var showNameLink = data[i]["showName"];
            showNameLink = showNameLink.replace(" ", "");
            data[i]["showNameLink"] = showNameLink;
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
            else 
            if(data[i]["progress"] == "done" || data[i]["progress"] == "Complaint" || data[i]["progress"] == "Complaint Processing" || data[i]["progress"] == "Complaint Solved") {
                datadone.splice(0, 0, data[i]);
            }
            else {
                existdata.splice(0, 0, data[i]);
            }
        }
        res.render("construct/exhibitor/index", {title: "EXHIBITOR for exhibitor", status: Head, existdata: existdata, datadone: datadone});
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

router.post("/newjob", newjobUpload.fields([{name: "elec", maxCount: 1}, {name: "dsgn", maxCount: 10}]), async (req, res) => {
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

        request["showName"] = request["showName"].replace(/(^\s*)|(\s*$)/g, "");
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
        const data = await tab.getName(request["showName"]);
        if(data.length == 0) {
            var elecFile;
            if(req.files["elec"] != undefined)
                elecFile = req.files["elec"][0].filename;
            else
                elecFile = "";
            const dsgnFiles = req.files["dsgn"];
            //console.log(dsgnFiles.length);
            var dsgnFilesName = [];
            for(var c of dsgnFiles) {
                const obj = {name: c.filename};
                dsgnFilesName.push(obj);
            }
            var date = JSON.parse(request["date"]);
            var category = JSON.parse(request["category"]);
            var details = JSON.parse(request["details"]);
            //console.log(details);
            //console.log(elecFile);
            if(elecFile == "") {
                category["electricity"]["nonupload"] = "yes";
                category["electricity"].filename = "";
            }
            else
                category["electricity"].filename = elecFile;
            details["designFile"].filename = dsgnFilesName;
            const data = await tab.create(request["boothId"], request["showName"], date, request["author"], request["size"], category, details);
            const author = await users.getName(request["author"]);
            const time = new Date();
            const t = time.toISOString();
            const data2 = await progress.create("", request["showName"], author[0]["_id"], "", t, "", "bidding", "");
            const data3 = await progress.getShowName(request["showName"]);
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
    const showName = req.query.id;
    try {
        const data = await tab.getName(showName);
        const userName = data[0]["author"];
        const auth = await authentication(req);
        if(auth == userName || data[0]["voe"] == "manager") {
            const designFile = data[0]["details"]["designFile"]["filename"];
            for(var i = 0; i < designFile.length; i++) {
                const filename = designFile[i]["name"].split("_+_")[1];
                data[0]["details"]["designFile"]["filename"][i]["fileName"] = filename;
            }
            const progressData = await progress.getShowName(showName);
            for(var i = 0; i < data.length; i++) {
                data[i]["progress"] = progressData[0]["eprogress"];
            }
            const priceData = await price.getShowName(showName);
            for(var i = 0; i < priceData.length; i++) {
                const usr = await users.getId(priceData[i]["vendorId"]);
                priceData[i]["vendorName"] = usr[0]["userName"];
                priceData[i]["vendorCompany"] = usr[0]["companyInfo"];
            }
            res.render("construct/exhibitor/show", {title: "Details of " + data[0]["showName"], status: Head, data: data, price: priceData});
        }
        else {
            throw "error";
        }
    }
    catch (e) {
        res.render("construct/error", {title: "error", status: Head});
    }
});

router.get("/estimate", async (req, res) => {
    const Head = await head(req);
    const user = await authentication(req);
    const showName = req.query.id;
    const vendorId = req.query.vendor;
    try {
        if(user == null)
            throw "error";
        const data = await tab.getName(showName);
        //console.log(data);
        const designFile = data[0]["details"]["designFile"]["filename"];
        for(var i = 0; i < designFile.length; i++) {
            const filename = designFile[i]["name"].split("_+_")[1];
            data[0]["details"]["designFile"]["filename"][i]["fileName"] = filename;
        }
        const data2 = await price.getShowName(showName);
        var table;
        for(var d of data2) {
            if(d["vendorId"] == vendorId) {
                table = d["price"];
                break;
            }
        }
        const extraFiles = table["extraFilesName"];
        var extraNames = [];
        for(var i = 0; i < extraFiles.length; i++) {
            const filename = extraFiles[i]["name"].split("_+_")[1];
            extraNames.push({"name": extraFiles[i]["name"], "fileName": filename});
        }
        var ind = 0;
        while(ind < table["each"].length) {
            if(table["each"][ind]["Total"] == "$0.00") {
                table["each"].splice(ind, 1);
                ind --;
            }
            ind ++;
        }
        //console.log("1");
        var category = {"Flooring": [], "Rigging": [], "Main Structures": [], "Electrical": [], "Electricity": [], "Graphic": [], "Display": [], "Furniture": [], "Shipping": [], "Accessories": [], "Plants": [], "extra": {Price: "", FileName: [], Total: "$0.00"}};
        //console.log("1.5");
        for(var t of table["each"]) {
            //console.log(t);
            category[t["Category"]].push(t);
        }
        //console.log("2");
        category["extra"]["Price"] = table["extraPrice"];
        category["extra"]["FileName"] = extraNames;
        category["extra"]["Total"] = "$" + parseFloat(table["extraPrice"] == "" ? 0.00 : table["extraPrice"]).toFixed(2).toString();
        //console.log(category);
        //console.log(table["each"]);
        res.render("construct/vendor/estimate", {title: "Details of " + data[0]["showName"], status: Head, voe: "exhibitor", data: data, estimateTable: category, total: table["total"]});
    }
    catch(e) {
        res.render("construct/error", {title: "Error!", status: Head});
    }
});

router.post("/jobConfirm", async (req, res) => {
    const request = {
        showName: req.body.showName,
        vendorId: req.body.vendorId
    }
    //console.log(request);
    try {
        const data1 = await progress.getShowName(request["showName"]);
        //console.log(data1);
        for(var i = 0; i < data1.length; i++) {
            if(data1[i]["vendorId"].toString() != request["vendorId"]) {
                const res1 = await progress.remove(data1[i]["_id"].toString());
            }
            else {
                if(data1[i]["vprogress"] == "bidding") {
                    const res2 = await progress.modifyEprogress(data1[i]["_id"].toString(), "waitContract");
                    const res3 = await progress.modifyVprogress(data1[i]["_id"].toString(), "waitContract");
                }
                else {
                    res.send({error: "error"});
                    return;
                }
            }
        }
        //console.log(data1);
        const data2 = await price.getShowName(request["showName"]);
        //console.log(data2);
        for(var i = 0; i < data2.length; i++) {
            if(data2[i]["vendorId"].toString() != request["vendorId"]) {
                const res1 = await price.remove(data2[i]["_id"].toString());
            }
        }
        //const data4 = await contract.create(request["id"], data3[0]["exhibitorId"], data3[0]["vendorId"], "yes");
        //console.log(data2);
        const data3 = await price.getShowName(request["showName"]);
        const data4 = await users.getId(data3[0]["vendorId"].toString());
        const data5 = await users.getId(data3[0]["exhibitorId"].toString());
        res.send({success: "success", showName: request["showName"], vendor: data4[0]["userName"], exhibitor: data5[0]["userName"]});
    }
    catch(e) {
        res.send({error: "error"});
    }
});

/*router.get("/jobUpdate", async (req, res) => {
    const Head = await head(req);
    const id = req.query.id;
    try {
        const data = await tab.getId(id);
        const progressData = await progress.getShowName(data[0]["boothId"]);
        res.render("construct/exhibitor/show", {title: "Confirm " + data[0]["showName"], status: Head, data: data, progress: progressData});
    }
    catch(e) {
        res.render("construct/error", {title: "Error!", status: Head});
    }
});*/

router.get("/contract", async (req, res) => {
    const Head = await head(req);
    const showName = req.query.id;
    try {
        const data1 = await tab.getName(showName);
        const data2 = await price.getShowName(showName);
        var ind = 0;
        while(ind < data2[0]["price"]["each"].length) {
            if(data2[0]["price"]["each"][ind]["Total"] == "$0.00") {
                data2[0]["price"]["each"].splice(ind, 1);
                ind --;
            }
            ind ++;
        }
        const data3 = await users.getId(data2[0]["exhibitorId"].toString());
        const data4 = await users.getId(data2[0]["vendorId"].toString());
        const size12 = data1[0]["size"].split(",");
        const size = size12[0] + "✕" + size12[1];
        var data = {exhibitor: data3[0]["userName"], vendor: data4[0]["userName"], showName: data1[0]["showName"], category: data1[0]["category"], size: size, price: data2[0]["price"], details: data1[0]["details"]};
        res.render("construct/contract", {title: "Contract of " + showName, status: Head, showName: showName, voe: "exhibitor", data: data});
    }
    catch (e) {
        res.render("construct/error", {title: "Error!", status: Head});
    }
});

router.get("/payment", async (req, res) => {
    const Head = await head(req);
    const showName = req.query.id;
    try {
        const data = await price.getShowName(showName);
        const pricedata = data[0]["price"];
        //console.log(pricedata);
        res.render("construct/exhibitor/payment", {title: "Payment of " + showName, status: Head, showName: showName, price: pricedata});
    }
    catch (e) {
        res.render("construct/error", {title: "Error!", status: Head});
    }
});

router.post("/acceptContract", async (req, res) => {
    const request = {
        showName: req.body.id,
        accept: req.body.accept
    }
    //console.log(request);
    try {
        if(request["accept"] != "y")
            throw "error";
        const data1 = await progress.getShowName(request["showName"]);
        for(var i = 0; i < data1.length; i++) {
            if(data1[i]["eprogress"] == "waitContract") {
                const res1 = await progress.modifyEprogress(data1[i]["_id"].toString(), "waitOppoContract");
                if(data1[i]["vprogress"] == "waitOppoContract") {
                    const res2 = await progress.modifyEprogress(data1[i]["_id"].toString(), "waitPayment");
                    const res3 = await progress.modifyVprogress(data1[i]["_id"].toString(), "waitPayment");
                }
            }
            else {
                res.send({error: "error"});
                return;
            }
            //const res2 = await progress.modifyVprogress(data1[i]["_id"].toString(), "waitPayment");
        }
        const data3 = await price.getShowName(request["showName"]);
        const data4 = await users.getId(data3[0]["vendorId"].toString());
        const data5 = await users.getId(data3[0]["exhibitorId"].toString());
        res.send({success: "success", showName: request["showName"], vendor: data4[0]["userName"], exhibitor: data5[0]["userName"]});
    }
    catch(e) {
        res.send({error: "error"});
    }
});

router.post("/pay", async (req, res) => {
    const request = {
        showName: req.body.id,
        success: req.body.success
    }
    //console.log(request);
    try {
        if(request["success"] != "y")
            throw "error";
        const data1 = await progress.getShowName(request["showName"]);
        //console.log(data1);
        for(var i = 0; i < data1.length; i++) {
            if(data1[i]["eprogress"] == "waitPayment") {
                const res1 = await progress.modifyEprogress(data1[i]["_id"].toString(), "paid");
                const res2 = await progress.modifyVprogress(data1[i]["_id"].toString(), "paid");
            }
            else {
                res.send({error: "error"});
                return;
            }
        }
        const data3 = await price.getShowName(request["showName"]);
        const data4 = await users.getId(data3[0]["vendorId"].toString());
        const data5 = await users.getId(data3[0]["exhibitorId"].toString());
        res.send({success: "success", showName: request["showName"], vendor: data4[0]["userName"], exhibitor: data5[0]["userName"]});
    }
    catch(e) {
        res.send({error: "error"});
    }
});

router.get("/requests", async (req, res) => {
    const Head = await head(req);
    const showName = req.query.id;
    try {
        const auth = await authentication(req);
        const data = await tab.getName(showName);
        if(auth != data[0]["author"]) {
            throw "error";
        }
        res.render("construct/exhibitor/requests", {title: "Complaint of " + showName, status: Head, showName: showName});
    }
    catch(e) {
        res.render("construct/error", {title: "error", status: Head});
    }
});

router.post("/requests", requestsUpload.fields([{name: "carpet", maxCount: 10}, {name: "panel", maxCount: 10}, {name: "lighting", maxCount: 10}, {name: "electricity", maxCount: 10}, {name: "graphic", maxCount: 10}, {name: "display", maxCount: 10}, {name: "furniture", maxCount: 10}, {name: "accesssories", maxCount: 10}, {name: "showsite", maxCount: 10}]), async (req, res) => {
    const request = {
        showName: xss(req.body.showName),
        details: xss(req.body.details)
    }
    try {
        const data = await requests.getShowName(request["showName"]);
        if(data.length == 0) {
            const data1 = await progress.getShowName(request["showName"]);
            const id = data1[0]["_id"].toString();
            const vendorId = data1[0]["vendorId"];
            const exhibitorId = data1[0]["exhibitorId"];
            const details = JSON.parse(request["details"]);
            const files = req.files;
            for(var key in files) {
                for(var c of files[key]) {
                    var obj = {name: c.filename};
                    details[key]["filename"].push(obj);
                }
            }
            const res1 = await requests.create(vendorId, exhibitorId, request["showName"], details);
            if(data1[0]["eprogress"] == "done") {
                const res2 = await progress.modifyEprogress(id, "Complaint");
            }
            const data2 = await users.getId(exhibitorId.toString());
            res.send({success: "success", showName: request["showName"], aftersale: "aftersale", exhibitor: data2[0]["userName"]});
        }
        else {
            res.send({sucess: "exists"});
        }
    }
    catch(e) {
        res.send({error: "error"});
    }
});

router.post("/comment", async (req, res) => {
    const Head = await head(req);
    const request = {
        showName: xss(req.body.showName),
        stars: xss(req.body.stars),
        comment: xss(req.body.comment)
    }
    try {
        const data = await vendorStars.getShowName(request["showName"]);
        const data2 = await progress.getShowName(request["showName"]);
        const vendorId = data2[0]["vendorId"];
        const exhibitorId = data2[0]["exhibitorId"];
        if(data.length == 0) {
            const res = await vendorStars.create(vendorId, exhibitorId, request["showName"], request["stars"], request["comment"]);
        }
        else {
            const res = await vendorStars.modifyStars(showName, request["stars"]);
            const res2 = await vendorStars.modifyComments(showName, request["comment"]);
        }
        res.send({success: "success"});
    }
    catch(e) {
        res.send({error: "error"});
    }
});

module.exports = router;