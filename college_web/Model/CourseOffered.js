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
    department: {
      type: String,
      required: true,
      enum: ["IT", "CIVIL", "MECHANICS", "ELECTRICAL", "OTHER"],
    },
    year: { type: Number, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CourseOffered", courseOfferedSchema);
