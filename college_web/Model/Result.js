const mongoose = require('mongoose');


const resultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    department : {
        type: String,
        required: true,
    } , 
    fatherName: {
        type: String,
        required: true,
    } , 
    rollNumber: {
      type: String,
      required: true,
      unique: true,
    },
    course: {
      type: String,
      required: true,
    },
  
    

    totalMarks: {
      type: Number,
      required: true,
    },
    obtainedMarks: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number
     },
    
    grade: {
      type: String,
      required: true,
    }

   
  },
  { timestamps: true }
);

module.exports = mongoose.model('Result', resultSchema);
