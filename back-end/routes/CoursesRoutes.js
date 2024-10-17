const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');


const {addWeektoCourse,
  getAllCourses,
  createCourse,
  editCourse,
  
} = require("../controllers/CoursesControllers")



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the directory for video uploads
    cb(null, 'uploads/videos');
  },
  filename: (req, file, cb) => {
    // Generate a unique name for each uploaded file
    cb(null, `${Date.now()}_${path.basename(file.originalname)}`);
  },
});

// Filter to ensure only video files are uploaded
const fileFilter = (req, file, cb) => {
  // Accept video files only
  if (file.mimetype.startsWith('video')) {
    cb(null, true);
  } else {
    cb(new Error('Only video files are allowed!'), false);
  }
};

// Multer middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // Limit file size to 100MB
});

module.exports = upload;


// Use 'upload.any()' to allow dynamic fields for videos
router.post("/", upload.any(), createCourse);

  

router.put("/:id", upload.any() ,editCourse); 

// get all courses
router.get('/',getAllCourses );

// Add a week to a course
router.post('/:courseId/weeks',addWeektoCourse );



module.exports = router;
