const express = require("express")
const route = express.Router()

const {register,login,getprofile,getAllUsers,EditUser,deleteUser} = require("../controllers/userControllers")
const {registerValidation, loginValidation} = require("../utils/authValidation")
const verifyToken = require("../utils/VerifyToken")



route.post("/register",registerValidation,register)
route.post("/login",loginValidation,login)
route.get("/profile",verifyToken ,getprofile)
// route.get("/:id",verifyToken ,getUser)
route.get("/",verifyToken ,getAllUsers)
route.put("/:id",verifyToken ,EditUser)
route.delete("/:id",verifyToken ,deleteUser)



module.exports = route