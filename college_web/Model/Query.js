const mongoose = require("mongoose");

const querySchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    question: { type: String, required: true },
    reply: { type: String },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }, // optional, for reply
  },
  { timestamps: true }
);

module.exports = mongoose.model("Query", querySchema);
