
class Errorhandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace({message:this.message,satutsCode: this.statusCode});
        console.log(this.statusCode, this.message,"LLLL")
    };
};
module.exports =  {Errorhandler} 
