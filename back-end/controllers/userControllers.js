const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");

// const getUsers = async(req,res,next)=>{

// }

const register = async (req, res, next) => {
  const newUser = { ...req.body };

  const userCreated = await User.create(newUser);
  if (!userCreated) {
    return next(new AppError("user did not create", 400));
  }
  res.status(200).send({ data: userCreated });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return next(new AppError("email or password are wrong", 404));
  const isMatch = await user.comparePassword(password);
  if (!isMatch) return next(new AppError("email or password are wrong", 404));
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.status(200).send({
    user,
    token,
  });
};
const getAllUsers = async (req, res, next) => {
  const users = await User.find({});
  if (!users) return next(new AppError("users not found", 404));
  res.status(200).json(users);
};
// const getUser = async (req, res, next) => {
//   const userId = req.params.id;
//   const user = await User.findById(userId);

//   if (!user) {
//     return next(new AppError("User not found.", 404));
//   }
//   res.status(200).json({ data: user });
// };
const getprofile = async (req, res, next) => {
  const { user } = req;
  res.status(200).send({ data: user });
};

const EditUser = async (req, res, next) => {
  const { id } = req.params;
  const updates = { ...req.body };
  const EditedUser = await User.findByIdAndUpdate(id, updates, { new: true });
  if (!EditedUser) return next(new AppError("user not found", 404));
  res.status(200).json({ data: EditedUser });
};
const deleteUser = async (req, res, next) => {
  const {id} = req.params;
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    return next(new AppError("user not found", 404));
  }
  res.status(200).json({
    message: "User deleted successfully",
  });
};

module.exports = {
  login,
  register,
  getprofile,
  getAllUsers,
  EditUser,
  deleteUser,
};
