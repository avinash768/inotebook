const express = require('express');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');

const router = express.Router();

//route  1 : show all notes used post "/api/Notes/fetchallnotes". in login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {

        const notes = await Note.find({ user: req.user.id });
        res.json(notes);

    } catch (error) {
        console.log(error.massage);
        res.status(500).send("Internal server error");
    }
})

//route  2 : add new notes post "/api/Notes/addnote". in login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 }),
], async (req, res) => {

    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    // any error accuared send bad request
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
        title, description, tag, user: req.user.id
    })

    const saveNote = await note.save();
    res.json(saveNote);

})

//route  3 : updating excting note "put/api/Notes/updatenote".login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //fetch all data frome database 
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote } { newNote.tag = tag };
    //find note by using id 

    let note = await Note.findById(req.params.id);

    if (!note) { return res.status(404).send("Not Found"); }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note });

})

module.exports = router