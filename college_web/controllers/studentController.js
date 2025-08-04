const Student = require("../Model/Student");
const User = require("../Model/User");
const bcrypt = require("bcrypt");

const createStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      registrationNumber,
      department,
      semester,
      contact,
      address,
      courses = [],
    } = req.body;

    // Check if user or student already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const existingStudent = await Student.findOne({ registrationNumber });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }

    // Create user
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashPassword,
      role: "student",
    });
    await user.save();

    // Create student
    const student = new Student({
      user: user._id,
      registrationNumber,
      department,
      semester,
      contact,
      address,
      courses,
    });
    await student.save();

    res.status(201).json({ message: "Student created successfully", student });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("user", "name email")
      .populate("courses");
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

const updateStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      name,
      email,
      password,
      registrationNumber,
      department,
      semester,
      contact,
      address,
      courses = [],
    } = req.body;

    const student = await Student.findById(id).populate("user");
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Update user info
    if (student.user) {
      student.user.name = name;
      student.user.email = email;
      if (password) {
        student.user.password = await bcrypt.hash(password, 10);
      }
      await student.user.save();
    }

    // Update student info
    student.registrationNumber = registrationNumber;
    student.department = department;
    student.semester = semester;
    student.contact = contact;
    student.address = address;
    student.courses = courses;
    await student.save();

    res.json({ message: "Student updated successfully", student });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Remove user as well
    await User.findByIdAndDelete(student.user);
    await Student.findByIdAndDelete(id);

    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

const getStudentProfile = async (req, res) => {
  try {
    // Find student by user field, not by _id
    const student = await Student.findOne({ user: req.user.id }).populate(
      "user",
      "name email"
    );
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
  getStudentProfile,
};
