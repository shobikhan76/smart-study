const mongoose = require('mongoose')

const teacherSchema = mongoose.Schema({
    user : 
    {
        ref : 'User' , 
        type : mongoose.Schema.Types.ObjectId, 
        required : true
    }, 
    designation : {
        type : String , 
        required : true 
    } , 

    department : {
           type : String , 
           required : true 
    }, 
    contact : {
       type : String , 
       required : true 
    }
}, {timestamps: true})


module.exports = mongoose.model('Teacher' , teacherSchema)