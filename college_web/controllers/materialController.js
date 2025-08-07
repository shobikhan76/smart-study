const Material = require("../Model/Material");
const mongoose = require("mongoose");

// Teacher uploads material (PDF)
exports.uploadMaterial = async (req, res) => {
  try {
    // Accept both 'course' and 'courseId' for compatibility
    const course = req.body.course || req.body.courseId;
    const { title } = req.body;
    const file = req.file;
    const teacherId = req.user.teacherId || req.user._id;

    // Debug: log received fields
    // console.log("UploadMaterial received:", { course, title, file, teacherId });

    if (!course || !title || !file) {
      return res
        .status(400)
        .json({ message: "Course, title, and PDF file are required." });
    }
    if (!teacherId) {
      return res
        .status(400)
        .json({ message: "Teacher ID not found in token." });
    }
    if (!mongoose.Types.ObjectId.isValid(course)) {
      return res.status(400).json({ message: "Invalid course ID." });
    }
    const material = new Material({
      course,
      teacher: teacherId,
      title,
      fileUrl: `/uploads/materials/${file.filename}`,
    });
    await material.save();
    res.status(201).json({ message: "Material uploaded", material });
  } catch (err) {
    console.error("Material upload error:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Get materials for a course (for students)
exports.getCourseMaterials = async (req, res) => {
  try {
    const { courseId } = req.params;
    const materials = await Material.find({ course: courseId })
      .populate("teacher", "user")
      .sort({ createdAt: -1 });
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Get materials uploaded by the logged-in teacher
exports.getTeacherMaterials = async (req, res) => {
  try {
    const teacherId = req.user.teacherId || req.user._id;
    const materials = await Material.find({ teacher: teacherId })
      .populate("course", "title code department") // ensure title is populated
      .sort({ createdAt: -1 });
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
