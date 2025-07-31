const express = require("express");
const router = express.Router();
const {
  createCourse,
  getAllCourses,
} = require("../controllers/courseController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// ✅ Only admin can create a course
router.post("/createCourse", verifyToken, isAdmin, createCourse);

// ✅ Any authenticated user can view courses
router.get("/getCourses", verifyToken, getAllCourses);

// ✅ Admin can delete a course
router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  require("../controllers/courseController").deleteCourse
);

// ✅ Admin can update a course
router.put(
  "/:id",
  verifyToken,
  isAdmin,
  require("../controllers/courseController").updateCourse
);

module.exports = router;
