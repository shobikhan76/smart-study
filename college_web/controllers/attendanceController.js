const Attendance = require("../Model/Attendance");

// ✅ Mark attendance
const markAttendance = async (req, res) => {
  try {
    const { records } = req.body;

    const insertedRecords = [];

    for (const record of records) {
      const { student, course, date, status } = record;

      // Check for existing attendance on same date
      const exists = await Attendance.findOne({ student, course, date });
      if (exists) continue;

      const newRecord = new Attendance({ student, course, date, status });
      await newRecord.save();
      insertedRecords.push(newRecord);
    }

    res
      .status(201)
      .json({
        message: "Attendance marked successfully",
        inserted: insertedRecords,
      });
  } catch (error) {
    console.error("Attendance error:", error);
    res.status(500).json({ message: "Failed to mark attendance", error });
  }
};

// ✅ Get student attendance history
const getStudentAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;
    const records = await Attendance.find({ student: studentId })
      .populate("course", "title code")
      .sort({ date: -1 });

    res.status(200).json(records);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch student attendance", error });
  }
};

// ✅ Get attendance for a course
const getCourseAttendance = async (req, res) => {
  try {
    const { courseId } = req.params;
    const records = await Attendance.find({ course: courseId })
      .populate("student", "registrationNumber")
      .sort({ date: -1 });

    res.status(200).json(records);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch course attendance", error });
  }
};
const getAttendancePercentage = async (req, res) => {
  try {
    const { studentId } = req.params;

    const total = await Attendance.countDocuments({ student: studentId });
    const present = await Attendance.countDocuments({
      student: studentId,
      status: "present",
    });

    const percentage = total === 0 ? 0 : Math.round((present / total) * 100);

    res.status(200).json({
      studentId,

      totalMarked: total,
      presentDays: present,
      attendancePercentage: `${percentage}%`,
    });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Failed to calculate attendance percentage",
        error: err,
      });
  }
};

const getMyAttendance = async (req, res) => {
  try {
    if (req.user.role === "student") {
      // Student: get their own attendance
      const records = await Attendance.find({ student: req.user.studentId })
        .populate("course", "title code")
        .sort({ date: -1 });
      return res.status(200).json(records);
    } else if (req.user.role === "teacher") {
      // Teacher: get attendance for all their assigned courses
      const Teacher = require("../Model/Teacher");
      const teacher = await Teacher.findById(req.user.teacherId).populate(
        "courses"
      );
      if (!teacher)
        return res.status(404).json({ message: "Teacher not found" });
      const courseIds = teacher.courses.map((c) => c._id);
      const records = await Attendance.find({ course: { $in: courseIds } })
        .populate("student", "registrationNumber")
        .populate("course", "title code")
        .sort({ date: -1 });
      return res.status(200).json(records);
    } else if (req.user.role === "admin") {
      // Admin: get all attendance
      const records = await Attendance.find()
        .populate("student", "registrationNumber")
        .populate("course", "title code")
        .sort({ date: -1 });
      return res.status(200).json(records);
    } else {
      return res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch attendance", error });
  }
};

module.exports = {
  markAttendance,
  getStudentAttendance,
  getCourseAttendance,
  getAttendancePercentage,
  getMyAttendance,
};
