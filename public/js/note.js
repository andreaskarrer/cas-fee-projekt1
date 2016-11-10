;(function (notesApp, $) {
    "use strict";

    // apply the css style saved in local storage
    var state = localStorage.getItem("state");
    if (state != null && state.match(/^..*$/)) {
        state = JSON.parse(state);
        if (state && state.cssstyle && state.cssstyle !== "bw") {
            var cssFile = $("#cssstyle").attr("href").replace(/\/\w+\.css$/, "/" + state.cssstyle + ".css");
            $("#cssstyle").attr("href", cssFile);
        }
    }


}(window.notesApp = window.notesApp || {}, jQuery));
