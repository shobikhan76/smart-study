const Query = require("../Model/Query");

// Student posts a query
exports.postQuery = async (req, res) => {
  try {
    const { course, question } = req.body;
    const studentId = req.user.studentId;
    if (!course || !question)
      return res.status(400).json({ message: "Course and question required" });

    const query = new Query({ student: studentId, course, question });
    await query.save();
    res.status(201).json(query);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Teacher replies to a query
exports.replyQuery = async (req, res) => {
  try {
    const { reply } = req.body;
    const teacherId = req.user.teacherId;
    const query = await Query.findById(req.params.id);
    if (!query) return res.status(404).json({ message: "Query not found" });

    query.reply = reply;
    query.teacher = teacherId;
    await query.save();
    res.json(query);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Get queries for a student
exports.getStudentQueries = async (req, res) => {
  try {
    const queries = await Query.find({ student: req.user.studentId })
      .populate("course", "title")
      .populate("teacher", "user")
      .sort({ createdAt: -1 });
    res.json(queries);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Get queries for a teacher (all queries for their courses)
exports.getTeacherQueries = async (req, res) => {
  try {
    const Teacher = require("../Model/Teacher");
    const teacher = await Teacher.findById(req.user.teacherId).populate(
      "courses"
    );
    const courseIds = teacher.courses.map((c) => c._id);
    const queries = await Query.find({ course: { $in: courseIds } })
      .populate("student", "user")
      .populate("course", "title")
      .sort({ createdAt: -1 });
    res.json(queries);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
