


const express = require('express');

const router = express.Router();

const {addlectureToWeek,addHomeworkToLecture} = require("../controllers/WeekControllers")



// Add a lecture to a week
router.post('/:weekId/lectures', addlectureToWeek);

router.post('/lectures/:lectureId/homework',addHomeworkToLecture)
module.exports = router;
