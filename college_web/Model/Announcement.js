const mongoose = require('mongoose')

const announcementScheema = mongoose.Schema({
    title: {
        type: String, 
        required: true 
    }, 
    content: {
        type : String , 
        required : true , 

    }, 
    postedBy: {
       type : mongoose.Schema.Types.ObjectId , 
       ref:"User" , 
       required : true 
    }
})

module.exports = mongoose.model('Announcement' , announcementScheema)