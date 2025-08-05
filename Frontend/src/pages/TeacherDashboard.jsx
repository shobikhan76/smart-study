import React, { useEffect, useState } from "react";
import axios from "axios";

// Import Components
import TeacherCourses from "../components/teacher/TeacherCourses";
import TeacherAttendance from "../components/teacher/TeacherAttendance";
import TeacherGrades from "../components/teacher/TeacherGrades";
import TeacherMaterials from "../components/teacher/TeacherMaterials";
import TeacherAnnouncements from "../components/teacher/TeacherAnnouncements";
import TeacherProfiles from "../components/teacher/TeacherProfiles";
import TeacherAssignments from "../components/teacher/TeacherAssignments";
import TeacherQueries from "../components/teacher/TeacherQueries";

// Icons (use react-icons or inline SVGs)
import {
  FaUser,
  FaBook,
  FaCalendarCheck,
  FaGraduationCap,
  FaFileAlt,
  FaBullhorn,
  FaTasks,
  FaComments,
  FaSun,
  FaMoon,
} from "react-icons/fa";

// Toast Notification Component
const Toast = ({ message, type, onClose }) => (
  <div
    className={`fixed top-4 right-4 z-50 flex items-center px-6 py-3 rounded-lg shadow-lg text-white font-medium transition-all duration-300 transform ${
      type === "error" ? "bg-red-500" : "bg-green-500"
    }`}
  >
    {type === "error" ? "❌" : "✅"} <span className="ml-2">{message}</span>
    <button onClick={onClose} className="ml-4 text-lg font-bold">&times;</button>
  </div>
);

// Sidebar with Icons and Hover Effects
const Sidebar = ({ selected, setSelected, darkMode, toggleDarkMode }) => {
  const menuItems = [
    { name: "profile", label: "Profile", icon: FaUser },
    { name: "courses", label: "Courses", icon: FaBook },
    { name: "attendance", label: "Attendance", icon: FaCalendarCheck },
    { name: "grades", label: "Grades", icon: FaGraduationCap },
    { name: "materials", label: "Learning Materials", icon: FaFileAlt },
    { name: "announcements", label: "Announcements", icon: FaBullhorn },
    { name: "assignments", label: "Assignments", icon: FaTasks },
    { name: "queries", label: "Student Queries", icon: FaComments },
  ];

  return (
    <div className={`w-72 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-blue-900 text-white"} min-h-screen p-6 transition-colors duration-300`}>
      <div className="flex items-center mb-10">
        <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
          <FaBook className="text-xl" />
        </div>
        <h2 className="text-2xl font-bold ml-3">Teacher Panel</h2>
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
                  ? darkMode
                    ? "bg-blue-600 text-white"
                    : "bg-blue-700 text-white shadow-md"
                  : darkMode
                  ? "hover:bg-gray-700 text-gray-300"
                  : "hover:bg-blue-800 text-white hover:shadow"
              }`}
            >
              <Icon className="text-lg mr-3" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Dark Mode Toggle */}
      <div className="mt-auto pt-8">
        <button
          onClick={toggleDarkMode}
          className={`flex items-center px-4 py-2 rounded-lg w-full ${
            darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-blue-800 hover:bg-blue-700"
          }`}
        >
          {darkMode ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />}
          <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </div>
    </div>
  );
};

const TeacherDashboard = () => {
  const [selected, setSelected] = useState("courses");
  const [message, setMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [darkMode, setDarkMode] = useState(false);
  const token = localStorage.getItem("token");

  // State for teacher data
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState({});
  const [attendance, setAttendance] = useState({});
  const [grades, setGrades] = useState({});
  const [materials, setMaterials] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [teacherProfile, setTeacherProfile] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [studentQueries, setStudentQueries] = useState([]);
  const [replyForm, setReplyForm] = useState({});

  // Forms
  const [announcementForm, setAnnouncementForm] = useState({ title: "", content: "" });
  const [uploadForm, setUploadForm] = useState({ courseId: "", title: "", file: null });
  const [assignmentForm, setAssignmentForm] = useState({
    course: "",
    title: "",
    description: "",
    dueDate: "",
    pdf: null,
  });

  // Loading states
  const [loading, setLoading] = useState(false);

  // Close toast
  const closeToast = () => setMessage("");

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Fetch data based on selected tab
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (selected === "profile") await fetchTeacherProfile();
        if (selected === "courses") await fetchAssignedCourses();
        if (selected === "attendance") await fetchAttendance();
        if (selected === "grades") await fetchGrades();
        if (selected === "materials") await fetchMaterials();
        if (selected === "announcements") await fetchAnnouncements();
        if (selected === "assignments") await fetchAssignments();
        if (selected === "queries") await fetchStudentQueries();
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchData();
  }, [selected, token]);

  // === API Handlers ===
  const fetchTeacherProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/teachers/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeacherProfile(res.data);
    } catch (e) {
      setMessage("Unable to load profile.");
      setToastType("error");
    }
  };

  const fetchAssignedCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/course-offered/my-courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(res.data);
    } catch (e) {
      setMessage("Unable to load courses.");
      setToastType("error");
    }
  };

  const fetchStudentsInCourse = async (courseId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/course-offered/${courseId}/students`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStudents((prev) => ({ ...prev, [courseId]: res.data }));
    } catch (e) {
      console.error(`Failed to fetch students for course ${courseId}:`, e);
    }
  };

  const fetchAttendance = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/attendance/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAttendance(res.data);
    } catch (e) {
      console.error("Failed to fetch attendance:", e);
    }
  };

  const handleAttendanceSubmit = async (courseId, records) => {
    try {
      await axios.post(
        "http://localhost:5000/api/attendance",
        { courseId, records },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchAttendance();
      setMessage("Attendance marked successfully!");
      setToastType("success");
    } catch (e) {
      setMessage("Failed to mark attendance.");
      setToastType("error");
    }
  };

  const fetchGrades = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/grades/teacher", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGrades(res.data);
    } catch (e) {
      console.error("Failed to fetch grades:", e);
    }
  };

  const allowedGrades = ["A+", "A", "B", "C", "D", "F"];
  const handleGradeSubmit = async (courseId, studentId, assignment, grade, remarks) => {
    if (!grade || !allowedGrades.includes(grade)) {
      setMessage("Please select a valid grade.");
      setToastType("error");
      return;
    }
    try {
      await axios.post(
        "http://localhost:5000/api/grades",
        { student: studentId, course: courseId, grade, remarks },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchGrades();
      setMessage("Grade updated successfully!");
      setToastType("success");
    } catch (e) {
      setMessage(e.response?.data?.message || "Failed to update grade.");
      setToastType("error");
    }
  };

  const fetchMaterials = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/materials/teacher", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMaterials(res.data);
    } catch (e) {
      console.error("Failed to fetch materials:", e);
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("courseId", uploadForm.courseId);
    formData.append("title", uploadForm.title);
    formData.append("file", uploadForm.file);

    try {
      await axios.post("http://localhost:5000/api/materials/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setUploadForm({ courseId: "", title: "", file: null });
      fetchMaterials();
      setMessage("Material uploaded!");
      setToastType("success");
    } catch (e) {
      setMessage("Upload failed.");
      setToastType("error");
    }
  };

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

  const handleAnnouncementChange = (e) => {
    setAnnouncementForm({ ...announcementForm, [e.target.name]: e.target.value });
  };

  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/announcements",
        announcementForm,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAnnouncementForm({ title: "", content: "" });
      fetchAnnouncements();
      setMessage("Announcement posted!");
      setToastType("success");
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
      setMessage("Announcement deleted.");
      setToastType("success");
    } catch (e) {
      setMessage("Delete failed.");
      setToastType("error");
    }
  };

  const fetchAssignments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/assignments/teacher", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssignments(res.data);
    } catch (e) {
      setMessage("Unable to load assignments.");
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
    const formData = new FormData();
    formData.append("course", assignmentForm.course);
    formData.append("title", assignmentForm.title);
    formData.append("description", assignmentForm.description);
    formData.append("dueDate", assignmentForm.dueDate);
    if (assignmentForm.pdf) formData.append("pdf", assignmentForm.pdf);

    try {
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
      setMessage("Assignment posted!");
      setToastType("success");
    } catch (e) {
      setMessage("Failed to post assignment.");
      setToastType("error");
    }
  };

  const fetchStudentQueries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/queries/teacher", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudentQueries(res.data);
    } catch (e) {
      setMessage("Unable to load queries.");
      setToastType("error");
    }
  };

  const handleReplyChange = (queryId, value) => {
    setReplyForm((prev) => ({ ...prev, [queryId]: value }));
  };

  const handleReplySubmit = async (queryId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/queries/${queryId}/reply`,
        { reply: replyForm[queryId] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReplyForm((prev) => ({ ...prev, [queryId]: "" }));
      fetchStudentQueries();
      setMessage("Reply sent!");
      setToastType("success");
    } catch (e) {
      setMessage("Failed to send reply.");
      setToastType("error");
    }
  };

  // === RENDER ===
  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-800"}`}>
      <Sidebar selected={selected} setSelected={setSelected} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className="flex-1 p-6 md:p-8 overflow-auto">
        <div className={`max-w-6xl mx-auto rounded-xl shadow-lg overflow-hidden transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
          {/* Header */}
          <div className={`px-6 py-5 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
            <h1 className="text-3xl font-bold text-blue-600 flex items-center">
              <span>📘</span>
              <span className="ml-2">Teacher Dashboard</span>
            </h1>
            <p className={`mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Manage your courses, students, and academic activities
            </p>
          </div>

          {/* Content */}
          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                <span className="ml-3 text-gray-500">Loading {selected}...</span>
              </div>
            ) : (
              <>
                {message && <Toast message={message} type={toastType} onClose={closeToast} />}

                {selected === "profile" && <TeacherProfiles teacher={teacherProfile} darkMode={darkMode} />}
                {selected === "courses" && (
                  <TeacherCourses courses={courses} students={students} fetchStudentsInCourse={fetchStudentsInCourse} handleGradeSubmit={handleGradeSubmit} darkMode={darkMode} />
                )}
                {selected === "attendance" && (
                  <TeacherAttendance courses={courses} attendance={attendance} students={students} fetchStudentsInCourse={fetchStudentsInCourse} handleAttendanceSubmit={handleAttendanceSubmit} token={token} darkMode={darkMode} />
                )}
                {selected === "grades" && (
                  <TeacherGrades courses={courses} grades={grades} students={students} fetchStudentsInCourse={fetchStudentsInCourse} handleGradeSubmit={handleGradeSubmit} darkMode={darkMode} />
                )}
                {selected === "materials" && (
                  <TeacherMaterials courses={courses} materials={materials} uploadForm={uploadForm} setUploadForm={setUploadForm} handleFileChange={handleFileChange} handleUploadSubmit={handleUploadSubmit} darkMode={darkMode} />
                )}
                {selected === "announcements" && (
                  <TeacherAnnouncements
                    announcements={announcements}
                    announcementForm={announcementForm}
                    handleAnnouncementChange={handleAnnouncementChange}
                    handleAnnouncementSubmit={handleAnnouncementSubmit}
                    handleDeleteAnnouncement={handleDeleteAnnouncement}
                    darkMode={darkMode}
                  />
                )}
                {selected === "assignments" && (
                  <TeacherAssignments
                    assignments={assignments}
                    courses={courses}
                    assignmentForm={assignmentForm}
                    handleAssignmentChange={handleAssignmentChange}
                    handleAssignmentSubmit={handleAssignmentSubmit}
                    handleFileChange={handleFileChange}
                    token={token}
                    fetchAssignments={fetchAssignments}
                    darkMode={darkMode}
                  />
                )}
                {selected === "queries" && (
                  <TeacherQueries
                    queries={studentQueries}
                    replyForm={replyForm}
                    handleReplyChange={handleReplyChange}
                    handleReplySubmit={handleReplySubmit}
                    darkMode={darkMode}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;