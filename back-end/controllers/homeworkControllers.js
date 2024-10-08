// controllers/homeworkController.js
const Homework = require('../models/Homework');
const UserHomeworkResult = require('../models/UserHomeworkResult');

const submitHomework = async (req, res) => {
  const { homeworkId, userId, answers } = req.body;
    
  try {
    const homework = await Homework.findById(homeworkId);

    if (!homework) {
      return res.status(404).json({ message: 'Homework not found' });
    }

    let score = 0;
    const maxScore = homework.questions.length;
    const userResults = [];

    // Calculate the user's score and store their answers
    homework.questions.forEach((question, index) => {
      const selectedOptionIndex = answers[question._id]; // This maps to the user's selected answer
      const isCorrect = question.options[selectedOptionIndex]?.isCorrect || false;

      if (isCorrect) {
        score += 1;
      }

      userResults.push({
        questionId: question._id,
        selectedOption: selectedOptionIndex,
        isCorrect,
      });
    });

    // Save the user's homework results
    const userHomeworkResult = new UserHomeworkResult({
      userId,
      homeworkId,
      answers: userResults,
      score,
      maxScore,
    });

    await userHomeworkResult.save();

    res.status(201).json({
      message: 'Homework submitted successfully',
      score,
      maxScore,
      result: userHomeworkResult,
    });
  } catch (error) {
    console.error('Error submitting homework:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { submitHomework };
