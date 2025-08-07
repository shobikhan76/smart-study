import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaBook,
  FaBullhorn,
  FaGraduationCap,
  FaCalendarCheck,
  FaTasks,
  FaClock,
  FaComments,
  FaChevronDown,
  FaChevronUp,
  FaCheckCircle,
  FaExclamationCircle,
  FaRegFilePdf,
  FaUpload,
  FaEye,
  FaRegStar,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Import Components
import StudentCourses from "../components/student/StudentCourses";
import StudentAnnouncements from "../components/student/StudentAnnouncements";
import StudentGrades from "../components/student/StudentGrades";
import StudentTimetable from "../components/student/StudentTimetable";
import StudentQueries from "../components/student/StudentQueries";
import StudentProfiles from "../components/student/StudentProfiles";
import StudentAttendance from "../components/student/StudentAttendance";
import StudentAssignments from "../components/student/StudentAssignments";
import StudentMaterials from "../components/student/StudentMaterials";

// Sidebar with Modern Design
const Sidebar = ({ selected, setSelected, darkMode = false }) => {
  const menuItems = [
    { name: "profile", label: "Profile", icon: FaUser },
    { name: "courses", label: "Courses", icon: FaBook },
    { name: "announcements", label: "Announcements", icon: FaBullhorn },
    { name: "grades", label: "Grades", icon: FaGraduationCap },
    { name: "attendance", label: "Attendance", icon: FaCalendarCheck },
    { name: "assignments", label: "Assignments", icon: FaTasks },
    { name: "materials", label: "Materials", icon: FaRegFilePdf },
    { name: "timetable", label: "Timetable", icon: FaClock },
    { name: "queries", label: "Queries", icon: FaComments },
  ];

  return (
    <div
      className={`w-72 ${
        darkMode
          ? "bg-green-900 text-white"
          : "bg-gradient-to-b from-green-700 to-green-800"
      } min-h-screen p-6 transition-colors duration-300 shadow-xl`}
    >
      <div className="flex items-center mb-10">
        <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
          <FaBook className="text-xl" />
        </div>
        <h2 className="text-2xl font-bold ml-3 text-white">Student Panel</h2>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              onClick={() => setSelected(item.name)}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                selected === item.name
                  ? "bg-white text-green-800 shadow-md transform translate-x-1"
                  : "text-white hover:bg-green-600 hover:shadow hover:translate-x-1"
              }`}
            >
              <Icon className="text-lg mr-3" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Quick Stats */}
      <div className="mt-8 p-4 bg-white bg-opacity-20 rounded-lg">
        <h4 className="text-sm font-semibold text-white mb-2">Quick Stats</h4>
        <div className="text-xs text-green-100">
          <div className="flex justify-between mb-1">
            <span>Courses:</span>
            <span>5</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Assignments:</span>
            <span>3 Pending</span>
          </div>
          <div className="flex justify-between">
            <span>Attendance:</span>
            <span>92%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const StudentDashboard = () => {
  const [selected, setSelected] = useState("courses");
  const [message, setMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [darkMode, setDarkMode] = useState(false);
  const token = localStorage.getItem("token");

  // State
  const [studentProfile, setStudentProfile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [grades, setGrades] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [queries, setQueries] = useState([]);
  const [queryForm, setQueryForm] = useState({ courseId: "", question: "" });
  const [attendance, setAttendance] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [assignmentForm, setAssignmentForm] = useState({
    course: "",
    title: "",
    description: "",
    dueDate: "",
    pdf: null,
  });
  const [materials, setMaterials] = useState([]);

  // Toast Notification Component
  const Toast = ({ message, type, onClose }) => (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center px-6 py-3 rounded-lg shadow-lg text-white font-medium transition-all duration-300 transform ${
        type === "error" ? "bg-red-500" : "bg-green-500"
      }`}
    >
      {type === "error" ? (
        <FaExclamationCircle className="mr-2" />
      ) : (
        <FaCheckCircle className="mr-2" />
      )}
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-lg font-bold">
        &times;
      </button>
    </div>
  );

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selected === "profile") await fetchStudentProfile();
        if (selected === "courses") await fetchCourses();
        if (selected === "announcements") await fetchAnnouncements();
        if (selected === "grades") await fetchGrades();
        if (selected === "attendance") await fetchAttendance();
        if (selected === "assignments") await fetchAssignments();
        if (selected === "timetable") await fetchTimetable();
        if (selected === "queries") await fetchQueries();
        if (selected === "materials") await fetchMaterials();
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchData();
  }, [selected, token, courses]);

  // API Handlers
  const fetchStudentProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudentProfile(res.data);
    } catch (err) {
      setMessage("Unable to load student profile.");
      setToastType("error");
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/course-offered/my-courses-student",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCourses(res.data);
    } catch (err) {
      setMessage("Unable to load your courses.");
      setToastType("error");
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/announcements", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnnouncements(res.data);
    } catch (err) {
      setMessage("Unable to load announcements.");
      setToastType("error");
    }
  };

  const fetchGrades = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/grades/student/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setGrades(res.data);
    } catch (err) {
      setMessage("Unable to load grades.");
      setToastType("error");
    }
  };

  const fetchTimetable = async () => {
    // Implement API if available, else use static data
    setTimetable([]);
  };

  const fetchQueries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/queries/student", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQueries(res.data);
    } catch (err) {
      setMessage("Unable to load queries.");
      setToastType("error");
    }
  };

  const fetchAttendance = async () => {
    if (!studentProfile?._id) return;
    try {
      const res = await axios.get(
        `http://localhost:5000/api/attendance/student/${studentProfile._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAttendance(res.data);
    } catch (err) {
      setAttendance([]);
      setMessage("Unable to load attendance.");
      setToastType("error");
    }
  };

  const fetchAssignments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/assignments/student",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAssignments(res.data);
    } catch (err) {
      setAssignments([]);
      setMessage("Unable to load assignments.");
      setToastType("error");
    }
  };

  const fetchMaterials = async () => {
    try {
      // Fetch for each course and flatten the results
      const allMaterials = [];
      for (const c of courses) {
        const courseId = c.course?._id || c._id;
        if (!courseId) continue;
        const res = await axios.get(
          `http://localhost:5000/api/materials/course/${courseId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // Attach course info for display
        res.data.forEach((m) => {
          m._courseInfo = c.course || c;
        });
        allMaterials.push(...res.data);
      }
      setMaterials(allMaterials);
    } catch (err) {
      setMaterials([]);
      setMessage("Unable to load materials.");
      setToastType("error");
    }
  };

  // Form Handlers
  const handleQueryChange = (e) => {
    setQueryForm({ ...queryForm, [e.target.name]: e.target.value });
  };

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/queries",
        {
          course: queryForm.courseId,
          question: queryForm.question,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setQueryForm({ courseId: "", question: "" });
      fetchQueries();
      setMessage("Query sent successfully!");
      setToastType("success");
    } catch (err) {
      setMessage("Failed to send query.");
      setToastType("error");
    }
  };

  const handleAssignmentChange = (e) => {
    setAssignmentForm({ ...assignmentForm, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setAssignmentForm({ ...assignmentForm, pdf: e.target.files[0] });
  };

  const handleAssignmentSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("course", assignmentForm.course);
      formData.append("title", assignmentForm.title);
      formData.append("description", assignmentForm.description);
      formData.append("dueDate", assignmentForm.dueDate);
      if (assignmentForm.pdf) formData.append("pdf", assignmentForm.pdf);

      await axios.post("http://localhost:5000/api/assignments", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setAssignmentForm({
        course: "",
        title: "",
        description: "",
        dueDate: "",
        pdf: null,
      });
      fetchAssignments();
      setMessage("Assignment submitted successfully!");
      setToastType("success");
    } catch (err) {
      setMessage("Failed to submit assignment.");
      setToastType("error");
    }
  };

  return (
    <div
      className={`flex min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <Sidebar
        selected={selected}
        setSelected={setSelected}
        darkMode={darkMode}
      />

      <div className="flex-1 p-6 md:p-8 overflow-auto">
        <div
          className={`max-w-6xl mx-auto rounded-xl shadow-lg overflow-hidden transition-colors duration-300 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* Header */}
          <div
            className={`px-6 py-5 border-b ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <h1 className="text-3xl font-bold text-green-600 flex items-center">
                  <FaBook className="mr-3" />
                  Student Dashboard
                </h1>
              </div>

              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg ${
                  darkMode
                    ? "bg-gray-700 text-yellow-300"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {darkMode ? <FaRegStar /> : <FaRegStar />}
              </button>
            </div>

            <p
              className={`mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              Manage your academic journey and stay updated
            </p>
          </div>

          {/* Content */}
          <div className="p-6">
            {message && (
              <Toast
                message={message}
                type={toastType}
                onClose={() => setMessage("")}
              />
            )}

            {/* Profile Section */}
            {selected === "profile" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <StudentProfiles student={studentProfile} darkMode={darkMode} />
              </motion.div>
            )}

            {/* Courses */}
            {selected === "courses" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <StudentCourses
                  courses={courses}
                  grades={grades}
                  darkMode={darkMode}
                />
              </motion.div>
            )}

            {/* Announcements */}
            {selected === "announcements" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <StudentAnnouncements
                  announcements={announcements}
                  darkMode={darkMode}
                />
              </motion.div>
            )}

            {/* Grades */}
            {selected === "grades" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <StudentGrades
                  grades={grades}
                  courses={courses}
                  darkMode={darkMode}
                />
              </motion.div>
            )}

            {/* Attendance */}
            {selected === "attendance" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <StudentAttendance
                  token={token}
                  studentId={studentProfile?._id}
                  attendance={attendance}
                  darkMode={darkMode}
                />
              </motion.div>
            )}

            {/* Timetable */}
            {selected === "timetable" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <StudentTimetable
                  timetable={timetable}
                  courses={courses}
                  darkMode={darkMode}
                />
              </motion.div>
            )}

            {/* Queries */}
            {selected === "queries" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <StudentQueries
                  queries={queries}
                  courses={courses}
                  queryForm={queryForm}
                  handleQueryChange={handleQueryChange}
                  handleQuerySubmit={handleQuerySubmit}
                  darkMode={darkMode}
                />
              </motion.div>
            )}

            {/* Assignments */}
            {selected === "assignments" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <StudentAssignments
                  assignments={assignments}
                  courses={courses}
                  assignmentForm={assignmentForm}
                  handleAssignmentChange={handleAssignmentChange}
                  handleAssignmentSubmit={handleAssignmentSubmit}
                  handleFileChange={handleFileChange}
                  darkMode={darkMode}
                />
              </motion.div>
            )}

            {/* Materials */}
            {selected === "materials" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <StudentMaterials materials={materials} darkMode={darkMode} />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
