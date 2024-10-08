// models/UserHomeworkResult.js
const mongoose = require('mongoose');

const UserHomeworkResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  homeworkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Homework',
    required: true,
  },
  answers: [
    {
      questionId: mongoose.Schema.Types.ObjectId, // Reference to question within Homework
      selectedOption: Number, // Index of the selected option
      isCorrect: Boolean, // Whether the selected option is correct
    },
  ],
  score: {
    type: Number,
    required: true,
  },
  maxScore: {
    type: Number,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const UserHomeworkResult = mongoose.model('UserHomeworkResult', UserHomeworkResultSchema);
module.exports = UserHomeworkResult;
