const globalErrorHandler = (err,req,res,next) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error"
   res.status(err.statusCode).json({
       message: err.message,
       status: err.status,
       stack: process.env.NODE_ENV === "development"? err.stack : null,
   })
   }
   
   module.exports = globalErrorHandler