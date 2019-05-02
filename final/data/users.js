const mongo = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
//const tabs = require("./tabs");
const passwordHash = require('password-hash');

const url = "mongodb://127.0.0.1:27017/Final";

async function create(userName, password, firstName, lastName, email) {
    if(userName == undefined || password == undefined || firstName == undefined || lastName == undefined || email == undefined)
        throw "parameters are missing.";
    var result = [];
    const hashedPassword = passwordHash.generate(password);
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection('user').insert({"userName": userName, "hashedPassword": hashedPassword, "firstName": firstName, "lastName": lastName, "email": email, "favoriteTabs":[], "dislike":[], "portrait": "defaultHead.jpg"}, (err, res) => {
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

async function getALL() {
    var res = [];
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            var find = db.collection("user").find();
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
    const res = await getALL();
    if(res.length == 0)
        throw "no such data";
    return res;
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
            var find = db.collection("user").find({"_id": ID});
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

async function getLIKE(id) {
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
            var find = db.collection("user").find({"favoriteTabs": id});
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

async function getLike(id) {
    const res = await getLIKE(id);
    return res;
}

async function getDISLIKE(id) {
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
            var find = db.collection("user").find({"dislike": id});
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

async function getDislike(id) {
    const res = await getDISLIKE(id);
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
            var find = db.collection("user").find({"userName": name});
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

async function check(name) {
    const res = await getNAME(name);
    if(res.length == 0)
        return [];
    return res;
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
            db.collection("user").deleteMany({"_id": ID} , (err, res) => {
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

async function removeAll() {
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection("user").deleteMany({} , (err, res) => {
                if(err) {
                    db.close();
                    throw "find error."
                }
                db.close();
                resolve("true");
            });
        });
    })
    promise.then(function(value) {
        return value;
    })
    return promise;
}

async function modifyPassword(name, password) {
    if(name == undefined || password == undefined)
        throw "parameter is missing";
    const hashedPassword = passwordHash.generate(password);
    const res1 = await getName(name);
    if(res1.length == 0)
        throw "no such data";
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection("user").updateMany({"userName": name}, {$set:{"hashedPassword": hashedPassword}}, (err, res) => {
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

async function modifyName(name, first, last) {
    if(name == undefined || first == undefined || last == undefined)
        throw "parameter is missing";
    const res1 = await getName(name);
    if(res1.length == 0)
        throw "no such data";
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection("user").updateMany({"userName": name}, {$set:{"firstName": first, "lastName": last}}, (err, res) => {
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

async function modifyEmail(name, email) {
    if(name == undefined || email == undefined)
        throw "parameter is missing";
    const res1 = await getName(name);
    if(res1.length == 0)
        throw "no such data";
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection("user").updateMany({"userName": name}, {$set:{"email": email}}, (err, res) => {
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

async function modifyPortrait(name, filename) {
    if(name == undefined || filename == undefined)
        throw "parameter is missing";
    const res1 = await getName(name);
    if(res1.length == 0)
        throw "no such data";
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection("user").updateMany({"userName": name}, {$set:{"portrait": filename}}, (err, res) => {
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

async function liking(name, likes) {
    if(name == undefined || likes == undefined)
        throw "parameter is missing";
    if(typeof name != 'string' || typeof likes != 'string')
        throw "error of format";
    const res1 = await getName(name);
    if(res1.length == 0)
        throw "no such data";
    const like2 = res1[0]["favoriteTabs"];
    for(var i = 0 ; i < like2.length; i++)
        if(likes == like2[i])
            return "exists";
    like2.push(likes);
    var promise = new Promise(function(resolve) {
        mongo.connect(url, (err, db) => {
            if(err)
                throw "database connect failed";
            db.collection("user").updateMany({"userName": name}, {$set:{"favoriteTabs": like2}}, (err, res) => {
                if(err) {
                    db.close();
                    throw "find error."
                }
                db.close();
                resolve("like successful");
            });
        })
    });
    promise.then(function(value) {
        return value;
    })
    return promise;
}

async function unliking(name, likes) {
    if(name == undefined || likes == undefined)
        throw "parameter is missing";
    if(typeof name != 'string' || typeof likes != 'string')
        throw "error of format";
    const res1 = await getName(name);
    if(res1.length == 0)
        throw "no such data";
    const like2 = res1[0]["favoriteTabs"];
    var boo = true;
    for(var i = 0 ; i < like2.length; i++)
        if(likes == like2[i]) {
            like2.splice(i, 1);
            boo = false;
            break;
        }
    if(boo)
        return "no such data";
    var promise = new Promise(function(resolve) {
        mongo.connect(url, (err, db) => {
            if(err)
                throw "database connect failed";
            db.collection("user").updateMany({"userName": name}, {$set:{"favoriteTabs": like2}}, (err, res) => {
                if(err) {
                    db.close();
                    throw "find error."
                }
                db.close();
                resolve("unlike successful");
            });
        })
    });
    promise.then(function(value) {
        return value;
    })
    return promise;
}

async function dislike(name, likes) {
    if(name == undefined || likes == undefined)
        throw "parameter is missing";
    if(typeof name != 'string' || typeof likes != 'string')
        throw "error of format";
    const res1 = await getName(name);
    if(res1.length == 0)
        throw "no such data";
    const like2 = res1[0]["dislike"];
    for(var i = 0 ; i < like2.length; i++)
        if(likes == like2[i])
            return "exists";
    like2.push(likes);
    var promise = new Promise(function(resolve) {
        mongo.connect(url, (err, db) => {
            if(err)
                throw "database connect failed";
            db.collection("user").updateMany({"userName": name}, {$set:{"dislike": like2}}, (err, res) => {
                if(err) {
                    db.close();
                    throw "find error."
                }
                db.close();
                resolve("like successful");
            });
        })
    });
    promise.then(function(value) {
        return value;
    })
    return promise;
}

async function undislike(name, likes) {
    if(name == undefined || likes == undefined)
        throw "parameter is missing";
    if(typeof name != 'string' || typeof likes != 'string')
        throw "error of format";
    const res1 = await getName(name);
    if(res1.length == 0)
        throw "no such data";
    const like2 = res1[0]["dislike"];
    var boo = true;
    for(var i = 0 ; i < like2.length; i++)
        if(likes == like2[i]) {
            like2.splice(i, 1);
            boo = false;
            break;
        }
    if(boo)
        return "no such data";
    var promise = new Promise(function(resolve) {
        mongo.connect(url, (err, db) => {
            if(err)
                throw "database connect failed";
            db.collection("user").updateMany({"userName": name}, {$set:{"dislike": like2}}, (err, res) => {
                if(err) {
                    db.close();
                    throw "find error."
                }
                db.close();
                resolve("unlike successful");
            });
        })
    });
    promise.then(function(value) {
        return value;
    })
    return promise;
}

module.exports = {
    create,
    getAll,
    getId,
    remove,
    modifyPassword,
    removeAll,
    modifyEmail,
    liking,
    unliking,
    getName,
    check,
    modifyName,
    dislike,
    undislike,
    getLike,
    getDislike,
    modifyPortrait
}