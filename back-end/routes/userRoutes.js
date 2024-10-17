const express = require("express")
const route = express.Router()

const {register,login,bookCourse,getprofile,getAllUsers,EditUser,deleteUser} = require("../controllers/userControllers")
const {registerValidation, loginValidation} = require("../utils/authValidation")
const verifyToken = require("../utils/VerifyToken")



route.post("/register",registerValidation,register)
route.post("/login",loginValidation,login)
route.get("/profile",verifyToken ,getprofile)
route.put("/bookCourse",verifyToken,bookCourse); // Route to create a new course
route.get("/",verifyToken ,getAllUsers)
route.put("/:id",verifyToken ,EditUser)
route.delete("/:id",verifyToken ,deleteUser)



module.exports = route