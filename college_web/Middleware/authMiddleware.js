const jwt = require("jsonwebtoken");
const User = require("../Model/User");
const Teacher = require("../Model/Teacher");
const Student = require("../Model/Student"); 

// Middleware: Verify JWT and attach user info to request
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user info to request
    req.user = {
      id: user._id,
      role: user.role,
      email: user.email,
    };

    // Add role-specific reference IDs
    if (user.role === "teacher") {
      const teacher = await Teacher.findOne({ user: user._id });
      if (teacher) req.user.teacherId = teacher._id;
    } else if (user.role === "student") {
      const student = await Student.findOne({ user: user._id });
      if (student) req.user.studentId = student._id;
    }

    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Middleware: Allow only Admin
const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admin only" });
  }
  next();
};

// Middleware: Allow only Teacher
const isTeacher = (req, res, next) => {
  if (req.user?.role !== "teacher") {
    return res.status(403).json({ message: "Access denied: Teacher only" });
  }
  next();
};

// Middleware: Allow only Student
const isStudent = (req, res, next) => {
  if (req.user?.role !== "student") {
    return res.status(403).json({ message: "Access denied: Student only" });
  }
  next();
};

module.exports = {
  verifyToken,
  isAdmin,
  isTeacher,
  isStudent,
};
