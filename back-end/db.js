const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGOOSE)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

module.exports = mongoose;
