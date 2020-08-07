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
const Sheet = data.vendorPriceSheet;
const proof = data.proof;
const vendorInfo = data.vendorDetails;
const authentication = require("./authentication");
const upload2 = require("./middleware/multer2");
const extraUpload = require("./middleware/extraMulter");
const proofUpload = require("./middleware/proofMulter");
const xss = require('xss');
const ObjectID = require('mongodb').ObjectID;

router.get("/", async (req, res) => {
    const Head = await head(req);
    const auth = await authentication(req);
    try {
        const data = await tab.getAll();
        const user = await users.getName(auth);
        const userInfo = await vendorInfo.getId(user[0]["_id"].toString());
        if(user[0]["voe"] != "vendor")
            throw "error";
        if(userInfo.length == 0) {
            res.redirect("/vendor/qualification");
            return;
        }
        var datajobs = [];
        var dataprogress = [];
        var datadone = [];
        for(var i = 0; i < data.length; i++) {
            const size12 = data[i]["size"].split(",");
            data[i]["size"] = size12[0] + "✕" + size12[1];
            const iprogress = await progress.getShowName(data[i]["showName"]);
            const companyData = await users.getName(data[i]["author"]);
            const companyName = companyData[0]["companyInfo"];
            data[i]["companyInfo"] = companyName;
            const showNameStr = data[i]["showName"].replace(" ", "");
            data[i]["showNameLink"] = showNameStr;
            var boo = false;
            var bidding = false;
            var outofdate = false;
            for(var j = 0; j < iprogress.length; j++) {
                if(iprogress[j]["vendorId"].toString() == user[0]["_id"].toString()) {
                    data[i]["progress"] = iprogress[j]["vprogress"];
                    dataprogress.splice(0, 0, data[i]);
                    boo = true;
                }
                if(iprogress[j]["eprogress"] == "bidding") {
                    bidding = true;
                }
            }
            var date1 = new Date(data[i]["date"]["end"]);
            var date2 = new Date();
            var yy = date2.getFullYear();
            var mm = date2.getMonth() + 1;
            var dd = date2.getDate();
            var ddd2 = yy + "-" + mm + "-" + dd;
            var date3 = new Date(ddd2);
            if(date1 < date3)
                outofdate = true;

            if(!boo && bidding && !outofdate) {
                datajobs.splice(0, 0, data[i]);
            }
            /*if(iprogress[0]["eprogress"] == 'bidding') {
                datajobs.push(data[i]);
            }
            if(iprogress[0]["vendorId"] == user[0]["_id"]) {
                data[i]["prgress"] = iprogress[0]["vprogress"];
                dataprogress.push(data[i]);
            }*/
        }
        var ind = 0;
        while(ind < dataprogress.length) {
            if(dataprogress[ind]["progress"] == "done") {
                datadone.push(dataprogress[ind]);
                dataprogress.splice(ind, 1);
                ind --;
            }
            ind ++;
        }
        res.render("construct/vendor/index", {title: "EXHIBITOR for vendor", status: Head, dataprogress: dataprogress, datajobs: datajobs, datadone: datadone});
    }
    catch (e) {
        res.render("construct/error", {title: "Error!", status: Head});
    }
});

router.get("/qualification", async (req, res) => {
    const Head = await head(req);
    const auth = await authentication(req);
    try {
        const user = await users.getName(auth);
        const userInfo = await vendorInfo.getId(user[0]["_id"].toString());
        if(user[0]["voe"] != "vendor")
            throw "error";
        if(userInfo.length != 0) {
            res.redirect("/vendor");
            return;
        }
        res.render("construct/vendor/qualification", {title: "EXHIBITOR for vendor", status: Head});
    }
    catch (e) {
        res.render("construct/error", {title: "Error!", status: Head});
    }
})

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

router.get("/estimate", async (req, res) => {
    const Head = await head(req);
    const user = await authentication(req);
    const showName = req.query.id;
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
        const table = Sheet;
        for(var t of table) {
            t["Total"] = "$0.00";
        }
        var category = {"Flooring": [], "Rigging": [], "Main Structures": [], "Electrical": [], "Electricity": [], "Graphic": [], "Display": [], "Furniture": [], "Shipping": [], "Accessories": [], "Plants": [], "extra": {Price: "", FileName: [], Total: "$0.00"}};
        for(var t of table) {
            category[t["Category"]].push(t);
        }
        category.Main_Structures = category["Main Structures"];
        delete category["Main Structures"];
        total = "$0.00";
        res.render("construct/vendor/estimate", {title: "Details of " + data[0]["showName"], status: Head, voe: "vendor", data: data, estimateTable: category, total: total});
    }
    catch(e) {
        res.render("construct/error", {title: "Error!", status: Head});
    }
});

router.post("/estimate", extraUpload.fields([{name: "extra", maxCount: 10}]), async (req, res) => {
    const user = await authentication(req);
    const request = {
        showName: xss(req.body.id),
        each: xss(req.body.each),
        extraPrice: xss(req.body.extraPrice),
        total: xss(req.body.total)
    }
    //console.log(request);
    try {
        //console.log(request);
        var extraFilesName = [];
        var extraFiles;
        if(req.files["extra"] == undefined) {
            extraFiles = undefined;
        }
        else {
            extraFiles = req.files["extra"];
            for(var c of extraFiles) {
                const obj = {name: c.filename};
                extraFilesName.push(obj);
            }
        }
        var pri = {"each": JSON.parse(request["each"]), "extraFilesName": extraFilesName, "extraPrice": request["extraPrice"], "total": request["total"]}
        //console.log(pri);
        const data = await price.getShowName(request["showName"]);
        const data1 = await tab.getName(request["showName"]);
        const data2 = await users.getName(data1[0]["author"]);
        const data3 = await users.getName(user);
        const progressId = data1[0]["_id"].toString() + data3[0]["_id"].toString();
        const time = new Date();
        const t = time.toISOString();
        const progressData = await progress.getShowName(request["showName"]);
        const t1 = progressData[0]["etime"];
        const progress1 = await progress.create(progressId, request["showName"], data2[0]["_id"], data3[0]["_id"], t1, t, "bidding", "bidding");
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
            data4 = await price.create(request["showName"], data2[0]["_id"], data3[0]["_id"], pri);
        }
        else {
            data4 = await price.modifyPrice(pid, pri);
        }
        res.send({success: "success"});
    }
    catch(e) {
        res.send({error: "error"});
    }
});

router.post("/jobConfirm", async (req, res) => {
    const request = {
        showName: req.body.id,
        success: req.body.success
    }
    //console.log(request);
    try {
        if(request["success"] != "y")
            throw "error";
        const data1 = await progress.getShowName(request["showName"]);
        for(var i = 0; i < data1.length; i++) {
            const res1 = await progress.modifyEprogress(data1[i]["_id"].toString(), "waitProof");
            const res2 = await progress.modifyVprogress(data1[i]["_id"].toString(), "waitProof");
        }
        const data3 = await price.getShowName(request["showName"]);
        const data4 = await users.getId(data3[0]["vendorId"].toString());
        const data5 = await users.getId(data3[0]["exhibitorId"].toString());
        res.send({success: "success", showName: request["showName"], vendor: data4[0]["userName"], exhibitor: data5[0]["userName"]});
    }
    catch(e) {
        res.send({error: "error"})
    }
});

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
        res.render("construct/contract", {title: "Contract of " + showName, status: Head, showName: showName, voe: "vendor", data: data});
    }
    catch (e) {
        res.render("construct/error", {title: "Error!", status: Head});
    }
});

/*router.get("/jobUpdate", async (req, res) => {
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
*/
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
            //const res1 = await progress.modifyEprogress(data1[i]["_id"].toString(), "waitPayment");
            const res1 = await progress.modifyVprogress(data1[i]["_id"].toString(), "waitOppoContract");
            if(data1[i]["eprogress"] == "waitOppoContract") {
                const res2 = await progress.modifyEprogress(data1[i]["_id"].toString(), "waitPayment");
                const res3 = await progress.modifyVprogress(data1[i]["_id"].toString(), "waitPayment");
            }
        }
        const data3 = await price.getShowName(request["showName"]);
        const data4 = await users.getId(data3[0]["vendorId"].toString());
        const data5 = await users.getId(data3[0]["exhibitorId"].toString());
        res.send({success: "success", showName: request["showName"], vendor: data4[0]["userName"], exhibitor: data5[0]["userName"]});
    }
    catch(e) {
        res.send({error: "error"})
    }
});

router.get("/proof", async (req, res) => {
    const Head = await head(req);
    const showName = req.query.id;
    try {
        const auth = await authentication(req);
        const data = await progress.getShowName(showName);
        const user = await users.getId(data[0]["vendorId"].toString());

        if(user[0]["userName"] != auth) {
            throw "error";
        }
        res.render("construct/vendor/proof", {title: "Proof of " + showName, status: Head, showName: showName});
    }
    catch(e) {
        res.render("construct/error", {title: "Error!", status: Head});
    }
});

router.post("/proof", proofUpload.fields([{name: "bills", maxCount: 5}, {name: "finished", maxCount: 20}]),async (req, res) => {
    const request = {
        showName: xss(req.body.showName),
        billsFileNames: xss(req.body.billsFileNames),
        finishedFileNames: xss(req.body.finishedFileNames)
    }
    try {
        const data = await proof.getShowName(request["showName"]);
        if(data.length == 0) {
            const data1 = await progress.getShowName(request["showName"]);
            const vendorId = data1[0]["vendorId"];
            const exhibitorId = data1[0]["exhibitorId"];
            const bills = req.files["bills"];
            const finished = req.files["finished"];
            var billsFile = [];
            var finishedFile = [];
            for(var c of bills) {
                var obj = {fileName: c.filename};
                billsFile.push(obj);
            }
            for(var c of finished) {
                var obj = {fileName: c.filename};
                finishedFile.push(obj);
            }
            if(data1[0]["vprogress"] == "30% Paid") {
                const res1 = await proof.create(vendorId, exhibitorId, request["showName"], billsFile, finishedFile);
                const res3 = await progress.modifyVprogress(data1[0]["_id"].toString(), "Proof Uploaded");
            }
            else {
                throw "error";
            }
            const data2 = await users.getId(vendorId.toString());
            res.send({success: "success", showName: request["showName"], aftersale: "aftersale", vendor: data2[0]["userName"]});
        }
        else {
            res.send({success: "exist"});
        }
    }
    catch(e) {
        res.send({error: "error"});
    }
});

module.exports = router;