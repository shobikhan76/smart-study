const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // link to auth user
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true,
  },
  department: String,
  year: String , 
  contactNumber: String,
  address: String,
  dateOfBirth: Date,
  gender: String,
  profileImage: String, // optional: URL to image
}, { timestamps: true });

module.exports = mongoose.model('StudentProfile', studentProfileSchema);
