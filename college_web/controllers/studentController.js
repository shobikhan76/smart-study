const Student = require("../Model/Student");

const createStudent = async (req, res) => {
  console.log("Creaing user");
  try {


    const { user, registrationNumber, department, semester, contact } = req.body;

    const existing = await Student.findOne({ registrationNumber });
    if (existing)
      return res.status(400).json({ message: "Student already exists" });

    const student = new Student({
      user,
      registrationNumber,
      department,
      semester,
      contact,
      address
    });

    await student.save();
    res.status(201).json({ message: "Student created successfully", student });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate("user", "name email");
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
};
