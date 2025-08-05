const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // student user
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // teacher user
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    dueDate: Date,
    fileUrl: String, // student-uploaded PDF
    replyFileUrl: String, // teacher-uploaded PDF reply
    marks: {
      type: Number,
      min: 0,
      max: 20,
    },
    uploadedBy: {
      type: String,
      enum: ["student", "teacher"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assignment", assignmentSchema);
