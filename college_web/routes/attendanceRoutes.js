const express = require("express");
const router = express.Router();
const {
  markAttendance,
  getStudentAttendance,
  getCourseAttendance,
  getAttendancePercentage,
  getMyAttendance,
} = require("../controllers/attendanceController");

const { isAdmin, verifyToken } = require("../middleware/authMiddleware");
const checkRole = require("../Middleware/roleMiddleware");

// ✅ Only teacher or admin can mark attendance
router.post("/", verifyToken, checkRole("admin", "teacher"), markAttendance);

// ✅ Any authenticated user can view student or course attendance
router.get("/student/:studentId", verifyToken, getStudentAttendance);
router.get("/course/:courseId", verifyToken, getCourseAttendance);

// ✅ Attendance percentage
router.get("/percentage/:studentId", verifyToken, getAttendancePercentage);

// ✅ Get attendance for the logged-in user (student/teacher/admin)
router.get("/my", verifyToken, getMyAttendance);

module.exports = router;
