// routes/homeworkRoutes.js
const express = require('express');
const { submitHomework } = require('../controllers/homeworkControllers');
const router = express.Router();

router.post('/submit', submitHomework);

module.exports = router;
