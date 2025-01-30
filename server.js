const express = require("express");
const dotenv = require("dotenv").config()
const cors = require("cors")
const port = process.env.PORT || 5000
const app = express();
const router = require("./user/routes/router");
const Dbconnect = require("./config/Dbconnection");
const bodyParser= require("body-parser")
const session = require("express-session")
const MongoStore = require('connect-mongo');
const sessionStorage = MongoStore.create({ mongoUrl: process.env.CONNECTION_STRING, collectionName: "session" })



const corsOptions = {
    origin: 'http://localhost:5173',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200
    
};
app.use(session({
    secret: "gywcuwicwecb238283u2jwecihwociew293dfj23jwcwleknceiv2woi2oif28o3293fjwicnhwvcenwvioh3802392i3-20i3024392u2ffhwcnwck",
    resave: false,
    saveUninitialized: true,
    // store : sessionStorage,
    cookie: { maxAge: 1000 * 60 * 20, secure: false }
}))


app.use(express.urlencoded({ extended: true }));     
app.use(cors(corsOptions));
app.use(bodyParser.json())

app.use("/user", router);

Dbconnect();

const server = app.listen(port, () => {
    console.log("server is running", port)
})
process.on("unhandledRejection",(err)=>{
    console.log(err,"promise Rejection error")
    
});
