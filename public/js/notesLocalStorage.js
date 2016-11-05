/**
 * Notes DB (as local storage)
 */
var notesLocalStorage = (function() {
    "use strict";

    var defaultNotes =
        [{
            "id": 1,
            "title": "Blumen giessen",
            "desc": "Blumen auf dem Balkon und hinter dem Haus giessen.",
            "importance": 1,
            "created": "2016-09-25",
            "finished": false,
            "due": "2016-12-31"
        }, {
            "id": 2,
            "title": "Rechnungen zahlen",
            "desc": "Miete schon 2x gemahnt!",
            "importance": 4,
            "created": "2016-09-20",
            "finished": true,
            "due": "2016-09-25"
        }, {
            "id": 3,
            "title": "Steuererklärung",
            "desc": "Fristerstreckung bis 30. Nov",
            "importance": 5,
            "created": "2016-09-25",
            "finished": false,
            "due": "2016-11-30"
        }, {
            "id": 4,
            "title": "Kino",
            "desc": "Scharf beobachtete Züge, Jiří Menzel, Filmpodium.",
            "importance": 4,
            "created": "2016-09-25",
            "finished": false,
            "due": "2016-10-07"
        }, {

            "id": 5,
            "title": "USB-Stick mitnehmen",
            "desc": "Klio Buchhandlung Katalog dump, > Newsletter",
            "importance": 2,
            "created": "2016-09-25",
            "finished": false,
            "due": "2016-11-24"
        }];

    function publicGetAll() {
        // check if we have notes in local storage
        var notes = localStorage.getItem("notes");
        if (notes != null && notes.match(/^\[.*\]$/)) {
            console.log(notes.length + " bytes of notes in local storage");
            notes =  JSON.parse(notes);
            console.log(notes.length + " note elements in local storage");
            return notes;
        } else {
            console.log("initializing local storage");
            localStorage.removeItem("notes");
            publicPutAll(defaultNotes);
            return defaultNotes;
        }
    }

    function publicPutAll(notes) {
        localStorage.setItem("notes", JSON.stringify(notes));
    }

    function publicPutNote(note) {
        if (note.id == "0") {
            note.id = getNewId();
        }
        var notes = publicGetAll();
        var isNew = true;
        for (var i=0; i<notes.length; i++) {
            if (notes[i].id == note.id) {
                notes[i] = note;
                isNew = false;
                break;
            }
        }
        if (isNew) {
            notes.push(note);
        }
        publicPutAll(notes);
    }

    function publicGetNote(id) {
        var notes = publicGetAll();
        console.log(notes.length + " notes in local storage");
        for (var i=0; i<notes.length; i++) {
            if (notes[i].id == id) {
                console.log("Found note "+id+" in local storage");
                return notes[i];
            }
        }
        return null;
    }

    function getNewId() {
        var notes = publicGetAll();
        var maxId = 0;
        for (var i=0; i<notes.length; i++) {
            if (notes[i].id > maxId) {
                maxId = notes[i].id;
            }
        }
        maxId++;
        return maxId;
    }

    return {
        getAll : publicGetAll,
        get : publicGetNote,
        putAll : publicPutAll,
        put : publicPutNote
    };

}());