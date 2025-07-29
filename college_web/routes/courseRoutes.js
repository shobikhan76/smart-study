const express = require('express');
const router = express.Router();
const { createCourse, getAllCourses } = require('../controllers/courseController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// ✅ Only admin can create a course
router.post('/createCourse', verifyToken, isAdmin, createCourse);

// ✅ Any authenticated user can view courses
router.get('/getCourses', verifyToken, getAllCourses);

module.exports = router;
