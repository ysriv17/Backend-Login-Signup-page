const jwt = require("jsonwebtoken")
const validateaccesstoken = async (req, res ,next) => {
    let token;
    let authHeader = await req.headers.Authorization || req.headers.authorization
    if (authHeader && await(authHeader.startsWith("Bearer"))) {
        token = authHeader.split(" ")[1];
        await jwt.verify(token, process.env.ACCESS_TOKEN_STRING, async(err, decoded) => {
            console.log(err)
            if (err) {
                // res.status(401).json({ message:"INVALID AUTH TOKEN" })
              throw new Error("INVALID AUTH TOKEN")
            }
            else {
                next();
            }
        console.log(decoded)
        })
    }
    else {
        res.json({message:"wrong way to attempt use  breaer token"})
     
    }
}
module.exports = validateaccesstoken;