const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const checkRole = require("../Middleware/roleMiddleware");
const ctrl = require("../controllers/courseOfferedController");

// Only admin can offer courses
router.post(
  "/create",
  verifyToken,
  checkRole("admin"),
  ctrl.createCourseOffered
);
// Get all course offerings
router.get(
  "/",
  verifyToken,
  checkRole("admin", "teacher"),
  ctrl.getAllCoursesOffered
);
// Update (assign students/teachers)
router.put("/:id", verifyToken, checkRole("admin"), ctrl.updateCourseOffered);
// Delete
router.delete(
  "/:id",
  verifyToken,
  checkRole("admin"),
  ctrl.deleteCourseOffered
);
// Add this route for teachers to get their assigned courses
router.get(
  "/my-courses",
  verifyToken,
  checkRole("teacher"),
  ctrl.getMyCoursesOffered
);

// Add this route for students to get their assigned courses
router.get(
  "/my-courses-student",
  verifyToken,
  checkRole("student"),
  ctrl.getMyStudentCoursesOffered
);

// Get students for a specific offered course
router.get(
  "/:id/students",
  verifyToken,
  checkRole("teacher", "admin"),
  async (req, res) => {
    try {
      const CourseOffered = require("../Model/CourseOffered");
      const offered = await CourseOffered.findById(req.params.id).populate({
        path: "students",
        populate: { path: "user", select: "name email" },
      });
      if (!offered)
        return res.status(404).json({ message: "Course offering not found" });
      res.json(offered.students);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err });
    }
  }
);

module.exports = router;
