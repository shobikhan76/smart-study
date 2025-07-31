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

module.exports = router;
