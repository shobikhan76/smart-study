const express = require('express');
const router = express.Router();

const {
  createTeacher,
  getAllTeacher
} = require('../controllers/teacherController');

const { verifyToken } = require('../middleware/authMiddleware');
const checkRole = require('../Middleware/roleMiddleware');

// ✅ Only admins can create teachers
router.post('/create', verifyToken, checkRole('admin'), createTeacher);

// ✅ Admins and teachers can view teacher list
router.get('/', verifyToken, checkRole('admin', 'teacher'), getAllTeacher);

module.exports = router;
