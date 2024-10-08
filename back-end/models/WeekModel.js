const mongoose = require('mongoose');

const weekSchema = new mongoose.Schema({
  weekNumber: { type: String },
  weekContent:{ type: String },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // Reference to Course
  lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' }] // Reference to Lectures
}, { timestamps: true });

const Week = mongoose.model('Week', weekSchema);
module.exports = Week;
