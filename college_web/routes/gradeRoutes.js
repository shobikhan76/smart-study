const express = require("express");
const router = express.Router();
const {
  assignGrade,
  getAllGrades,
  getStudentGrades,
  getMyGrades,
} = require("../controllers/gradeController");

const { verifyToken } = require("../middleware/authMiddleware");
const checkRole = require("../Middleware/roleMiddleware");

// ✅ Only teachers and admins can assign grades
router.post("/", verifyToken, checkRole("teacher", "admin"), assignGrade);

// ✅ Teachers/admins can view all grades
router.get("/", verifyToken, checkRole("teacher", "admin"), getAllGrades);
// ✅ Any authenticated student can view their own grades (by token)
router.get("/student/me", verifyToken, checkRole("student"), getMyGrades);
// ✅ Any authenticated student can view their own grades by ID
router.get("/student/:studentId", verifyToken, getStudentGrades);



module.exports = router;
