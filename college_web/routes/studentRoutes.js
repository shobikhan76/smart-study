const express = require("express");
const router = express.Router();

const {
  createStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
  getStudentProfile,
} = require("../controllers/studentController");

const { verifyToken } = require("../middleware/authMiddleware");
const checkRole = require("../Middleware/roleMiddleware");

// ✅ Only admins can create students
router.post("/create", verifyToken, checkRole("admin"), createStudent);

// ✅ Admins and teachers can view all students
router.get("/", verifyToken, checkRole("admin", "teacher"), getAllStudents);

// ✅ Only admins can update or delete students
router.put("/:id", verifyToken, checkRole("admin"), updateStudent);
router.delete("/:id", verifyToken, checkRole("admin"), deleteStudent);

// Student can get their own profile
router.get("/me", verifyToken, checkRole("student"), getStudentProfile);

module.exports = router;
