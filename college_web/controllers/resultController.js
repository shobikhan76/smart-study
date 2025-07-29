const Result = require('../Model/Result');
const User = require('../Model/User');

// ➕ Create Result
const createResult = async (req, res) => {
  try {
    const {
      student,
      name,
      fatherName,
      rollNumber,
      course,
      department,
      totalMarks,
      obtainedMarks,
    } = req.body;

    const existing = await Result.findOne({ rollNumber });
    if (existing) {
      return res.status(400).json({ message: "Result already exists for this roll number" });
    }

    const total = Number(totalMarks);
    const obtained = Number(obtainedMarks);

    if (isNaN(total) || isNaN(obtained)) {
      return res.status(400).json({ message: "Marks must be numeric" });
    }

    const percentage = ((obtained / total) * 100).toFixed(2);

    // ✅ Auto-generate grade
    let grade = 'F';
    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B';
    else if (percentage >= 60) grade = 'C';
    else if (percentage >= 50) grade = 'D';

    const result = new Result({
      student,
      name,
      fatherName,
      rollNumber,
      course,
      department,
      totalMarks: total,
      obtainedMarks: obtained,
      percentage,
      grade,
    });

    await result.save();
    res.status(201).json({ message: "Result created successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// 📥 Get All Results
const getAllResults = async (req, res) => {
  try {
    const results = await Result.find().populate('student', 'name email');
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📄 Get Result by Roll Number
const getResultByRollNumber = async (req, res) => {
  try {
    const result = await Result.findOne({ rollNumber: req.params.rollNumber });
    if (!result) return res.status(404).json({ message: "Result not found" });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 🗑️ Delete Result by ID
const deleteResult = async (req, res) => {
  try {
    const result = await Result.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Result not found" });
    res.status(200).json({ message: "Result deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  createResult,
  getAllResults,
  getResultByRollNumber,
  deleteResult,
};
