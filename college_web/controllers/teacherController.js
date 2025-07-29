const Teacher = require('../Model/Teacher')


const createTeacher = async(req , res ) => {
   try {
 const {user , designation , department , contact} = req.body 
     const existing = await Teacher.findOne({user})
     if (existing) {
 res.status(400).json({message: "Teacher already exists"})
     }
     const newTeacher = new Teacher({
        user , 
        designation, 
        department , contact 
     })
     await newTeacher.save()
     res.status(200).json({massege : 'Teacher Created Succefully ' , newTeacher})
    

   }catch(error){
   res.status(500).json({massege: "server error"  , error})
   }

}
const getAllTeacher = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('user', 'name email');
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


module.exports = {
    getAllTeacher , 
    createTeacher
}