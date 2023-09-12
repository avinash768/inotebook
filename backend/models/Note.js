const mongoose = require('mongoose')
const {Schema} = mongoose;

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        requrired: true
    },
    description:{
        type: String,
        requrired: true
    },
    tag:{
        type: String,
        default:"General"       
    },
    Date:{
        type:Date,
        default: Date.now
    },
})

const Note = mongoose.model('note',NotesSchema);

module.exports = Note;