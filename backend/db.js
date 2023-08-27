const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/"

mongoose.set('strictQuery', true);
const connectToMongo = () =>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connecte to the mongoose succesfuly")
    })
}

module.exports = connectToMongo