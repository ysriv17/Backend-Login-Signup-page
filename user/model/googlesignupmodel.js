const mongoose = require("mongoose");

const signupschema = new mongoose.Schema({

    name: {
        type: String,
        required: [true]
    },
    email: {
        type: String,
        required: [true]
    },
    googleId: {
        type: String,
        required: [true]
    }
  
}, { timestamps: true });

module.exports = mongoose.model("googlesignup", signupschema)