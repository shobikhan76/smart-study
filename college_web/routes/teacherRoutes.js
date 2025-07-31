const express = require("express");
const router = express.Router();

const {
  createTeacher,
  getAllTeacher,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teacherController");

const { verifyToken } = require("../middleware/authMiddleware");
const checkRole = require("../Middleware/roleMiddleware");

// ✅ Only admins can create teachers
router.post("/create", verifyToken, checkRole("admin"), createTeacher);

// ✅ Admins and teachers can view teacher list
router.get("/", verifyToken, checkRole("admin", "teacher"), getAllTeacher);

// ✅ Only admins can update or delete teachers
router.put("/:id", verifyToken, checkRole("admin"), updateTeacher);
router.delete("/:id", verifyToken, checkRole("admin"), deleteTeacher);

module.exports = router;
