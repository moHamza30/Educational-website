const jwt = require("jsonwebtoken");
const AppError = require("./AppError");
const User = require("../models/userModel");

const verifyToken = async(req,res,next)=>{
const token = req.headers.authorization.split(" ")[1];
if(!token)
    return next(new AppError("invalid token",400))
const {id} = jwt.verify(token,process.env.JWT_SECRET)
const populatedUser = await User.findById(id).populate('bookedCourses');

if (!populatedUser)
    return next(new AppError("user not exist",400))
req.user = populatedUser
next()
}

module.exports= verifyToken