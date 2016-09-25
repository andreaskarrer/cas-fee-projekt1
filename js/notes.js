var notes =
    [{
        "id": 1,
        "title": "Blumen giessen",
        "desc": "Blumen auf dem Balkon und hinter dem Haus giessen.",
        "importance": 1,
        "created": "2016-09-25",
        "due": "2016-12-31"
    }, {
        "id": 2,
        "title": "Rechnungen zahlen",
        "desc": "Miete schon 2x gemahnt!",
        "importance": 4,
        "created": "2016-09-20",
        "due": "2016-09-25"
    }, {
        "id": 3,
        "title": "Steuereklärung",
        "desc": "Fristerstreckung bis 30. Nov",
        "importance": 5,
        "created": "2016-09-25",
        "due": "2016-11-30"
    }, {
        "id": 4,
        "title": "Kino",
        "desc": "Scharf beobachtete Züge, Jiří Menzel, Filmpodium.",
        "importance": 4,
        "created": "2016-09-25",
        "due": "2016-10-07"
    }, {
        "id": 5,
        "title": "USB-Stick mitnehmen",
        "desc": "Klio Buchhandlung Katalog dump, > Newsletter",
        "importance": 2,
        "created": "2016-09-25",
        "due": "2016-11-24"
    }];


function byDueDate(s1, s2) {
    return s1.due < s2.due;
}
function byCreationDate(s1, s2) {
    return s1.created < s2.created;
}
function byImportance(s1, s2) {
    return s1.importance - s2.importance;
}

// function findSong(id) {
//     for (var i = 0; i < songs.length; i++) {
//         if (songs[i].id == id) {
//             return songs[i];
//         }
//     }
//     return {};
// }
// function rateSong (songId, delta) {
//     var song = findSong(songId);
//     song.rating += delta;
//     renderSongs();
// }

var createNotesList = Handlebars.compile(document.getElementById("notes-template").innerText);
function renderNotesList () {
    // make a comparator function according to the orderby radio buttons
    var orderby = $("input:radio[name ='orderby']:checked").val();

    var comparator;
    switch (orderby) {
        case "due":        comparator = function(a, b) { return a.due < b.due; }; break;
        case "created":    comparator = function(a, b) { return a.created < b.created; }; break;
        case "importance": comparator = function(a, b) { return b.importance - a.importance; }; break;
    }
    // make a filter function according to the "Show finished" checkbox
    var today = new Date().toJSON().slice(0,10); // todays date in format yyyy-mm-dd
    var showFinished = function(a) { return a.due > today; }
    if ($("#showfinished").is(':checked')) {
        showFinished = function(a) { return true; }
    }

    for (var i=0; i<notes.size;i++) {
        console.log(notes[i].id + " = " + notes[i].title)
    }
    $("#noteslist").html(createNotesList(notes.filter(showFinished).sort(comparator)));
}
$(function() {
    renderNotesList();
});