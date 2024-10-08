const Lecture = require("../models/lectureModel");
const Week = require("../models/WeekModel");
const AppError = require("../utils/AppError");

const addlectureToWeek = async (req, res, next) => {
  const { weekId } = req.params;
  const { title, videoUrl, homework } = req.body;

  // Create new lecture
  const newLecture = new Lecture({
    title,
    videoUrl,
    homework,
  });

  await newLecture.save();
  if (!newLecture) return next(new AppError("Error adding lecture", 400));

  // Add lecture to week
  const week = await Week.findById(weekId);
  if (!week) return next(new AppError("week did not found", 400));

  week.lectures.push(newLecture._id);
  await week.save();
  res.status(201).json(newLecture);
};

const addHomeworkToLecture = async (req, res, next) => {
  const { lectureId } = req.params;
  const { title, questions } = req.body; // Homework data

  // Find the lecture by ID
  const lecture = await Lecture.findById(lectureId);
  if (!lecture) {
    return next(new AppError("Lecture not found", 404));
  }

  // Update the lecture's homework field
  lecture.homework = {
    title,
    questions,
  };

  // Save the updated lecture
  await lecture.save();
  if (!lecture) return next(new AppError("adding lecture error", 400));
  res.status(200).json({ message: "Homework added successfully", lecture });
};
module.exports = {
  addlectureToWeek,
  addHomeworkToLecture,
};
