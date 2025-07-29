const express = require('express');
const router = express.Router();
const upload = require('../Middleware/upload');
const {verifyToken , isStudent} = require('../Middleware/authMiddleware');
const {
  submitAssignment,
  getStudentAssignments,
  getTeacherAssignments,
  deleteAssignment,
} = require('../controllers/assignmentController');

// 🧑‍🎓 Student submits assignment
router.post('/', verifyToken, upload.single('pdf'), isStudent , submitAssignment);

// 🧑‍🎓 Student views their assignments
router.get('/student', verifyToken, getStudentAssignments);

// 👨‍🏫 Teacher views received assignments
router.get('/teacher', verifyToken, getTeacherAssignments);

// 🔥 Delete (admin or student cleanup)
router.delete('/:id', verifyToken, deleteAssignment);

module.exports = router;
