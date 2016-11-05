;(function (notesApp, $) {
    "use strict";

    $(function () {

        var notes = [];

        //var createNotesList = Handlebars.compile($("#notesController-template").text());

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

            // make a filter function according to the "Show finished" checkbox
            var today = new Date().toJSON().slice(0, 10); // today's date in format yyyy-mm-dd
            var showFinished = (a) => (a.due > today);
            if ($("#showfinished").is(':checked')) {
                showFinished = (a) => (true);
            }

            // notesController list is first filtered and then sorted
            $("#noteslist").html(createNotesList(notes.filter(showFinished).sort(getComparator(orderby))));
        }

        // get the css style file name from the dropdown, load the css file, store the selection
        function switchStyle() {
            var stylefile = $('#selectstyle').val();
            $("#cssstyle").attr("href", stylefile);
            setState("cssstyle", stylefile);
            return false;
        }

        // store the id of the note to be edited in local storage and switch to the edit page
        function editNote(id) {
            localStorage.setItem("editNote", "" + id);
            window.location = "../editNote-old.html";
        }

        // get and set the state of the orderby and select style option in local storage
        function getState() {
            var state = localStorage.getItem("state");
            if (state != null && state.match(/^..*$/)) {
                return JSON.parse(state);
            } else {
                return {cssstyle: "css/bw.css", order: "due"};
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
            if (state.cssstyle) {
                $("#cssstyle").attr("href", state.cssstyle);
                $("#selectstyle option[value='" + state.cssstyle + "']").prop('selected', true);
            }
            if (state.order) {
                $("#" + state.order).prop("checked", true);
            }
        }

        // load notes from db
        notes = notesLocalStorage.getAll();
        renderNotesList();

        // click events
        $("#order").on("click", renderNotesList);
        $("#showfinished").on("click", renderNotesList);
        $("#selectstyle").on("click", switchStyle);
        $("#newnote").on("click", editNote);
    });

}(window.notesApp = window.notesApp || {}, jQuery));
