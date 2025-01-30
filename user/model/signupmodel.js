const mongoose = require("mongoose");
const fs = require("fs")
const signupschema = new mongoose.Schema({

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
    ,
    createdAt: { type: String },
    updatedAt: { type: String, },
    isActive: { type: Boolean }
},);
module.exports = mongoose.model("FormsDuniaSignup", signupschema)