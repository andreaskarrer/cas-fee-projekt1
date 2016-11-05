var notesService = require("../services/notesService.js");

function Note(title, desc, due, importance, finished) {
    this.title = title;
    this.desc = desc;
    this.due = due;
    this.importance = importance;
    this.finished = finished ? true : false;
}

module.exports.showNotes = function(req, res, next) {
    res.render("index");
};

module.exports.showEditNote = function(req, res, next) {
    notesService.getNote(req.params.id, function(err, note) {
        res.render("editNote", note);
    });
};

module.exports.getAllNotes = function(req, res, next) {
    notesService.getNotes(function(err, notes) {
        res.json(notes);
    });
};

module.exports.modifyNotesData = function(req, res, next) {
    notesService.getModifyNotes(req.body.sortBy, req.body.filterBy, function(err, notes) {
        res.render("notesController", notes);
    });
};


module.exports.renderNotes = function(req, res, next) {
    res.render("notesController", JSON.parse(req.body.data));
};

module.exports.addNote = function(req, res, next) {
    var note = new Note(req.body.title, req.body.desc, req.body.due,
                        req.body.importance, req.body.finished);
    notesService.addNote(note);
    res.redirect("/");
};

module.exports.updateNote = function(req, res, next) {
    notesService.getNote(req.params.id, function(err, note) {
        note.title = req.body.title;
        note.desc = req.body.desc;
        note.due = req.body.due;
        note.importance = req.body.importance;
        note.finished = req.body.finished ? true : false;
        notesService.updateNote(note);
    });
    res.redirect("/");
};
