const express = require("express");
const router = express.Router();
const {
  createAnnouncement,
  getAllAnnouncements,
} = require("../controllers/announcementController");

const {
  verifyToken,
  isAdmin,
  isTeacher,
} = require("../Middleware/authMiddleware");

// Allow admin and teacher to post announcements
router.post(
  "/",
  verifyToken,
  (req, res, next) => {
    if (req.user.role === "admin" || req.user.role === "teacher") {
      return next();
    }
    return res
      .status(403)
      .json({ message: "Access denied: Admin or Teacher only" });
  },
  createAnnouncement
);

// All authenticated users can view announcements
router.get("/", verifyToken, getAllAnnouncements);

module.exports = router;
