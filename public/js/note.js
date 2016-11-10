;(function (notesApp, $) {
    "use strict";

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

    function validateAndsave() {
        var validationErrors = 0;
        validationErrors += validateField("#title");
        validationErrors += validateField("#desc");
        validationErrors += validateField("#importance", /[1-5]/);
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
        console.log("cancel handler");
        window.location.replace("/");
        return false;
    }

    function save(){
        console.log("save handler");
        $("form").submit();
    }

    function setStyle() {
        var state = localStorage.getItem("state");
        if (state != null && state.match(/^..*$/)) {
            state = JSON.parse(state);
            if (state && state.cssstyle && state.cssstyle !== "bw") {
                var cssFile = $("#cssstyle").attr("href").replace(/\/\w+\.css$/, "/" + state.cssstyle + ".css");
                $("#cssstyle").attr("href", cssFile);
            }
        }
    }

    // apply the css style saved in local storage
    setStyle();

    $("#title").on("blur",      function () { validateField("#title") });
    $("#desc").on("blur",       function () { validateField("#desc") });
    $("#importance").on("blur", function () { validateField("#importance") });
    $("#due").on("blur",        function () { validateField("#due", /\d\d\d\d-\d?\d-\d?\d/) });

    $("#save").on("click", save);
    $("#cancel").on("click", cancel);

}(window.notesApp = window.notesApp || {}, jQuery));
