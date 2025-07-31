const Course = require("../Model/Course");

const createCourse = async (req, res) => {
  try {
    const { title, code, department, teacher } = req.body;
    console.log("hi");
    const existing = await Course.findOne({ code });
    if (existing)
      return res.status(400).json({ message: "Course already exists" });

    const course = new Course({ title, code, department, teacher });
    await course.save();

    res.status(201).json({ message: "Course created successfully", course });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("teacher", "designation department")
      .sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    await Course.findByIdAndDelete(id);
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, code, department } = req.body;
    const updated = await Course.findByIdAndUpdate(
      id,
      { title, code, department },
      { new: true }
    );
    res.json({ message: "Course updated successfully", course: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  deleteCourse,
  updateCourse,
};
