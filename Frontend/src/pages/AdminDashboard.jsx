import React, { useEffect, useState } from "react";
import {
  FaBell,
  FaBook,
  FaChalkboardTeacher,
  FaUsers,
  FaClipboardList,
  FaGraduationCap,
  FaChartBar,
  FaChevronDown,
  FaChevronUp,
  FaCheckCircle,
  FaExclamationCircle,
  FaRegStar,
  FaRegFileAlt,
  FaSun,
  FaMoon
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// Import Components
import AdminAnnouncements from "../components/admin/AdminAnnouncements";
import AdminCourses from "../components/admin/AdminCourses";
import AdminApplications from "../components/admin/AdminApplications";
import AdminResults from "../components/admin/AdminResults";
import AdminStudents from "../components/admin/AdminStudents";
import AdminTeachers from "../components/admin/AdminTeachers";
import AdminCoursesOffered from "../components/admin/AdminCoursesOffered";

// Sidebar Navigation with Custom Blue-Teal Theme
const Sidebar = ({ selected, setSelected, darkMode = false }) => {
  const menuItems = [
    { key: "announcements", label: "Announcements", icon: FaBell },
    { key: "courses", label: "Manage Courses", icon: FaBook },
    { key: "teachers", label: "Manage Teachers", icon: FaChalkboardTeacher },
    { key: "students", label: "Manage Students", icon: FaUsers },
    { key: "applications", label: "Admission Applications", icon: FaClipboardList },
    { key: "coursesOffered", label: "Courses Offered", icon: FaGraduationCap },
    { key: "results", label: "Student Results", icon: FaChartBar },
  ];

  return (
    <div className={`w-72 ${darkMode ? "bg-gradient-to-b from-teal-900 to-cyan-950" : "bg-gradient-to-b from-teal-700 to-teal-800"} text-white min-h-screen p-6 flex flex-col gap-2 shadow-xl`}>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full mb-3">
          <FaRegStar className="text-2xl" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent">
          Admin Panel
        </h2>
      </div>

      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => setSelected(item.key)}
              className={`flex items-center gap-3 text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm group ${
                selected === item.key
                  ? "bg-white/30 shadow-lg scale-105 font-semibold transform translate-x-1"
                  : "hover:bg-white/20 hover:scale-102 hover:translate-x-1"
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
                selected === item.key 
                  ? "bg-white text-teal-700" 
                  : "bg-white/20 group-hover:bg-white/30"
              }`}>
                <Icon className="text-lg" />
              </div>
              <span className="flex-1 text-left">{item.label}</span>
              {selected === item.key && (
                <div className="w-2 h-2 bg-white rounded-full"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Quick Stats */}
      <div className={`p-4 rounded-xl backdrop-blur-sm ${darkMode ? "bg-teal-900/50" : "bg-white/20"} border ${darkMode ? "border-teal-800" : "border-teal-600"}`}>
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <FaRegFileAlt /> Quick Stats
        </h4>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span>Students:</span>
            <span className="font-medium">1,248</span>
          </div>
          <div className="flex justify-between">
            <span>Teachers:</span>
            <span className="font-medium">89</span>
          </div>
          <div className="flex justify-between">
            <span>Courses:</span>
            <span className="font-medium">45</span>
          </div>
          <div className="flex justify-between">
            <span>Applications:</span>
            <span className="font-medium">23 pending</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Toast Notification Component
const Toast = ({ message, type, onClose }) => (
  <div
    className={`fixed top-4 right-4 z-50 flex items-center px-6 py-4 rounded-xl shadow-lg text-white font-medium transition-all duration-300 transform ${
      type === "error" ? "bg-red-500" : "bg-green-500"
    }`}
  >
    {type === "error" ? <FaExclamationCircle className="mr-2" /> : <FaCheckCircle className="mr-2" />}
    <span>{message}</span>
    <button onClick={onClose} className="ml-4 text-lg font-bold">&times;</button>
  </div>
);

const AdminDashboard = () => {
  const [selected, setSelected] = useState("announcements");
  const [message, setMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [darkMode, setDarkMode] = useState(false);
  const token = localStorage.getItem("token");

  // State for each module
  const [announcements, setAnnouncements] = useState([]);
  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    content: "",
  });
  const [teachers, setTeachers] = useState([]);
  const [teacherForm, setTeacherForm] = useState({
    name: "",
    email: "",
    password: "",
    designation: "",
    department: "",
    contact: "",
  });
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [students, setStudents] = useState([]);
  const [studentForm, setStudentForm] = useState({
    name: "",
    email: "",
    password: "",
    registrationNumber: "",
    department: "",
    contact: "",
    address: "",
    courses: [],
  });
  const [editingStudent, setEditingStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [courseForm, setCourseForm] = useState({
    title: "",
    code: "",
    department: "",
  });
  const [editingCourse, setEditingCourse] = useState(null);
  const [applications, setApplications] = useState([]);
  const [applicationForm, setApplicationForm] = useState({
    name: "",
    email: "",
    department: "",
    fatherName: "",
    dateOfBirth: "",
    city: "",
    previousSchool: "",
    board: "",
    marks: "",
    passingYear: "",
    status: "pending",
    message: "",
  });
  const [editingApplication, setEditingApplication] = useState(null);
  const [results, setResults] = useState([]);

  // Fetch data based on selected tab
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selected === "announcements") await fetchAnnouncements();
        if (selected === "teachers") await fetchTeachers();
        if (selected === "students") await fetchStudents();
        if (selected === "courses") await fetchCourses();
        if (selected === "applications") await fetchApplications();
        if (selected === "results") await fetchResults();
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchData();
  }, [selected, token]);

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/announcements", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnnouncements(res.data);
    } catch (e) {
      setMessage("Failed to load announcements.");
      setToastType("error");
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/teachers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeachers(res.data);
    } catch (e) {
      setMessage("Failed to fetch teachers.");
      setToastType("error");
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data);
    } catch (e) {
      setMessage("Failed to fetch students.");
      setToastType("error");
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/courses/getCourses",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCourses(res.data);
    } catch (e) {
      setMessage("Failed to fetch courses.");
      setToastType("error");
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/applications/admin/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setApplications(res.data);
    } catch (e) {
      setMessage("Failed to fetch applications.");
      setToastType("error");
    }
  };

  const fetchResults = async () => {
    try {
      // Implement results fetching
      setResults([]);
    } catch (e) {
      setMessage("Failed to fetch results.");
      setToastType("error");
    }
  };

  const handleApplicationUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await axios.put(
        `http://localhost:5000/api/applications/admin/${editingApplication._id}`,
        applicationForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Application updated successfully!");
      setToastType("success");
      setEditingApplication(null);
      setApplicationForm({
        name: "",
        email: "",
        department: "",
        fatherName: "",
        dateOfBirth: "",
        city: "",
        previousSchool: "",
        board: "",
        marks: "",
        passingYear: "",
        status: "pending",
        message: "",
      });
      fetchApplications();
    } catch (error) {
      console.error("Update error:", error);
      setMessage("Failed to update application.");
      setToastType("error");
    }
  };

  // Announcement Handlers
  const handleAnnouncementChange = (e) => {
    setAnnouncementForm({
      ...announcementForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await axios.post(
        "http://localhost:5000/api/announcements",
        announcementForm,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAnnouncementForm({ title: "", content: "" });
      setMessage("Announcement posted successfully!");
      setToastType("success");
      fetchAnnouncements();
    } catch (e) {
      setMessage("Failed to post announcement.");
      setToastType("error");
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    if (!window.confirm("Delete this announcement?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/announcements/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAnnouncements();
      setMessage("Announcement deleted successfully!");
      setToastType("success");
    } catch (e) {
      setMessage("Failed to delete announcement.");
      setToastType("error");
    }
  };

  // Teacher Handlers
  const handleTeacherFormChange = (e) => {
    setTeacherForm({ ...teacherForm, [e.target.name]: e.target.value });
  };

  const handleTeacherSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      let userId = teacherForm.user;
      if (!editingTeacher) {
        const userRes = await axios.post(
          "http://localhost:5000/api/users/admin-create-user",
          {
            name: teacherForm.name,
            email: teacherForm.email,
            password: teacherForm.password,
            role: "teacher",
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        userId = userRes.data.newUser?._id || userRes.data.user?._id;
      }
      if (editingTeacher) {
        await axios.put(
          `http://localhost:5000/api/teachers/${editingTeacher._id}`,
          {
            designation: teacherForm.designation,
            department: teacherForm.department,
            contact: teacherForm.contact,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("Teacher updated successfully!");
        setToastType("success");
      } else {
        await axios.post(
          "http://localhost:5000/api/teachers/create",
          { user: userId, ...teacherForm },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("Teacher created successfully!");
        setToastType("success");
      }
      setTeacherForm({
        name: "",
        email: "",
        password: "",
        designation: "",
        department: "",
        contact: "",
      });
      setEditingTeacher(null);
      fetchTeachers();
    } catch (e) {
      setMessage("Failed to create or update teacher.");
      setToastType("error");
    }
  };

  const handleEditTeacher = (teacher) => {
    setEditingTeacher(teacher);
    setTeacherForm({
      name: teacher.user?.name || "",
      email: teacher.user?.email || "",
      password: "",
      designation: teacher.designation || "",
      department: teacher.department || "",
      contact: teacher.contact || "",
    });
  };

  const handleDeleteTeacher = async (id) => {
    if (!window.confirm("Delete this teacher?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/teachers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTeachers();
      setMessage("Teacher deleted successfully!");
      setToastType("success");
    } catch (e) {
      setMessage("Failed to delete teacher.");
      setToastType("error");
    }
  };

  // Student Handlers
  const handleStudentFormChange = (e) => {
    setStudentForm({ ...studentForm, [e.target.name]: e.target.value });
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    // Client-side validation
    const requiredFields = [
      "name",
      "email",
      "password",
      "registrationNumber",
      "department",
      "contact",
      "address",
    ];
    for (const field of requiredFields) {
      if (!studentForm[field] || studentForm[field].toString().trim() === "") {
        setMessage(`Please fill all required fields (${field}).`);
        setToastType("error");
        return;
      }
    }
    try {
      if (editingStudent) {
        await axios.put(
          `http://localhost:5000/api/students/${editingStudent._id}`,
          studentForm,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("Student updated successfully!");
        setToastType("success");
      } else {
        await axios.post(
          "http://localhost:5000/api/students/create",
          studentForm,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("Student created successfully!");
        setToastType("success");
      }
      setStudentForm({
        name: "",
        email: "",
        password: "",
        registrationNumber: "",
        department: "",
        contact: "",
        address: "",
        courses: [],
      });
      setEditingStudent(null);
      fetchStudents();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message);
        setToastType("error");
      } else {
        setMessage("Failed to create or update student.");
        setToastType("error");
      }
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setStudentForm({
      name: student.user?.name || "",
      email: student.user?.email || "",
      password: "",
      registrationNumber: student.registrationNumber || "",
      department: student.department || "",
      contact: student.contact || "",
      address: student.address || "",
      courses: student.courses || [],
    });
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchStudents();
      setMessage("Student deleted successfully!");
      setToastType("success");
    } catch (e) {
      setMessage("Failed to delete student.");
      setToastType("error");
    }
  };

  // Course Handlers
  const handleCourseChange = (e) => {
    setCourseForm({ ...courseForm, [e.target.name]: e.target.value });
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await axios.post(
        "http://localhost:5000/api/courses/createCourse",
        courseForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCourseForm({ title: "", code: "", department: "" });
      setMessage("Course created successfully!");
      setToastType("success");
      fetchCourses();
    } catch (e) {
      setMessage("Failed to create course.");
      setToastType("error");
    }
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title || "",
      code: course.code || "",
      department: course.department || "",
    });
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCourses();
      setMessage("Course deleted successfully!");
      setToastType("success");
    } catch (e) {
      setMessage("Failed to delete course.");
      setToastType("error");
    }
  };

  // Application Handlers
  const handleEditApplication = (app) => {
    setEditingApplication(app);
    setApplicationForm({
      name: app.name || "",
      email: app.email || "",
      department: app.department || "",
      fatherName: app.fatherName || "",
      dateOfBirth: app.dateOfBirth?.substring(0, 10) || "",
      city: app.city || "",
      previousSchool: app.previousSchool || "",
      board: app.board || "",
      marks: app.marks || "",
      passingYear: app.passingYear || "",
      status: app.status || "pending",
      message: app.message || "",
    });
  };

  const handleApplicationFormChange = (e) => {
    setApplicationForm({ ...applicationForm, [e.target.name]: e.target.value });
  };

  const handleDeleteApplication = async (id) => {
    if (!window.confirm("Delete this application?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/applications/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchApplications();
      setMessage("Application deleted successfully!");
      setToastType("success");
    } catch (e) {
      setMessage("Failed to delete application.");
      setToastType("error");
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-slate-50 to-slate-100"}`}>
      <Sidebar selected={selected} setSelected={setSelected} darkMode={darkMode} />
      
      <div className="flex-1 p-6 md:p-8 overflow-auto">
        <div className={`max-w-6xl mx-auto rounded-2xl shadow-xl overflow-hidden transition-colors duration-300 ${darkMode ? "bg-gray-800" : "bg-white/90 backdrop-blur-sm"}`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-700 to-cyan-800 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                  <FaUsers className="text-2xl" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                  <p className="text-teal-100 mt-1">Manage your university with ease and precision</p>
                </div>
              </div>
              
              <button
                onClick={toggleDarkMode}
                className={`p-3 rounded-xl ${
                  darkMode ? "bg-teal-900/50 text-yellow-300" : "bg-white/20 text-white"
                }`}
              >
                {darkMode ? <FaMoon /> : <FaSun />}
              </button>
            </div>
          </div>

          {/* Message Alert */}
          {message && <Toast message={message} type={toastType} onClose={() => setMessage("")} />}

          {/* Content */}
          <div className="p-8">
            {selected === "announcements" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AdminAnnouncements
                  announcements={announcements}
                  announcementForm={announcementForm}
                  handleAnnouncementChange={handleAnnouncementChange}
                  handleAnnouncementSubmit={handleAnnouncementSubmit}
                  handleDeleteAnnouncement={handleDeleteAnnouncement}
                  darkMode={darkMode}
                />
              </motion.div>
            )}
            
            {selected === "courses" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <>
                  {editingCourse && (
                    <div className={`mb-6 p-6 rounded-xl border transition-colors duration-200 ${
                      darkMode 
                        ? "bg-gray-900/50 border-gray-700" 
                        : "bg-teal-50 border-teal-200"
                    }`}>
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-teal-700 dark:text-teal-400">
                        <FaBook /> Edit Course
                      </h3>
                      <form onSubmit={handleCourseSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Course Title</label>
                          <input
                            type="text"
                            name="title"
                            placeholder="Course Title"
                            value={courseForm.title}
                            onChange={handleCourseChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
                              darkMode 
                                ? "bg-gray-800 border-gray-600 focus:ring-teal-500 text-white" 
                                : "bg-white border-teal-200 focus:ring-teal-300"
                            }`}
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold mb-2">Course Code</label>
                          <input
                            type="text"
                            name="code"
                            placeholder="Course Code"
                            value={courseForm.code}
                            onChange={handleCourseChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
                              darkMode 
                                ? "bg-gray-800 border-gray-600 focus:ring-teal-500 text-white" 
                                : "bg-white border-teal-200 focus:ring-teal-300"
                            }`}
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold mb-2">Department</label>
                          <input
                            type="text"
                            name="department"
                            placeholder="Department"
                            value={courseForm.department}
                            onChange={handleCourseChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
                              darkMode 
                                ? "bg-gray-800 border-gray-600 focus:ring-teal-500 text-white" 
                                : "bg-white border-teal-200 focus:ring-teal-300"
                            }`}
                            required
                          />
                        </div>
                        
                        <div className="flex gap-3 mt-6">
                          <button
                            type="submit"
                            className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center gap-2 shadow"
                          >
                            <FaCheckCircle /> Update Course
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingCourse(null);
                              setCourseForm({
                                title: "",
                                code: "",
                                department: "",
                              });
                            }}
                            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                              darkMode 
                                ? "bg-gray-700 hover:bg-gray-600 text-white" 
                                : "bg-gray-300 hover:bg-gray-400 text-gray-800"
                            }`}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                  <AdminCourses
                    courses={courses}
                    courseForm={courseForm}
                    handleCourseChange={handleCourseChange}
                    handleCourseSubmit={handleCourseSubmit}
                    handleEditCourse={handleEditCourse}
                    handleDeleteCourse={handleDeleteCourse}
                    darkMode={darkMode}
                  />
                </>
              </motion.div>
            )}
            
            {selected === "teachers" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AdminTeachers
                  teachers={teachers}
                  teacherForm={teacherForm}
                  handleTeacherFormChange={handleTeacherFormChange}
                  handleTeacherSubmit={handleTeacherSubmit}
                  handleEditTeacher={handleEditTeacher}
                  handleDeleteTeacher={handleDeleteTeacher}
                  editingTeacher={editingTeacher}
                  setEditingTeacher={setEditingTeacher}
                  setTeacherForm={setTeacherForm}
                  darkMode={darkMode}
                />
              </motion.div>
            )}
            
            {selected === "students" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AdminStudents
                  students={students}
                  studentForm={studentForm}
                  handleStudentFormChange={handleStudentFormChange}
                  handleStudentSubmit={handleStudentSubmit}
                  handleEditStudent={handleEditStudent}
                  handleDeleteStudent={handleDeleteStudent}
                  editingStudent={editingStudent}
                  setEditingStudent={setEditingStudent}
                  darkMode={darkMode}
                />
              </motion.div>
            )}
            
            {selected === "applications" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AdminApplications
                  applications={applications}
                  applicationForm={applicationForm}
                  editingApplication={editingApplication}
                  handleEditApplication={handleEditApplication}
                  handleApplicationFormChange={handleApplicationFormChange}
                  handleDeleteApplication={handleDeleteApplication}
                  darkMode={darkMode}
                  handleApplicationUpdate={handleApplicationUpdate}
                  setEditingApplication={setEditingApplication}
                />
              </motion.div>
            )}
            
            {selected === "results" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AdminResults results={results} darkMode={darkMode} />
              </motion.div>
            )}
            
            {selected === "coursesOffered" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AdminCoursesOffered token={token} darkMode={darkMode} />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;