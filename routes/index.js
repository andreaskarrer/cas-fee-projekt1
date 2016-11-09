var express = require('express');
var router = express.Router();
var notesController = require('../controller/notesController.js');

// for /, render the list
router.get('/',          notesController.showIndex);

router.get('/note',      notesController.showEditNote);
router.get('/note/:id',  notesController.showEditNote);
router.post('/note/:id', notesController.updateNote);
router.post('/note/',    notesController.addNote);

router.get('/notes',     notesController.getNotes);
router.post('/notes',    notesController.modifyNotesData);

module.exports = router;
