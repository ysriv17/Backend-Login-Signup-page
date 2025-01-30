const nodemailer = require("nodemailer")
const errors = require("../error-handle")
const sendmail = async (options) => {
    const transporter = nodemailer.createTransport({
       
        service : "gmail",
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        },  
    });
    const mailoptions = {
        from: process.env.SMPT_MAIL,    
        to: options.email, 
        subject: options.subject,
        text: options.message,

    };
    try {
       
        await transporter.sendMail(mailoptions)
    }
    catch (err) {
 
        console.log(" error at sendmailer.js",err)
        throw new errors.Errorhandler(err.message, 400)
    }

}

module.exports = sendmail;