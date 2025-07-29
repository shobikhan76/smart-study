const Student = require("../Model/Student");
const Teacher = require("../Model/Teacher");
const Course = require("../Model/Course");
const Application = require("../Model/Application");
const Attendance = require("../Model/Attendance");

const getDashboardSummary = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalTeachers = await Teacher.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalApplications = await Application.countDocuments();
    const totalAttendance = await Attendance.countDocuments();

    res.status(200).json({
      totalStudents,
      totalTeachers,
      totalCourses,
      totalApplications,
      totalAttendance,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch dashboard summary", error: err });
  }
};

module.exports = { getDashboardSummary };
