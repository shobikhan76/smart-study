const express = require('express');
const router = express.Router();
const {
  assignGrade,
  getAllGrades,
  getStudentGrades
} = require('../controllers/gradeController');

const { verifyToken } = require('../middleware/authMiddleware');
const checkRole = require('../Middleware/roleMiddleware');

// ✅ Only teachers and admins can assign grades
router.post('/', verifyToken, checkRole('teacher', 'admin'), assignGrade);

// ✅ Teachers/admins can view all grades
router.get('/', verifyToken, checkRole('teacher', 'admin'), getAllGrades);

// ✅ Any authenticated student can view their own grades
router.get('/student/:studentId', verifyToken, getStudentGrades);

module.exports = router;
