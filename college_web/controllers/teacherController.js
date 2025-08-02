const Teacher = require("../Model/Teacher");

const createTeacher = async (req, res) => {
  try {
    const { user, designation, department, contact } = req.body;
    const existing = await Teacher.findOne({ user });
    if (existing) {
      res.status(400).json({ message: "Teacher already exists" });
    }
    const newTeacher = new Teacher({
      user,
      designation,
      department,
      contact,
    });
    await newTeacher.save();
    res
      .status(200)
      .json({ massege: "Teacher Created Succefully ", newTeacher });
  } catch (error) {
    res.status(500).json({ massege: "server error", error });
  }
};
const getAllTeacher = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate("user", "name email");
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
const getTeacherProfile = async (req, res) => {
  try {
    // Find teacher by user field, not by _id
    const teacher = await Teacher.findOne({ user: req.user.id }).populate(
      "user",
      "name email"
    );
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateTeacher = async (req, res) => {
  try {
    const { designation, department, contact } = req.body;
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    teacher.designation = designation;
    teacher.department = department;
    teacher.contact = contact;
    await teacher.save();
    res.status(200).json({ message: "Teacher updated", teacher });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json({ message: "Teacher deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  getAllTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getTeacherProfile,
};
