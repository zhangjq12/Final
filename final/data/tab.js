const mongo = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const user = require("./users");
const comments = require("./comments");

const url = "mongodb://127.0.0.1:27017/Final";

async function create(boothNum, showName, date, author, size, category, details) {
    if(boothNum == undefined || showName == undefined || date == undefined || author == undefined || size == undefined || category == undefined || details == undefined)
        throw "parameters are missing.";
    var result = [];
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection('tab').insert({"boothNum": boothNum, "showName": showName, "date": date, "author": author, "size": size, "category": category, "details": details, "price": 0, "Rating": {"thumbsup": 0, "thumbsdown": 0}}, (err, res) => {
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
    var info = await getId(id);
    var userLike = await user.getLike(id);
    for(var i = 0; i < userLike.length; i++) {
        var res1 = await user.unliking(userLike[i]["userName"], id);
    }
    var userDislike = await user.getDislike(id);
    for(var i = 0; i < userDislike.length; i++) {
        var res2 = await user.unliking(userDislike[i]["userName"], id);
    }
    var commentData = await comments.getTab(id);
    for(var i = 0; i < commentData.length; i++) {
        var res3 = await comments.remove(commentData[i]["_id"].toString());
    }
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection("tab").deleteMany({"_id": ID} , (err, res) => {
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

async function getRating() {
    var res = [];
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            var find = db.collection("tab").find();
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

async function getAll() {
    const res = await getRating();
    return res;
}

async function getByRating() {
    const res = await getRating();
    res.sort(function(a, b) {
        var v1 = a["Rating"]["thumbsup"];
        var v2 = b["Rating"]["thumbsup"];
        return v2 - v1;
    });
    var result = [];
    for(let x of res) {
        result.push(x);
        if(result.length == 10)
            break;
    }
    return result;
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
            var find = db.collection("tab").find({"_id": ID});
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

async function getNAME(name) {
    if(name == undefined)
        throw "parameter is missing";
    if(typeof name != 'string')
        throw "parameter is error format";
    var res = [];
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            var find = db.collection("tab").find({"showName": {$regex: name, $options: "$i"}});
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

async function getName(name) {
    const res = await getNAME(name);
    return res;
}

async function getAUTHOR(name) {
    if(name == undefined)
        throw "parameter is missing";
    if(typeof name != 'string')
        throw "parameter is error format";
    var res = [];
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            var find = db.collection("tab").find({"author": name});
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

async function getAuthor(name) {
    const res = await getAUTHOR(name);
    return res;
}

async function getBoothID(boothId) {
    if(boothId == undefined)
        throw "parameter is missing";
    if(typeof boothId != 'string')
        throw "parameter is error format";
    var res = [];
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            var find = db.collection("tab").find({"boothNum": {$regex: boothId, $options: "$i"}});
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

async function getBoothId(boothId) {
    const res = await getBoothID(boothId);
    return res;
}

async function getBoothNUM(boothId) {
    if(boothId == undefined)
        throw "parameter is missing";
    if(typeof boothId != 'string')
        throw "parameter is error format";
    var res = [];
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            var find = db.collection("tab").find({"boothNum": boothId});
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

async function getBoothNum(boothId) {
    const res = await getBoothNUM(boothId);
    return res;
}

async function getCategory(category) {
    const data = await getRating();
    var res = [];
    for(let tab of data) {
        for(let t of tab["category"]) {
            if(category == t) {
                res.push(tab);
            }
        }
    }
    if(res.length == 0)
        throw "no such data";
    return res;
}

async function modifyShowName(id, showName) {
    if(id == undefined || showName == undefined)
        throw "parameter is missing";
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection("tab").updateMany({"_id": id}, {$set:{"showName": showName}}, (err, res) => {
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

async function modifyBoothId(id, boothId) {
    if(id == undefined || boothId == undefined)
        throw "parameter is missing";
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection("tab").updateMany({"_id": id}, {$set:{"boothId": boothId}}, (err, res) => {
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

async function modifyDate(id, date) {
    if(id == undefined || date == undefined)
        throw "parameter is missing";
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection("tab").updateMany({"_id": id}, {$set:{"date": date}}, (err, res) => {
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

async function modifyCategory(id, category) {
    if(id == undefined || showName == undefined)
        throw "parameter is missing";
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection("tab").updateMany({"_id": id}, {$set:{"category": category}}, (err, res) => {
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

async function modifyDetails(id, details) {
    if(id == undefined || details == undefined)
        throw "parameter is missing";
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection("tab").updateMany({"_id": id}, {$set:{"details": details}}, (err, res) => {
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

async function modifyPrice(id, price) {
    if(id == undefined || price == undefined)
        throw "parameter is missing";
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection("tab").updateMany({"_id": id}, {$set:{"price": price}}, (err, res) => {
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

async function rate(name, rating) {
    const data = await getName(name);
    var rates = data[0]["Rating"];
    if(rating == "good")
        rates["thumbsup"] += 1;
    else
    if(rating == "nogood")
        rates["thumbsup"] -= 1;
    else
    if(rating == "bad")
        rates["thumbsdown"] += 1;
    else
    if(rating == "nobad")
        rates["thumbsdown"] -= 1;
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection("tab").updateMany({"tabName": name}, {$set:{"Rating": rates}}, (err, res) => {
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
    getBoothId,
    getBoothNum,
    getByRating,
    getCategory,
    getAuthor,
    getAll,
    create,
    getId,
    getName,
    remove,
    modifyBoothId,
    modifyCategory,
    modifyDate,
    modifyDetails,
    modifyShowName,
    modifyPrice,
    rate
}