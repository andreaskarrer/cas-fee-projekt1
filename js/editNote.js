'use strict';

var createEditNote = Handlebars.compile($("#editNote-template").text());
var note;

function renderEditNote() {
    var id = localStorage.getItem("editNote");
    note = (id === "0") ? { "id": id } : notesLocalStorage.get(id);
    console.log("editing id:"+id+",  note:"+note.title+", ["+note.desc+"]");
    $("#editNote").html(createEditNote(note));

}

function validateField(fld, pattern) {
    if (pattern === undefined) { pattern = /\S/; }
    var v = $(fld).val();
    if (v !== undefined && v.match(pattern)) {
        $(fld).removeClass("err");
        $(fld).next().css({display: "none"});
        return 0;
    } else {
        $(fld).addClass("err");
        $(fld).next().css({display: "inline"});
        return 1;
    }
}

function save() {
    var valErrs = 0;
    valErrs += validateField("#title");
    valErrs += validateField("#desc");
    valErrs += validateField("#importance", /[0-4]/);
    valErrs += validateField("#due", /\d\d\d\d-\d?\d-\d?\d/, "date in yyyy-mm-dd");
    if (valErrs > 0) {
        return;
    }

    var created = $("#created").text();
    if (created.match(/\d\d\d\d-\d\d-\d\d/)) {
        created = new Date().toJSON().slice(0, 10);
    }
    var note =
    {
        "id": $("#id").text(),
        "title": $("#title").val(),
        "desc": $("#desc").val(),
        "importance": $("#importance").val(),
        "created": created,
        "due": $("#due").val()
    };
    notesLocalStorage.put(note);
    localStorage.removeItem("editNote");
    window.location = "index.html";
}

function cancel() {
    localStorage.removeItem("editNote");
    window.location = "index.html";
}

$(function() {
    renderEditNote();

    $("#title").on("blur", function () {validateField("#title")});
    $("#desc").on("blur", function () {validateField("#desc")});
    $("#importance").on("blur", function () {validateField("#importance")});
    $("#due").on("blur", function () {validateField("#due", /\d\d\d\d-\d?\d-\d?\d/, "date in yyyy-mm-dd")});

    $("#save").on("click", save);
    $("#cancel").on("click", cancel);
});
