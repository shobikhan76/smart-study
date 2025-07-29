const Assignment = require('../Model/Assignment');
const User = require('../Model/User');

// ➕ Submit Assignment (student only)
const submitAssignment = async (req, res) => {
  try {
    const { course, description, teacher } = req.body;
    const file = req.file;
    console.log(file )

    if (!file) {
      return res.status(400).json({ message: 'PDF file is required' });
    }

    const assignment = new Assignment({
      student: req.user._id,  // From verifyToken middleware
     
      teacher,
      fileUrl: `/uploads/assignments/${file.filename}`,
      description
    });

    await assignment.save();
    res.status(201).json({ message: 'Assignment submitted successfully', assignment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// 📄 Get assignments submitted by a student
const getStudentAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ student: req.user._id }).populate('course teacher');
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// 📄 Get assignments received by a teacher
const getTeacherAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ teacher: req.user._id }).populate('course student');
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// 🗑️ Delete assignment (by ID)
const deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    res.status(200).json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  submitAssignment,
  getStudentAssignments,
  getTeacherAssignments,
  deleteAssignment,
};
