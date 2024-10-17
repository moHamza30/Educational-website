const mongoose = require("mongoose");
const { stack } = require("../routes/CoursesRoutes");

// Embedded homework schema within the Lecture

const lectureSchema = new mongoose.Schema(
  {
    title: { type: String },
    video: { type: String },
    homework: {type: mongoose.Schema.Types.ObjectId,ref: "Homework"},
  },
  { timestamps: true },
  stack
);

const Lecture = mongoose.model("Lecture", lectureSchema);
module.exports = Lecture;
