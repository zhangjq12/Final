const mongo = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const user = require("./users");
const comments = require("./comments");

const url = "mongodb://127.0.0.1:27017/Final";

async function create(tabName, songName, artist, author, content, descript, avatar, perprice, size) {
    if(tabName == undefined || songName == undefined || artist == undefined || author == undefined || content == undefined || descript == undefined || avatar == undefined || perprice == undefined || size == undefined)
        throw "parameters are missing.";
    var result = [];
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection('tabs').insert({"tabName": tabName, "songName": songName, "artistName": artist, "author": author, "Content": content, "Rating": {"thumbsup": 0, "thumbsdown": 0}, "Descript": descript, "Avatar": avatar, "Perprice": perprice, "Size": size}, (err, res) => {
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
            var find = db.collection("tabs").find();
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

async function getRating() {
    var res = [];
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            var find = db.collection("tabs").find();
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
            var find = db.collection("tabs").find({"_id": ID});
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
            var find = db.collection("tabs").find({tabName: {$regex: name, $options: "$i"}});
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

async function getSongNAME(name) {
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
            var find = db.collection("tabs").find({songName: {$regex: name, $options: "$i"}});
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

async function getSongName(name) {
    const res = await getSongNAME(name);
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
            var find = db.collection("tabs").find({"author": name});
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

async function getAUTHORS(name) {
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
            var find = db.collection("tabs").find({"author": {$regex: name, $options: "$i"}});
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

async function getAuthors(name) {
    const res = await getAUTHORS(name);
    return res;
}


async function getARTIST(name) {
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
            var find = db.collection("tabs").find({"artistName": {$regex: name, $options: "$i"}});
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

async function getArtist(name) {
    const res = await getARTIST(name);
    return res;
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
            db.collection("tabs").deleteMany({"_id": ID} , (err, res) => {
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
            db.collection("tabs").deleteMany({} , (err, res) => {
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

async function modifySongName(id, songName) {
    if(id == undefined || songName == undefined)
        throw "parameter is missing";
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection("tabs").updateMany({"_id": id}, {$set:{"songName": songName}}, (err, res) => {
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

async function modifyTabName(id, tabName) {
    if(id == undefined || tabName == undefined)
        throw "parameter is missing";
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection("tabs").updateMany({"_id": id}, {$set:{"tabName": tabName}}, (err, res) => {
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

async function modifyArtistName(id, artist) {
    if(id == undefined || artist == undefined)
        throw "parameter is missing";
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection("tabs").updateMany({"_id": id}, {$set:{"artistName": artist}}, (err, res) => {
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

async function modifyContent(id, content) {
    if(id == undefined || content == undefined)
        throw "parameter is missing";
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection("tabs").updateMany({"_id": id}, {$set:{"Content": content}}, (err, res) => {
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
async function modifyDescript(id, descript) {
    if(id == undefined || descript == undefined)
        throw "parameter is missing";
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection("tabs").updateMany({"_id": id}, {$set:{"Descript": descript}}, (err, res) => {
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
async function modifyAvatar(id, avatar) {
    if(id == undefined || avatar == undefined)
        throw "parameter is missing";
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection("tabs").updateMany({"_id": id}, {$set:{"Avatar": avatar}}, (err, res) => {
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
async function modifyPerprice(id, perprice) {
    if(id == undefined || perprice == undefined)
        throw "parameter is missing";
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection("tabs").updateMany({"_id": id}, {$set:{"Perprice": perprice}}, (err, res) => {
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
async function modifySize(id, size) {
    if(id == undefined || size == undefined)
        throw "parameter is missing";
    var promise = new Promise(function(resolve) {
        mongo.connect(url,(err, db) => {
            if(err) {
                throw "database connection failed!";
            }
            db.collection("tabs").updateMany({"_id": id}, {$set:{"Size": size}}, (err, res) => {
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
            db.collection("tabs").updateMany({"tabName": name}, {$set:{"Rating": rates}}, (err, res) => {
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
    getAll,
    getId,
    remove,
    removeAll,
    modifyTabName,
    modifySongName,
    modifyArtistName,
    modifyContent,
    rate,
    getName,
    getAuthor,
    getArtist,
    getByRating,
    getAuthors,
    getSongName,
    modifyAvatar,
    modifyDescript,
    modifyPerprice,
    modifySize
}