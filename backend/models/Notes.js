const mongoose = require('mongoose')

const NotesSchema = new Schema({
    title:{
        type: String,
        requrired: true
    },
    description:{
        type: String,
        requrired: true
    },
    tag:{
        type: Date,
        default:"General"       
    },
    Date:{
        type:Date,
        default: Date.now
    },
})

module.exports = mongoose.mode2('notes',NotesSchema);