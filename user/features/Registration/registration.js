const errors = require("../../../error-handle");

const signup = require("../../model/signupmodel");
const bcrypt = require("bcrypt");

const jwttoken = require("../../../utiles/createtoken");
const sendmail = require("../../../utiles/sendmailer");
const register = async (req, res, next) => {

  try {
    const { email, password, name } = await req.body;
    let user = await signup.findOne({ email })
    console.log(user, "register user")
    if (!email || !password || !name) {
      res.status(100).json({ message: `${errors}`, status: false })
    }
    else if (user) {
      res.json({ Message: "User already exist", status: false });
    }
    else {
      ////////////////////////////////////////////////////////creating data in database ///////////////////////////////////////////////////
      const hashedpassword = await bcrypt.hash(password, 10);
      const newuser = {
        email: `${email}`,
        password: `${hashedpassword}`,
        name: `${name}`,

      }
      //  await signup.create({ email, name, password: hashedpassword, avaiter});

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      const accesstkn = jwttoken(newuser);
      const acctivationlink = `http://localhost:3001/user/activation?acesstoken=${accesstkn}`

      /////////////////////////////////////////////////////////////////////Email sending using gmail and nodemailer ////////////////
      try {
        await sendmail({
          email: newuser.email,
          subject: "Activate your account",
          message: `Hello ${newuser.name}, click on the link to activate your account ${acctivationlink}`
        })
        // res.status(200).json({ Message: `check your mailbox foe veri: ${newuser.email}`, status: true })
      
      }
      catch (err) {
        new errors.Errorhandler(err.message, 402)
        console.log("error in sending mail")
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }
  }
  catch (err) {
    console.log("imhere error", err)
    return next(new errors.Errorhandler(err.message, 403))
  }
  next();

}

module.exports = { register }
