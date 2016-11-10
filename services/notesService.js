"use strict";

var Datastore = require('nedb');

// hm lets find the db no matter if we started form the app- or from the bin directory
var fs = require("fs");
var dbfile = "db/notes.nedb";
if (! fs.existsSync(dbfile)) {
    dbfile = "../" + dbfile;
}
var db = new Datastore({filename: '../db/notes.nedb', autoload: true});

// get a list of notes ordered by "orderby -1"
function publicGetNotes(orderby, callback) {
    console.log("running publicGetAllNotes: "+orderby);
    var sorter = {};
    sorter[orderby] = -1;
    db.find({}).sort(sorter).exec(function (err, docs) {
        callback(err, docs);
    });
}

// get a note by id
function publicGetNote(id, callback) {
    db.findOne({ _id: id }, function (err, doc) {
        callback(err, doc);
    });
}

// put a note: insert/update.
// If the note contains an id, update; else add the "created" date and insert.
function publicPutNote(note) {
    if (typeof note._id == "undefined") {
        note["created"] = new Date().toJSON().slice(0, 10); // yyyy-mm-dd
        db.insert(note);
    } else {
        db.update({_id: note._id}, note, {});
    }
}


module.exports = {
    getNotes: publicGetNotes,
    getNote: publicGetNote,
    putNote: publicPutNote,
};