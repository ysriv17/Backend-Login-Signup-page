const unVerified = require("../../model/unVerified");
const signup = require("../../model/signupmodel")
const jwt = require("jsonwebtoken");
const express = require('express');
const app = express();
const emailVarification = async (req, res, next) => {
    const activationtkn = await req.query.acesstoken
    console.log(activationtkn, req.query, "backend")
    
    const accesstkn = await unVerified.findOne({ jwttoken: `${activationtkn}` })
   
    const verifieduser = accesstkn.userdata
    console.log(verifieduser.email, "runnnnnnnnnnnn")
    if (accesstkn.jwttoken == activationtkn && 
        await signup.findOne({email:verifieduser.email})==null) {
        
        await signup.create( verifieduser );
        res.status(201).redirect('http://localhost:5173/')
    }
    else {
        res.json({ message: "user not registerd" }).status(100)
        
    }
}
module.exports = emailVarification