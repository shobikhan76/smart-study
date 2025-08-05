const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const cors = require("cors");
app.use(cors());

// Route imports
const teacherRoutes = require("./routes/teacherRoutes");
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");
const applicationController = require("./routes/applicationRoutes");
const announcementController = require("./routes/announcementRoutes");
const gradeController = require("./routes/gradeRoutes");
const resultRoutes = require("./routes/resultRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const teacherController = require("./controllers/teacherController");
const studentController = require("./controllers/studentController");
const queryController = require("./controllers/queryController");
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded assignment files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/users", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/applications", applicationController);
app.use("/api/announcements", announcementController);
app.use("/api/grades", gradeController);
app.use("/api/files", require("./routes/fileRoutes"));
app.use("/api/results", resultRoutes);
app.use("/api/attendance", require("./routes/attendanceRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/assignments", assignmentRoutes); // ✅ New linenp
app.use("/api/student-profiles", require("./routes/studentProfileRoutes"));
app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);
app.use('/api/course-offered', require('./routes/courseOfferedRoutes'));
app.use("/api/queries", require("./routes/queryRoutes"));
// Default route
app.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = app;
