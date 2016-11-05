"use strict";

var Datastore = require('nedb');
var db = new Datastore({filename: 'db/notes.nedb', autoload: true});

function publicGetAllNotes(callback) {
    db.find({}, function (err, docs) {
        callback(err, docs);
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

function publicAddNote(note) {
    note["createDate"] = new Date();
    db.insert(note);
}

function publicUpdateNote(note) {
    publicGetNote(note._id, function (err, doc) {
        db.update(doc, note, {});
    });

}

function publicGetNote(id, callback) {
    db.findOne({ _id: id }, function (err, doc) {
        callback(err, doc);
    });
}


module.exports = {
    getAll: publicGetAllNotes,
    //getModifyNotes: publicGetModifyNotes,
    add: publicAddNote,
    put: publicUpdateNote,
    get: publicGetNote
};