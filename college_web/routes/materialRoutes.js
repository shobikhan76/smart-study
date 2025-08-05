const express = require("express");
const router = express.Router();
const upload = require("../Middleware/upload");
const { verifyToken } = require("../Middleware/authMiddleware");
const checkRole = require("../Middleware/roleMiddleware");
const ctrl = require("../controllers/materialController");

// Teacher uploads material (PDF)
router.post(
  "/upload",
  verifyToken,
  checkRole("teacher"),

  upload.single("file"),
  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    console.log("Material upload route, file uploaded");
    next();
  },
  ctrl.uploadMaterial
);

// Get materials for a course (student view)
router.get("/course/:courseId", verifyToken, ctrl.getCourseMaterials);

// Get materials uploaded by the logged-in teacher
router.get(
  "/teacher",
  verifyToken,
  checkRole("teacher"),
  ctrl.getTeacherMaterials
);

module.exports = router;
