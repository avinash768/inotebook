const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        requrired: true
    },
    password:{
        type: String,
        requrired: true
    },
    email:{
        type:String,
        requrired: true,
        unique:true
    },
    date:{
        type: Date,
        default: Date.now
    },
})

const User = mongoose.model('user',UserSchema);

module.exports = User;
