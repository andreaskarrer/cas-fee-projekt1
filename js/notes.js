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
    setState("order", orderby);

    // make a filter function according to the "Show finished" checkbox
    var today = new Date().toJSON().slice(0,10); // today's date in format yyyy-mm-dd
    var showFinished = (a) => (a.due > today);
    if ($("#showfinished").is(':checked')) {
        showFinished = (a) => (true);
    }

    // notes list is first filtered and then sorted
    $("#noteslist").html(createNotesList(notes.filter(showFinished).sort(getComparator(orderby))));
}

function switchStyle() {
    var stylefile = $('#selectstyle').val();
    $("#cssstyle").attr("href", stylefile);
    setState("cssstyle", stylefile);
    return false;
}

function editNote(id) {
    // store the id of the note to be edited in local storage and switch to the edit page
    localStorage.setItem("editNote", ""+id);
    window.location = "editNote.html";
}

// have one event handler for the whole nav area and decode the evets here
function navEventHandler (event) {
    console.log("ev targ id:" + event.target.id);
    if (event.target.id == "newnote") {
        editNote(0);
    } else if (event.target.id == "selectstyle") {
        switchStyle();
    }
    renderNotesList();
}

function getState() {
    var state = localStorage.getItem("state");
    if (state != null && state.match(/^..*$/)) {
        return JSON.parse(state);
    } else {
        return {cssstyle: "css/bw.css", order: "due"};
    }
}

function setState (key, val) {
    var state = getState();
    state[key] = val;
    localStorage.setItem("state", JSON.stringify(state));
}

$(function() {
    // load state (css style, sort option) early
    var state = getState();
    if (state) {
        if (state.cssstyle) {
            $("#cssstyle").attr("href", state.cssstyle);
            $("#selectstyle option[value='" + state.cssstyle + "']").prop('selected', true);
        }
        if (state.order) {
            $("#" + state.order).prop("checked", true);
        }
    }

    // load notes
    notes = notesLocalStorage.getAll();
    renderNotesList();

    //
    $("nav").on("click", navEventHandler);
});
