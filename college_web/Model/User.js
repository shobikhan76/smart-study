const mongoose = require('mongoose')


const userScheema = new mongoose.Schema({
    name : {
        type: String , 
        required: true , 
        trim : true 
    } , 
    email : {
         type: String  , 
         unique : true, 
          required: true   , 
          lowercase : true 
    } , 
    password : {
        type: String , 
        required: true  , 
    }, 
    role: {
        type : String , 
        enum : ['student' , 'teacher' , 'admin' , 'applicant']  , 
        default: 'applicant'
    } 
}, {timestamps: true})

module.exports = mongoose.model("User" , userScheema)