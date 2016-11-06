
var fs = require('fs');
//fs.unlinkSync("db/notes.nedb");

var notesService = require("../services/notesService.js");
var testDB = "tmp.nedb";
//notesService.setDbFile(testDB);
var noteA = {"title": "Blumen giessen",
             "desc": "Blumen auf dem Balkon und hinter dem Haus giessen.",
            "importance": 1,
            //"created": "2016-09-25",
            "finished": false,
            "due": "2016-11-20"};

var noteB = {"title": "Steuererklärung",
            "desc": "Fristerstreckung bis 30. Nov",
            "importance": 5,
            //"created": "2016-09-25",
            "finished": false,
            "due": "2016-11-30"};

function tester(label, test) {
    console.log(label + ": " + (test ? "OK" : "BAD"));
}

var notes;

var id;
notesService.putNote(noteA);
notesService.putNote(noteB);
notesService.getNotes(function(err, notes) {
    tester("Length",(notes.length == 2));
    console.log("db len="+notes.length);
    console.log("db: "+notes[0]._id+" "+notes[0].title);
    console.log("db: "+notes[1]._id+" "+notes[1].title);
    var id = notes[0]._id;
    notesService.getNote(id, function(err, note) {
        tester("id 0 title", note.title === "Blumen giessen");
        note.title = "Rasen sprengen";
        notesService.putNote(note);
        notesService.getNotes(function(err, notes) {
            tester("Length",(notes.length == 2));
            console.log("db len="+notes.length);
            console.log("db: "+notes[0]._id+" "+notes[0].title);
            console.log("db: "+notes[1]._id+" "+notes[1].title);
            var id = notes[0]._id;
            notesService.getNote(id, function(err, note) {
                console.log("getting " + id + " "+note.title);
                tester("id 0 new title", note.title === "Rasen sprengen");
            });
        });

    });
});




