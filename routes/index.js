var express = require('express');
var router = express.Router();
var notesController = require('../controller/notesController.js');

// for /, render the list
router.get('/',          notesController.showIndex);

// note screen
router.get('/note',      notesController.showNote);
router.get('/note/:id',  notesController.showNote);
router.post('/note/:id', notesController.updateNote);
router.post('/note/',    notesController.addNote);

// notes list
router.get('/notes',     notesController.getNotes);
router.post('/notes',    notesController.modifyNotesData);

module.exports = router;
