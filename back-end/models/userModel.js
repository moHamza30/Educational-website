const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// Define the User schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  grade: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
    required: true,
  },
});

userSchema.pre("save", async function () {
  const user = this;
  if (user.isModified("password")) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  }
});


userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
// Create the User model based on the schema
const User = mongoose.model("Users", userSchema);

module.exports = User;
