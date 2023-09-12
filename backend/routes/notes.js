const express = require('express');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');

const router = express.Router();

//raout  1 : show all notes used post "/api/auth/fetchallnotes". in login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {

        const notes = await Note.find({ user: req.user.id });
        res.json(notes);

    } catch (error) {
        console.log(error.massage);
        res.status(500).send("Internal server error");
    }
})

//raout  2 : add new notes post "/api/auth/addnote". in login required
// router.post('/addnote', fetchuser, [
//     body('title', 'Enter a valid title').isLength({ min: 3 }),
//     body('description', 'Enter a valid description').isLength({ min: 5 }),
// ], async (req, res) => {

//     try {

//         const { title, description, tag } = req.body;
//         const errors = validationResult(req);
//         // any error accuared send bad request
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//         const note = new Note({
//             title, description, tag, user: req.User.id
//         })

//         const saveNote = await note.save();
//         res.json(saveNote);

//     } catch (error) {
//         console.log(error.massage);
//         res.status(500).send("Internal server error");
//     }
// })
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



module.exports = router