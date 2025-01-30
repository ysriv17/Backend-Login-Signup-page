const mongoose = require("mongoose");
const fs = require("fs")
const unVerified = new mongoose.Schema({
    jwttoken: {
        type: String,
        required: [true]
    },
    userdata :{
        name: {
            type: String,
            required: [true]
        },
        email: {
            type: String,
            required: [true]
        },        
        password: {
            type: String,
            required: [true]
        }
    }
}, );
module.exports = mongoose.model("unVerified", unVerified)