var express = require('express');
var router = express.Router();
var notesController = require('../controller/notesController.js');

// for /, render the list
router.get('/',             notesController.showNotes);

router.get('/editNote',     notesController.showEditNote);
router.get('/editNote/:id', notesController.showEditNote);
router.put('/editNote/:id', notesController.updateNote);
router.post('/editNote/',   notesController.addNote);

router.get('/notes',        notesController.getAllNotes);
router.post('/notes',       notesController.modifyNotesData);

module.exports = router;
