const jwt = require("jsonwebtoken")
const jwttoken = (user)=>{
    const accesstoken = jwt.sign( { username: user.name, useremail: user.email },
        process.env.ACCESS_TOKEN_STRING,{noTimestamp: true});
     return accesstoken
}
module.exports = jwttoken;
