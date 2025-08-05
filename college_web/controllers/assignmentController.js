const Assignment = require("../Model/Assignment");
const User = require("../Model/User");

// Student or Teacher uploads assignment
const uploadAssignment = async (req, res) => {
  try {
    const { course, title, description, dueDate } = req.body;
    const file = req.file;
    let uploadedBy, teacherId, studentId;

    // Validate required fields
    if (!course || !title || !file) {
      return res
        .status(400)
        .json({ message: "Course, title, and PDF file are required." });
    }

    if (req.user.role === "student") {
      uploadedBy = "student";
      studentId = req.user.id;
    } else if (req.user.role === "teacher") {
      uploadedBy = "teacher";
      teacherId = req.user.id;
    } else {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const assignment = new Assignment({
      course,
      title,
      description,
      dueDate,
      fileUrl: file ? `/uploads/assignments/${file.filename}` : undefined,
      uploadedBy,
      student: studentId,
      teacher: teacherId,
    });

    await assignment.save();
    res
      .status(201)
      .json({ message: "Assignment uploaded successfully", assignment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 📄 Get assignments submitted by a student
const getStudentAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({
      student: req.user._id,
    }).populate("course teacher");
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📄 Get assignments received by a teacher
const getTeacherAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({
      teacher: req.user._id,
    }).populate("course student");
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get assignments for a course
const getCourseAssignments = async (req, res) => {
  try {
    const { courseId } = req.params;
    const assignments = await Assignment.find({ course: courseId })
      .populate("student", "name email")
      .populate("teacher", "name email");
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 🗑️ Delete assignment (by ID)
const deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });
    res.status(200).json({ message: "Assignment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Teacher marks assignment and optionally uploads reply PDF
const markAssignment = async (req, res) => {
  try {
    const { marks } = req.body;
    const file = req.file;
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });

    assignment.marks = marks;
    if (file) assignment.replyFileUrl = `/uploads/assignments/${file.filename}`;
    await assignment.save();
    res.status(200).json({ message: "Assignment marked", assignment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  uploadAssignment,
  getStudentAssignments,
  getTeacherAssignments,
  getCourseAssignments,
  deleteAssignment,
  markAssignment,
};
