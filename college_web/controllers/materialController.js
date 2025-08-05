const Material = require("../Model/Material");

// Teacher uploads material (PDF)
exports.uploadMaterial = async (req, res) => {
  try {
    const { course, title } = req.body;
    const file = req.file;
    if (!course || !title || !file) {
      return res
        .status(400)
        .json({ message: "Course, title, and PDF file are required." });
    }
    const material = new Material({
      course,
      teacher: req.user.teacherId,
      title,
      fileUrl: `/uploads/materials/${file.filename}`,
    });
    await material.save();
    res.status(201).json({ message: "Material uploaded", material });
  } catch (err) {
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
    const materials = await Material.find({ teacher: req.user.teacherId })
      .populate("course", "title code")
      .sort({ createdAt: -1 });
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
