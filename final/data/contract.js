const mongo = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const user = require("./users");
const comments = require("./comments");
const tab = require("./tab");

const url = "mongodb://127.0.0.1:27017/Final";

async function create(boothId, exhibitorId, vendorId, contract) {
    if(boothId == undefined || exhibitorId == undefined || vendorId == undefined || contract == undefined)
        throw "parameters are missing.";
    var result = [];
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection('contract').insert({"boothId": boothId, "exhibitorId": exhibitorId, "vendorId": vendorId, "contract": contract}, (err, res) => {
                if(err) {
                    db.close();
                    throw "insert error";
                }
                db.close();
                result = res["ops"];
                resolve(result);
            })
        })
    })
    promise.then(function(value) {
        return value;
    })
    return promise;
}

async function remove(id) {
    if(id == undefined)
        throw "parameter is missing";
    if(typeof id != 'string')
        throw "parameter is error format";
    var ID = new ObjectID(id);
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection("contract").deleteMany({"_id": ID} , (err, res) => {
                if(err) {
                    db.close();
                    throw "find error."
                }
                db.close();
                resolve(res.result.n);
            });
        });
    })
    promise.then(function(value) {
        return value;
    })
    return promise;
}

async function removeBooth(id) {
    if(id == undefined)
        throw "parameter is missing";
    if(typeof id != 'string')
        throw "parameter is error format";
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection("contract").deleteMany({"boothId": id} , (err, res) => {
                if(err) {
                    db.close();
                    throw "find error."
                }
                db.close();
                resolve(res.result.n);
            });
        });
    })
    promise.then(function(value) {
        return value;
    })
    return promise;
}

async function getID(id) {
    if(id == undefined)
        throw "parameter is missing";
    if(typeof id != 'string')
        throw "parameter is error format";
    var res = [];
    var ID = new ObjectID(id);
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            var find = db.collection("contract").find({"_id": ID});
            find.each((err, ress) => {
                if(err) {
                    db.close();
                    throw "find error."
                }
                if(ress != null) {
                    res.push(ress);
                }
                else {
                    db.close();
                    resolve(res);
                }
            });
        });
    })
    promise.then(function(value) {
        return value;
    })
    return promise;
}

async function getId(id) {
    const res = await getID(id);
    if(res.length == 0)
        throw "no such data";
    return res;
}

async function getBoothID(id) {
    if(id == undefined)
        throw "parameter is missing";
    if(typeof id != 'string')
        throw "parameter is error format";
    var res = [];
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            var find = db.collection("contract").find({"boothId": id});
            find.each((err, ress) => {
                if(err) {
                    db.close();
                    throw "find error."
                }
                if(ress != null) {
                    res.push(ress);
                }
                else {
                    db.close();
                    resolve(res);
                }
            });
        });
    })
    promise.then(function(value) {
        return value;
    })
    return promise;
}

async function getBoothId(id) {
    const res = await getBoothID(id);
    return res;
}

async function getVendorID(id) {
    if(id == undefined)
        throw "parameter is missing";
    if(typeof id != 'string')
        throw "parameter is error format";
    var res = [];
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            var find = db.collection("contract").find({"vendorId": id});
            find.each((err, ress) => {
                if(err) {
                    db.close();
                    throw "find error."
                }
                if(ress != null) {
                    res.push(ress);
                }
                else {
                    db.close();
                    resolve(res);
                }
            });
        });
    })
    promise.then(function(value) {
        return value;
    })
    return promise;
}

async function getVendorId(id) {
    const res = await getVendorID(id);
    if(res.length == 0)
        throw "no such data";
    return res;
}

async function getExhibitorID(id) {
    if(id == undefined)
        throw "parameter is missing";
    if(typeof id != 'string')
        throw "parameter is error format";
    var res = [];
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            var find = db.collection("contract").find({"exhibitorId": id});
            find.each((err, ress) => {
                if(err) {
                    db.close();
                    throw "find error."
                }
                if(ress != null) {
                    res.push(ress);
                }
                else {
                    db.close();
                    resolve(res);
                }
            });
        });
    })
    promise.then(function(value) {
        return value;
    })
    return promise;
}

async function getExhibitorId(id) {
    const res = await getExhibitorID(id);
    if(res.length == 0)
        throw "no such data";
    return res;
}

async function modifyContract(id, contract) {
    if(id == undefined || contract == undefined)
        throw "parameter is missing";
    var ID = new ObjectID(id);
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection("contract").updateMany({"_id": ID}, {$set:{"contract": contract}}, (err, res) => {
                if(err) {
                    db.close();
                    throw "find error."
                }
                db.close();
                resolve("rename successful");
            });
        });
    })
    promise.then(function(value) {
        return value;
    })
    return promise;
}

module.exports = {
    create,
    remove,
    getBoothId,
    getExhibitorId,
    getId,
    getVendorId,
    modifyContract,
    removeBooth
}