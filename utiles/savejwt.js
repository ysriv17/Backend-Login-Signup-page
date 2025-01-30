const jwttoken = require('../utiles/createtoken')
const unVerified = require("../user/model/unVerified")
const bcrypt = require("bcrypt");
const Savejwt = async (req, res, next) => {
    const { email, password, name } = req.body
    
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = {
        email: `${email}`,
        password: `${hashedpassword}`,
        name: `${name}`,
   
    }

    const accestoken = jwttoken(user)
   
    unVerified.create({ jwttoken: accestoken , userdata : user })
  res.json({ Message: `check your mailbox foe veri: ${user.email}`, status: true })
}
module.exports = Savejwt