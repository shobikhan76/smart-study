const CourseOffered = require("../Model/CourseOffered");

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
        select: "title code",
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
