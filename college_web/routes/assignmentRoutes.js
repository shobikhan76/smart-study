const express = require("express");
const router = express.Router();
const upload = require("../Middleware/upload");
const { verifyToken } = require("../Middleware/authMiddleware");
const {
  uploadAssignment,
  getCourseAssignments,
  getStudentAssignments,
  getTeacherAssignments,
  deleteAssignment,
  markAssignment,
} = require("../controllers/assignmentController");

// Student or Teacher uploads assignment (PDF optional)
router.post("/", verifyToken, upload.single("pdf"), uploadAssignment);

// Get assignments for a course
router.get("/course/:courseId", verifyToken, getCourseAssignments);

// 🧑‍🎓 Student views their assignments
router.get("/student", verifyToken, getStudentAssignments);

// 👨‍🏫 Teacher views received assignments
router.get("/teacher", verifyToken, getTeacherAssignments);

// Teacher marks assignment and uploads reply PDF (optional)
router.post(
  "/:id/mark",
  verifyToken,
  upload.single("replyPdf"),
  markAssignment
);

// 🔥 Delete (admin or student cleanup)
router.delete("/:id", verifyToken, deleteAssignment);

module.exports = router;
