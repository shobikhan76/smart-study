const Attendance = require('../Model/Attendance');

// ✅ Mark attendance
const markAttendance = async (req, res) => {
  try {
  
    const { student, course, date, status } = req.body;

    const exists = await Attendance.findOne({ student, course, date });
    if (exists) {
      return res.status(400).json({ message: 'Attendance already marked for this student today' });
    }

    const newRecord = new Attendance({ student, course, date, status });
    await newRecord.save();

    res.status(201).json({ message: 'Attendance marked', record: newRecord });
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark attendance', error });
  }
};

// ✅ Get student attendance history
const getStudentAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;
    const records = await Attendance.find({ student: studentId })
      .populate('course', 'title code')
      .sort({ date: -1 });

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch student attendance', error });
  }
};

// ✅ Get attendance for a course
const getCourseAttendance = async (req, res) => {
  try {
    const { courseId } = req.params;
    const records = await Attendance.find({ course: courseId })
      .populate('student', 'registrationNumber')
      .sort({ date: -1 });

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch course attendance', error });
  }
  


};
const getAttendancePercentage = async (req, res) => {
  try {
    const { studentId } = req.params;

    const total = await Attendance.countDocuments({ student: studentId});
    const present = await Attendance.countDocuments({ student: studentId ,  status: 'present' });

    const percentage = total === 0 ? 0 : Math.round((present / total) * 100);

    res.status(200).json({
      studentId,
 
      totalMarked: total,
      presentDays: present,
      attendancePercentage: `${percentage}%`
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to calculate attendance percentage', error: err });
  }
};

module.exports = {
  markAttendance,
  getStudentAttendance,
  getCourseAttendance, 
  getAttendancePercentage
};
