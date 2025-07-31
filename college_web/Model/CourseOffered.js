const mongoose = require("mongoose");

const courseOfferedSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }],
    semester: { type: Number, min: 1, max: 8, required: true },
    year: { type: Number, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CourseOffered", courseOfferedSchema);
