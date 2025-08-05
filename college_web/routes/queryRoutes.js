const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/queryController");
const { verifyToken } = require("../middleware/authMiddleware");
const checkRole = require("../Middleware/roleMiddleware");

// Student posts a query
router.post("/", verifyToken, checkRole("student"), ctrl.postQuery);
// Student gets their queries
router.get(
  "/student",
  verifyToken,
  checkRole("student"),
  ctrl.getStudentQueries
);

// Teacher replies to a query
router.post("/:id/reply", verifyToken, checkRole("teacher"), ctrl.replyQuery);
// Teacher gets queries for their courses
router.get(
  "/teacher",
  verifyToken,
  checkRole("teacher"),
  ctrl.getTeacherQueries
);

module.exports = router;
