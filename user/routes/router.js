const express = require("express");
const { register } = require("../features/Registration/registration");
const { Login } = require("../features/Login/loginController");
// const { passwordvalidation, emailvarification } = require("../middleware/validation");
const validateaccesstoken = require("../middleware/Validatemiddleware");


const emailVarification = require("../features/Registration/emailVarification");
const router = express.Router();
const savejwt = require("../../utiles/savejwt");
require("../middleware/passport");

const session = require("express-session");
const passport = require("passport");

router.route("/signup").post(register, savejwt);
router.route("/google-signup").get(passport.authenticate("google", { scope: ["profile", "email"] }))
router.route("/google-signup/callback").get(passport.authenticate("google", {
    successRedirect: "http://localhost:5173/",
    failureRedirect: "http://localhost:5173/login"
}), (req,res) => {
    console.log("failed")
})

router.route("/login").post(Login);
router.route("/activation").get(emailVarification)

module.exports = router;