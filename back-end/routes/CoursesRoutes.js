const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');


const {addWeektoCourse,getAllCourses,createCourse,editCourse} = require("../controllers/CoursesControllers")



// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'banner') {
      cb(null, 'uploads/banners/'); // Banner photos go here
    } else if (file.fieldname === 'video') {
      cb(null, 'uploads/videos/'); // Lecture videos go here
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

// Multer middleware for handling multiple file uploads (banner & videos)
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      if (file.fieldname === 'banner') {
        const imageTypes = /jpeg|jpg|png/;
        const extname = imageTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = imageTypes.test(file.mimetype);
  
        if (extname && mimetype) {
          cb(null, true);
        } else {
          cb(new Error('Only images are allowed for banner!'));
        }
      } else if (file.fieldname === 'video') {
        const videoTypes = /mp4|mov|wmv|avi/;
        const extname = videoTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = videoTypes.test(file.mimetype);
  
        if (extname && mimetype) {
          cb(null, true);
        } else {
          cb(new Error('Only video files are allowed for lectures!'));
        }
      }
    }
  }).fields([{ name: 'banner', maxCount: 1 }, { name: 'video', maxCount: 10 }]);
  

router.post("/", upload ,createCourse); // Route to create a new course
router.put("/:id", upload ,editCourse); // Route to create a new course

// router.post('/', upload.array('lectures'), newCourse)
// add course
// router.post('/',addCourse );

// get all courses
router.get('/',getAllCourses );

// Add a week to a course
router.post('/:courseId/weeks',addWeektoCourse );



module.exports = router;
