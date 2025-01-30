const ErrorHandler = require("../../error-handle")
module.export = (err, req, res, next) => {
   err.statusCode = err.statusCode || 500
   err.message = err.message || "internal server error"
   //wrong mogodb id error
   if (err.name === "CastError") {
      const message = `Resource not found with id..  Invalid ${err.path}`
      err = new ErrorHandler(message, 400)
   }

   //Duplicate key error

   if (err.code === 11000) {
      const message = `Dulicated key${Object.keys(err.keyValue)} Entered`;
      err = new ErrorHandler(message, 400)
   }
   //Wrong Jwt Error
   if (err.name === "JsonWebTokenError") {
      const message = "Your url is invalid please try again"
      err = new ErrorHandler(message, 400)
   }
} 