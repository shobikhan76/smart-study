const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
    },
    contact: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
