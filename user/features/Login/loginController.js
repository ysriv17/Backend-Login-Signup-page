const signup = require("../../model/signupmodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Jwttoken = require("../../../utiles/createtoken.js");

const Login = async (req, res, next) => {
    const { email, password } = await req.body;
    try {

        console.log(req.body, email, password, "llllllllllllllllllllllllllooooooooooooooooooooooo")
        let user = await signup.findOne({ email })
        console.log(user,req.body,"LLLLLLLLLLLFFFFFFFFFFFFFFFFFFFFFFfffff")
        if (user == null) {
            res.json("user not found");
            throw new Error("user not valid");
        }
        else if (user.email && bcrypt.compare(password, user.password)) {
            // const accesstoken = jwt.sign({ user: { username: user.name, email: user.email, id: user.id } },
            //     process.env.ACCESS_TOKEN_STRING);
            // console.log(user)
            // res.json({ accesstkn: accesstoken, user: user });
            // console.log(accesstoken);
            const accesstkn = Jwttoken(user);
            res.json({ accesstoken: accesstkn, user: user });
        }
        else {
            res.json({ message: "wrong password" });
            throw new Error("wrong password")
        }
    }
    catch (err) {
        throw new Error(`${err}`)
    }
}


module.exports = { Login }