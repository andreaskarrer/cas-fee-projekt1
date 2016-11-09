;(function (notesApp, $) {
    "use strict";

    $(function () {

        function getComparator(orderby) {
            var comparator;
            switch (orderby) {
                case "due":
                    comparator = (a, b) => (a.due < b.due);
                    break;
                case "created":
                    comparator = (a, b) => (a.created < b.created);
                    break;
                case "importance":
                    comparator = (a, b) => (b.importance - a.importance);
                    break;
            }
            return comparator;
        }

        function renderNotesList() {
            // make a comparator function according to the orderby radio buttons
            var orderby = $("input:radio[name ='orderby']:checked").val();
            setState("order", orderby);
            console.log("orderby:"+orderby);


            // get the notes list
            $.get("/notes").done(function (data) {
                $("#noteslist").html(data);
            });
        }

        // hide notes that are done. This is done locally, we always load all notes.
        function showFinished() {
            // make a filter function according to the "Show finished" checkbox
            var today = new Date().toJSON().slice(0, 10); // today's date in format yyyy-mm-dd
            var showFinished = (a) => (a.due > today);
            if ($("#showfinished").is(':checked')) {
                $("input.done:checked").parent().parent().parent().parent().show("fast");
                console.log("hide");
                showFinished = (a) => (true);
            } else {
                $("input.done:checked").parent().parent().parent().parent().hide("fast");
                console.log("show");
            }
        }

        // get the css style file name from the dropdown, load the css file, store the selection
        function switchStyle() {
            var style = $('#selectstyle').val();
            setState("cssstyle", style);
            var cssFile = $("#cssstyle").attr("href").replace(/\/\w+\.css$/, "/" + style + ".css");
            $("#cssstyle").attr("href", cssFile);
            return false;
        }

        // create new note
        function newNote() {
            window.location = "/note";
        }

        // get and set the state of the orderby and select style option in local storage
        function getState() {
            var state = localStorage.getItem("state");
            if (state != null && state.match(/^.*$/)) {
                return JSON.parse(state);
            } else {
                return {cssstyle: "bw", order: "due"};
            }
        }

        function setState(key, val) {
            var state = getState();
            state[key] = val;
            localStorage.setItem("state", JSON.stringify(state));
        }


        // load state (css style, sort option) from local storage early
        var state = getState();
        if (state) {
            if (state.cssstyle && state.cssstyle !== "bw") {
                var cssFile = $("#cssstyle").attr("href").replace(/\/\w+\.css$/, "/" + state.cssstyle + ".css");
                $("#cssstyle").attr("href", cssFile);
                $("#selectstyle option[value='" + state.cssstyle + "']").prop('selected', true);
            }
            if (state.order) {
                $("#" + state.order).prop("checked", true);
            }
        }

        // clickables in nav header
        $("#newnote").on("click", newNote);
        $("#selectstyle").on("click", switchStyle);
        $("#order").on("click", renderNotesList);
        $("#showfinished").on("click", showFinished);

        renderNotesList();
    });

}(window.notesApp = window.notesApp || {}, jQuery));
