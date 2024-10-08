const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price:{type:String},
    banner:{type:String},
    grade: {
      type: String,
      enum: ["الاول الثانوى", "الثانى الثانوى", "الثالث الثانوى"],
      required: true,
    },
    weeks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Week" }], // Reference to Weeks
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
