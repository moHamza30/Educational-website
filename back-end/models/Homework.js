// models/Homework.js

const mongoose = require('mongoose');

const HomeworkSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  questions: [
    {
      questionText: String,
      options: [
        {
          text: String,
          isCorrect: Boolean,
        },
      ],
    },
  ],
});

const Homework = mongoose.model('Homework', HomeworkSchema);

module.exports = Homework;
