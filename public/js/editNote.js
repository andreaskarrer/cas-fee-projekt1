;(function (notesApp, $) {
    "use strict";

    //var createEditNote = Handlebars.compile($("#editNote-template").text());
    // var note;
    //
    // function renderEditNote() {
    //     var id = localStorage.getItem("editNote");
    //     note = (id === "0") ? {"id": id} : notesLocalStorage.get(id);
    //     console.log("editing id:" + id + ",  note:" + note.title + ", [" + note.desc + "]");
    //     $("#editNote").html(createEditNote(note));
    // }

    function validateField(fld, pattern) {
        if (pattern === undefined) {
            pattern = /\S/;
        }
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
        var validationErrors = 0;
        validationErrors += validateField("#title");
        validationErrors += validateField("#desc");
        validationErrors += validateField("#importance", /[0-4]/);
        validationErrors += validateField("#due", /\d\d\d\d-\d?\d-\d?\d/);
        if (validationErrors > 0) {
            return;
        }


        var note = {
            "id": $("#id").text(),
            "title": $("#title").val(),
            "desc": $("#desc").val(),
            "importance": $("#importance").val(),
            "created": created,
            "due": $("#due").val()
        };
        // if we don't have a created date, use "now"
        var created = $("#created").text();
        if (created.match(/\d\d\d\d-\d\d-\d\d/)) {
            note.created = created;
        } else {
            note.created = new Date().toJSON().slice(0, 10);
        }
        window.location = "/";
    }

    function cancel() {
        window.location = "/";
    }

    function getState() {
        var state = localStorage.getItem("state");
        if (state != null && state.match(/^..*$/)) {
            return JSON.parse(state);
        } else {
            return {cssstyle: "css/bw.css", order: "due"};
        }
    }

    // apply the css style saved in local storage
    var state = getState();
    if (state && state.cssstyle && state.cssstyle !== "bw") {
        var cssFile = $("#cssstyle").attr("href").replace(/\/\w+\.css$/, "/" + state.cssstyle + ".css");
        $("#cssstyle").attr("href", cssFile);
        $("#selectstyle option[value='" + state.cssstyle + "']").prop('selected', true);
    }

    $("#title").on("blur",      function () { validateField("#title") });
    $("#desc").on("blur",       function () { validateField("#desc") });
    $("#importance").on("blur", function () { validateField("#importance") });
    $("#due").on("blur",        function () { validateField("#due", /\d\d\d\d-\d?\d-\d?\d/) });
    //$("#save").on("click", save);
    $("#cancel").on("click", cancel);

    //renderEditNote();

}(window.notesApp = window.notesApp || {}, jQuery));
