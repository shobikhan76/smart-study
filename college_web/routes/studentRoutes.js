const express = require('express');
const router = express.Router();

const {
  createStudent,
  getAllStudents
} = require('../controllers/studentController');

const { verifyToken } = require('../middleware/authMiddleware');
const checkRole = require('../Middleware/roleMiddleware');

// ✅ Only admins can create students
router.post('/create', verifyToken, checkRole('admin'), createStudent);

// ✅ Admins and teachers can view all students
router.get('/', verifyToken, checkRole('admin', 'teacher'), getAllStudents);

module.exports = router;
