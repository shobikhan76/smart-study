const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    title: { type: String, required: true },
    fileUrl: { type: String, required: true }, // PDF file path
  },
  { timestamps: true }
);

module.exports = mongoose.model("Material", materialSchema);
