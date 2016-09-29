'use strict';

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
        "title": "Steuererklärung",
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


var createNotesList = Handlebars.compile(document.getElementById("notes-template").innerText);

function renderNotesList () {
    // make a comparator function according to the orderby radio buttons
    var orderby = $("input:radio[name ='orderby']:checked").val();
    var comparator;
    switch (orderby) {
        case "due":        comparator = (a, b) => (a.due < b.due); break;
        case "created":    comparator = (a, b) => (a.created < b.created); break;
        case "importance": comparator = (a, b) => (b.importance - a.importance); break;
    }

    // make a filter function according to the "Show finished" checkbox
    var today = new Date().toJSON().slice(0,10); // today's date in format yyyy-mm-dd
    var showFinished = (a) => (a.due > today);
    if ($("#showfinished").is(':checked')) {
        showFinished = (a) => (true);
    }

    // notes list is first filtered and then sorted
    $("#noteslist").html(createNotesList(notes.filter(showFinished).sort(comparator)));
}

function navEventHandler (event) {
    renderNotesList();
}

$(function() {
    renderNotesList();

    $("nav").on("click", navEventHandler);
});
