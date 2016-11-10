var notesService = require("../services/notesService.js");

function Note(title, desc, due, importance, finished) {
    this.title = title;
    this.desc = desc;
    this.due = due;
    this.importance = importance;
    this.finished = finished ? true : false;
}

module.exports.showIndex = function(req, res, next) {
    res.render("index");
};

module.exports.showNote = function(req, res, next) {
    notesService.getNote(req.params.id, function(err, note) {
        res.render("note", note);
    });
};

// returns the list of notes as json
module.exports.getNotesJSON = function(req, res, next) {
    notesService.getNotes(function(err, notes) {
        res.json(notes);
    });
};

module.exports.getNotes = function(req, res, next) {
    notesService.getNotes(req.query.orderby, function(err, notes) {
        res.render("notesList", notes);
    });

};

module.exports.modifyNotesData = function(req, res, next) {
    notesService.getModifyNotes(req.body.sortBy, req.body.filterBy, function(err, notes) {
        res.render("notesList", notes);
    });
};


module.exports.renderNotes = function(req, res, next) {
    res.render("notesList", JSON.parse(req.body.data));
};

module.exports.addNote = function(req, res, next) {
    var note = new Note(req.body.title, req.body.desc, req.body.due,
                        req.body.importance, req.body.finished);
    notesService.putNote(note);
    res.redirect("/");
};

module.exports.updateNote = function(req, res, next) {
    notesService.getNote(req.params.id, function(err, note) {
        note.title = req.body.title;
        note.desc = req.body.desc;
        note.due = req.body.due;
        note.importance = req.body.importance;
        note.finished = req.body.finished ? true : false;
        notesService.putNote(note);
    });
    res.redirect("/");
};
