const CourseOffered = require("../Model/CourseOffered");
const Student = require("../Model/Student");
const Teacher = require("../Model/Teacher");

// Create a new course offering
exports.createCourseOffered = async (req, res) => {
  try {
    const { course, students, teachers, semester, year } = req.body;
    const offered = new CourseOffered({
      course,
      students: students || [],
      teachers: teachers || [],
      semester,
      year,
      createdBy: req.user._id,
    });
    await offered.save();

    // Add CourseOffered reference to each student's offeredCourses
    if (students && students.length > 0) {
      await Student.updateMany(
        { _id: { $in: students } },
        { $addToSet: { offeredCourses: offered._id } }
      );
    }

    // Add CourseOffered reference to each teacher's courses
    if (teachers && teachers.length > 0) {
      await Teacher.updateMany(
        { _id: { $in: teachers } },
        { $addToSet: { courses: offered._id } }
      );
    }

    res.status(201).json(offered);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Get all course offerings
exports.getAllCoursesOffered = async (req, res) => {
  try {
    const list = await CourseOffered.find()
      .populate({
        path: "course",
        select: "title code department",
      })
      .populate({
        path: "students",
        populate: { path: "user", select: "name email" },
      })
      .populate({
        path: "teachers",
        populate: { path: "user", select: "name email" },
      });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Assign students/teachers to an offered course
exports.updateCourseOffered = async (req, res) => {
  try {
    const { id } = req.params;
    const { students, teachers } = req.body;
    const offered = await CourseOffered.findById(id);
    if (!offered) return res.status(404).json({ message: "Not found" });
    if (students) offered.students = students;
    if (teachers) offered.teachers = teachers;
    await offered.save();
    res.json(offered);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Delete a course offering
exports.deleteCourseOffered = async (req, res) => {
  try {
    await CourseOffered.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Get courses offered assigned to the logged-in teacher
exports.getMyCoursesOffered = async (req, res) => {
  try {
    // Find courses where the logged-in teacher is assigned
    const myCourses = await CourseOffered.find({ teachers: req.user.teacherId })
    console.log(req.user.teacherId)
      .populate({
        path: "course",
        select: "title code department",
      })
      .populate({
        path: "students",
        populate: { path: "user", select: "name email" },
      })
      .populate({
        path: "teachers",
        populate: { path: "user", select: "name email" },
      });
    res.json(myCourses);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Get courses offered assigned to the logged-in student
exports.getMyStudentCoursesOffered = async (req, res) => {
  try {
    // Find courses where the logged-in student is assigned
    const myCourses = await CourseOffered.find({ students: req.user.studentId })
      .populate({
        path: "course",
        select: "title code department",
      })
      .populate({
        path: "students",
        populate: { path: "user", select: "name email" },
      })
      .populate({
        path: "teachers",
        populate: { path: "user", select: "name email" },
      });
    res.json(myCourses);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
