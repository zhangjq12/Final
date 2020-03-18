const express = require("express");
const router = express.Router();
const data = require("../data");
const users = data.users;
const tab = data.tab;
const progress = data.progress;
const vendorInfo = data.vendorDetails;
const requests = data.requests;
const proofs = data.proof;
const price = data.price;
const head = require("./head");
const authentication = require("./authentication");
const xss = require('xss');

router.get("/", async (req, res) => {
    res.redirect("/manage/qualification");
})

router.get("/proof", async (req, res) => {
    const Head = await head(req);
    try {
        const auth = await authentication(req);
        const voe = await users.getName(auth);
        if(voe[0]["voe"] != "manager") {
            throw "error";
        }
        const data1 = await progress.getAll();
        var data = [];
        for(var i = 0; i < data1.length; i++) {
            if(data1[i]["vprogress"] == "Proved by Finance") {
                const res1 = await users.getId(data1[i]["exhibitorId"].toString());
                const res2 = await users.getId(data1[i]["vendorId"].toString());
                data1[i]["exhibitorName"] = res1[0]["userName"];
                data1[i]["vendorName"] = res2[0]["userName"];
                const res3 = await price.getShowName(data1[i]["showName"]);
                data1[i]["price"] = res3[0]["price"]["total"];
                data.splice(0, 0, data1[i]);
            }
        }
        res.render("construct/manage/proof/index", {title: "Proof", status: Head, data: data});
    }
    catch(e) {
        res.render("construct/error", {title: "error", status: Head});
    }
});
router.get("/qualification", async (req, res) => {
    const Head = await head(req);
    try {
        const auth = await authentication(req);
        const voe = await users.getName(auth);
        if(voe[0]["voe"] != "manager") {
            throw "error";
        }
        const data1 = await users.getAll();
        var ind = 0;
        var data2 = [];
        var data3 = [];
        while(ind < data1.length) {
            if(data1[ind]["voe"] == "vendor") {
                const res1 = await vendorInfo.getId(data1[ind]["_id"].toString());
                if(res1.length != 0) {
                    data1[ind]["approved"] = "y";
                    data2.push(data1[ind]);
                }
                else {
                    data1[ind]["approved"] = "n";
                    data3.splice(0, 0, data1[ind]);
                }
            }
            ind ++;
        }
        var data4 = [];
        for(var c of data3) {
            data4.push(c);
        }
        for(var c of data2) {
            data4.push(c);
        }
        var data = [];
        for(var c of data4) {
            const obj = {userId: c["_id"].toString(), userName: c["userName"], companyInfo: c["companyInfo"], approved: c["approved"]}
            data.push(obj);
        }
        res.render("construct/manage/qualification/index", {title: "Qualification", status: Head, data: data});
    }
    catch(e) {
        res.render("construct/error", {title: "error", status: Head});
    }
});

router.get("/qualification/estimate", async (req, res) => {
    const Head = await head(req);
    const id = req.query.id;
    try {
        const auth = await authentication(req);
        const voe = await users.getName(auth);
        if(voe[0]["voe"] != "manager") {
            throw "error";
        }
        const data1 = await users.getId(id);
        const userName = data1[0]["userName"];
        const data = [{userId: data1[0]["_id"].toString(), userName: data1[0]["userName"], email: data1[0]["email"], companyInfo: data1[0]["companyInfo"], contactInfo: data1[0]["contactInfo"], address: data1[0]["address"], license: data1[0]["license"], personal: data1[0]["personal"], taxId: data1[0]["taxId"], stateId: data1[0]["stateId"]}]
        res.render("construct/manage/qualification/estimate", {title: "Qualification of " + userName, status: Head, data: data});
    }
    catch(e) {
        res.render("construct/error", {title: "error", status: Head});
    }
});

router.get("/qualification/show", async (req, res) => {
    const Head = await head(req);
    const id = req.query.id;
    try {
        const auth = await authentication(req);
        const voe = await users.getName(auth);
        if(voe[0]["voe"] != "manager") {
            throw "error";
        }
        const data1 = await users.getId(id);
        const userName = data1[0]["userName"];
        const data2 = await vendorInfo.getId(id);
        const data = [{userId: data1[0]["_id"].toString(), userName: data1[0]["userName"], email: data1[0]["email"], companyInfo: data1[0]["companyInfo"], contactInfo: data1[0]["contactInfo"], address: data1[0]["address"], license: data1[0]["license"], personal: data1[0]["personal"], taxId: data1[0]["taxId"], stateId: data1[0]["stateId"]}];
        if(data2.length > 0) {
            data[0]["estimatePrice"] = data2[0]["estimatePrice"];
            data[0]["detailsInfo"] = data2[0]["info"];
        }
        res.render("construct/manage/qualification/show", {title: "Qualification of " + userName, status: Head, data: data});
    }
    catch(e) {
        res.render("construct/error", {title: "error", status: Head});
    }
});

/*router.get("/requests", async (req, res) => {
    const Head = await head(req);
    try {
        const auth = await authentication(req);
        const voe = await users.getName(auth);
        if(voe[0]["voe"] != "manager") {
            throw "error";
        }
        const data1 = await progress.getAll();
        res.render("construct/manager/requests", {title: "Requests", head: Head, showName: showName, progress: data1, proof: data2})
    }
    catch(e) {
        res.render("construct/error", {title: "error", head: Head});
    }
});*/

router.post("/qualification", async (req, res) => {
    const request = {
        id: xss(req.body.id),
        info: xss(req.body.info),
        estimatePrice: xss(req.body.estimatePrice)
    }
    try {
        const data = await vendorInfo.getId(request["id"]);
        if(data.length == 0) {
            const res1 = await vendorInfo.create(request["id"], request["info"], request["estimatePrice"]);
        }
        else {
            const res2 = await vendorInfo.modifyInfo(request["id"], request["info"]);
            const res3 = await vendorInfo.modifyInfo(request["id"], request["estimatePrice"]);
        }
        const vendor = await users.getId(data[0]["vendorId"].toString());
        res.send({success: "success", manager: "manager", vendor: vendor[0]["userName"], email: vendor[0]["email"]});
    }
    catch(e) {
        res.send({error: "error"});
    }
});

/*router.post("/requests", async (req, res) => {
    const request = {
        showName: xss(req.body.showName)
    }
    try {
        const data1 = await progress.getShowName(request["showName"]);
        const id = data1[0]["_id"].toString();
        if(data1[0]["eprogress"] == "Complaint Processing") {
            const res1 = await progress.modifyEprogress(id, "Complaint Solved by Manager");
            const res2 = await progress.modifyVprogress(id, "Complaint Solved by Manager");
        }
        res.send({success: "success", showName: request["showName"], admin: "admin", manager: "manager"});
    }
    catch(e) {
        res.send({error: "error"});
    }
});*/

router.post("/proof", async (req, res) => {
    const request = {
        showName: xss(req.body.showName)
    }
    try {
        const data1 = await progress.getShowName(request["showName"]);
        const id = data1[0]["_id"].toString();
        if(data1[0]["vprogress"] == "Proved by Finance") {
            const res2 = await progress.modifyVprogress(id, "Proved by Manager");
        }
        res.send({success: "success", showName: request["showName"], admin: "administrator", manager: "manager"});
    }
    catch(e) {
        res.send({error: "error"});
    }
});

module.exports = router;
