'use strict';

var notes = [];

var createNotesList = Handlebars.compile($("#notes-template").text());

function getComparator(orderby) {
    var comparator;
    switch (orderby) {
        case "due":        comparator = (a, b) => (a.due < b.due); break;
        case "created":    comparator = (a, b) => (a.created < b.created); break;
        case "importance": comparator = (a, b) => (b.importance - a.importance); break;
    }
    return comparator;
}

function renderNotesList () {
    // make a comparator function according to the orderby radio buttons
    var orderby = $("input:radio[name ='orderby']:checked").val();

    // make a filter function according to the "Show finished" checkbox
    var today = new Date().toJSON().slice(0,10); // today's date in format yyyy-mm-dd
    var showFinished = (a) => (a.due > today);
    if ($("#showfinished").is(':checked')) {
        showFinished = (a) => (true);
    }

    // notes list is first filtered and then sorted
    $("#noteslist").html(createNotesList(notes.filter(showFinished).sort(getComparator(orderby))));
}

function editNote(id) {
    // store the id of the note to be edited in local storage and switch to the edit page
    localStorage.setItem("editNote", ""+id);
    window.location = "editNote.html";
}

function navEventHandler (event) {
    console.log("ev targ id:"+event.target.id);
    if (event.target.id == "newnote") {
        editNote(0);
    }
    renderNotesList();
}

$(function() {
    notes = notesLocalStorage.getAll();
    renderNotesList();

    //$("newnote").on("click", editNote);
    $("nav").on("click", navEventHandler);
});
