const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String, required: true },
  fatherName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  city: { type: String, required: true },
  previousSchool: { type: String, required: true },
  board: { type: String, required: true },
  marks: { type: Number, required: true },
  passingYear: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  message: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
