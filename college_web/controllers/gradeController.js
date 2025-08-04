const Grade = require("../Model/Grade");

const assignGrade = async (req, res) => {
  try {
    const { student, course, grade, remarks } = req.body;

    // Check for duplicate grade for this student and course
    const exists = await Grade.findOne({ student, course });
    if (exists)
      return res.status(400).json({
        message: "Grade already assigned for this student in this course",
      });

    const newGrade = new Grade({ student, course, grade, remarks });
    await newGrade.save();

    res.status(201).json({ message: "Grade assigned", grade: newGrade });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

const getAllGrades = async (req, res) => {
  try {
    const grades = await Grade.find()
      .populate("student", "registrationNumber")
      .populate("course", "title code");
    res.status(200).json(grades);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

const getStudentGrades = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const grades = await Grade.find({ student: studentId }).populate(
      "course",
      "title code"
    );
    res.status(200).json(grades);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

const getMyGrades = async (req, res) => {
  try {
    console.log(req.user.studentId) || "no user id";
    // Get grades for the logged-in student
    const grades = await Grade.find({ student: req.user.studentId }).populate(
      "course",
      "title code"
    );
    res.status(200).json(grades);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

module.exports = {
  assignGrade,
  getAllGrades,
  getStudentGrades,
  getMyGrades,
};
