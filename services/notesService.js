"use strict";

var Datastore = require('nedb');
// hm lets find the db no matter if we started form the app- or from the bin directory
var fs = require("fs");
var dbfile = "db/notes.nedb";
if (! fs.existsSync(dbfile)) {
    dbfile = "../" + dbfile;
}
var db = new Datastore({filename: '../db/notes.nedb', autoload: true});


function publicGetAllNotes(callback) {
    db.find({}).sort({due: 1}).exec(function (err, docs) {
        //console.error("db: got "+docs.length+" notes");
        callback(err, docs);
    });
}

// get a note by  id
function publicGetNote(id, callback) {
    db.findOne({ _id: id }, function (err, doc) {
        callback(err, doc);
    });
}

// put a note. If the note contains an id, update, else insert
function publicPutNote(note) {
    if (typeof note._id == "undefined") {
        note["created"] = new Date().toJSON().slice(0, 10);
        db.insert(note);
    } else {
        db.update({_id: note._id}, note, {});
    }
    //db.persistence.compactDatafile();
}

function publicAddNote(note) {
    note["created"] = new Date().toJSON().slice(0, 10);
    db.insert(note);
}

function publicUpdateNote(note) {
    publicGetNote(note._id, function (err, doc) {
        db.update(doc, note, {});
    });

}

function publicGetModifyNotes(sortBy, filterBy, callback) {
    filterBy = JSON.parse(filterBy);
    sortBy = JSON.parse(sortBy);
    if (sortBy && filterBy) {
        db.find(filterBy).sort(sortBy).exec(function (err, docs) {
            callback(err, docs);
        });
    } else if(filterBy) {
        db.find(filterBy, function (err, docs) {
            callback(err, docs);
        });
    } else if(sortBy) {
        db.find({}).sort(sortBy).exec(function (err, docs) {
            callback(err, docs);
        });
    } else {
        db.find({}, function (err, docs) {
            callback(err, docs);
        });
    }
}

module.exports = {
    getNotes: publicGetAllNotes,
    getNote: publicGetNote,
    putNote: publicPutNote,
    //getModifyNotes: publicGetModifyNotes,
    //add: publicAddNote,
    //putold: publicUpdateNote,
};