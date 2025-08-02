import React, { useEffect, useState } from "react";
import { FaBell, FaBook, FaChalkboardTeacher, FaUsers, FaClipboardList, FaGraduationCap, FaChartBar } from "react-icons/fa";
import axios from "axios";

// Import Components
import AdminAnnouncements from "../components/admin/AdminAnnouncements";
import AdminCourses from "../components/admin/AdminCourses";
import AdminApplications from "../components/admin/AdminApplications";
import AdminResults from "../components/admin/AdminResults";
import AdminStudents from "../components/admin/AdminStudents";
import AdminTeachers from "../components/admin/AdminTeachers";
import AdminCoursesOffered from "../components/admin/AdminCoursesOffered";
// import Navbar from "../components/Navbar";

// Sidebar Navigation
const Sidebar = ({ selected, setSelected }) => (
  <div className="w-64 bg-gradient-to-b from-red-800 to-red-950 text-white min-h-screen p-6 flex flex-col gap-2 shadow-xl
">
    <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r text-white  bg-clip-text text-transparent">
      Admin Panel
    </h2>

    {[
      { key: "announcements", label: "Announcements", icon: FaBell },
      { key: "courses", label: "Manage Courses", icon: FaBook },
      { key: "teachers", label: "Manage Teachers", icon: FaChalkboardTeacher },
      { key: "students", label: "Manage Students", icon: FaUsers },
      { key: "applications", label: "Admission Applications", icon: FaClipboardList },
      { key: "coursesOffered", label: "Courses Offered", icon: FaGraduationCap },
      // { key: "results", label: "Student Results", icon: FaChartBar },
    ].map((item) => {
      const Icon = item.icon;
      return (
        <button
          key={item.key}
          onClick={() => setSelected(item.key)}
          className={`flex items-center gap-3 text-left px-4 py-3 rounded-lg transition-all duration-200 font-medium text-sm ${
            selected === item.key
              ? "bg-white/30 shadow-inner scale-105 font-semibold"
              : "hover:bg-white/20 hover:scale-102"
          }`}
        >
          <Icon className="text-lg" />
          <span>{item.label}</span>
        </button>
      );
    })}
  </div>
);

const AdminDashboard = () => {
  const [selected, setSelected] = useState("announcements");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  // State for each module
  const [announcements, setAnnouncements] = useState([]);
  const [announcementForm, setAnnouncementForm] = useState({ title: "", content: "" });

  const [teachers, setTeachers] = useState([]);
  const [teacherForm, setTeacherForm] = useState({
    name: "", email: "", password: "", designation: "", department: "", contact: ""
  });
  const [editingTeacher, setEditingTeacher] = useState(null);

  const [students, setStudents] = useState([]);
  const [studentForm, setStudentForm] = useState({
    name: "", email: "", password: "", registrationNumber: "", department: "", semester: "",
    contact: "", address: "", courses: []
  });
  const [editingStudent, setEditingStudent] = useState(null);

  const [courses, setCourses] = useState([]);
  const [courseForm, setCourseForm] = useState({ title: "", code: "", department: "" });
  const [editingCourse, setEditingCourse] = useState(null);

  const [applications, setApplications] = useState([]);
  const [applicationForm, setApplicationForm] = useState({
    name: "", email: "", department: "", fatherName: "", dateOfBirth: "", city: "",
    previousSchool: "", board: "", marks: "", passingYear: "", status: "pending", message: ""
  });
  const [editingApplication, setEditingApplication] = useState(null);

  // Fetch data based on selected tab
  useEffect(() => {
    if (selected === "announcements") fetchAnnouncements();
    if (selected === "teachers") fetchTeachers();
    if (selected === "students") fetchStudents();
    if (selected === "courses") fetchCourses();
    if (selected === "applications") fetchApplications();
  }, [selected]);

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/announcements", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnnouncements(res.data);
    } catch (e) {
      setMessage("Failed to load announcements.");
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/teachers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeachers(res.data);
    } catch {
      setMessage("Failed to fetch teachers.");
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data);
    } catch {
      setMessage("Failed to fetch students.");
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/courses/getCourses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(res.data);
    } catch {
      setMessage("Failed to fetch courses.");
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/applications/admin/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(res.data);
    } catch {
      setMessage("Failed to fetch applications.");
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
    setMessage("✅ Application updated successfully!");
    setEditingApplication(null);
    setApplicationForm({
      name: "", email: "", department: "", fatherName: "", dateOfBirth: "",
      city: "", previousSchool: "", board: "", marks: "", passingYear: "",
      status: "pending", message: ""
    });
    fetchApplications(); // Refresh list
  } catch (error) {
    console.error("Update error:", error);
    setMessage("❌ Failed to update application.");
  }
};

  // Announcement Handlers
  const handleAnnouncementChange = (e) => {
    setAnnouncementForm({ ...announcementForm, [e.target.name]: e.target.value });
  };

  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await axios.post("http://localhost:5000/api/announcements", announcementForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnnouncementForm({ title: "", content: "" });
      setMessage("✅ Announcement posted!");
      fetchAnnouncements();
    } catch {
      setMessage("❌ Failed to post announcement.");
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    if (!window.confirm("Delete this announcement?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/announcements/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAnnouncements();
    } catch {
      setMessage("❌ Failed to delete announcement.");
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
        setMessage("✅ Teacher updated!");
      } else {
        await axios.post(
          "http://localhost:5000/api/teachers/create",
          { user: userId, ...teacherForm },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("✅ Teacher created!");
      }

      setTeacherForm({
        name: "", email: "", password: "", designation: "", department: "", contact: ""
      });
      setEditingTeacher(null);
      fetchTeachers();
    } catch {
      setMessage("❌ Failed to create or update teacher.");
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
    } catch {
      setMessage("❌ Failed to delete teacher.");
    }
  };

  // Student Handlers
  const handleStudentFormChange = (e) => {
    setStudentForm({ ...studentForm, [e.target.name]: e.target.value });
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      if (editingStudent) {
        await axios.put(
          `http://localhost:5000/api/students/${editingStudent._id}`,
          studentForm,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("✅ Student updated!");
      } else {
        await axios.post(
          "http://localhost:5000/api/students/create",
          studentForm,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("✅ Student created!");
      }

      setStudentForm({
        name: "", email: "", password: "", registrationNumber: "", department: "", semester: "",
        contact: "", address: "", courses: []
      });
      setEditingStudent(null);
      fetchStudents();
    } catch {
      setMessage("❌ Failed to create or update student.");
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
      semester: student.semester || "",
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
    } catch {
      setMessage("❌ Failed to delete student.");
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
      setMessage("✅ Course created!");
      fetchCourses();
    } catch {
      setMessage("❌ Failed to create course.");
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
    } catch {
      setMessage("❌ Failed to delete course.");
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
    } catch {
      setMessage("❌ Failed to delete application.");
    }
  };

  return (
    <>
    {/* <Navbar /> */}
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Sidebar selected={selected} setSelected={setSelected} />

      <div className="flex-1 p-6 md:p-8">
        <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-800 to-red-600 text-white p-6">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <FaUsers />
              Admin Dashboard
            </h1>
            <p className="text-blue-100 mt-1">Manage your university with ease and precision</p>
          </div>

          {/* Message Alert */}
          {message && (
            <div
              className={`p-4 text-center text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                message.startsWith("✅")
                  ? "bg-green-50 text-green-700 border-b border-green-100"
                  : "bg-red-50 text-red-700 border-b border-red-100"
              }`}
            >
              {message.startsWith("✅") ? (
                <span className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</span>
              ) : (
                <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">!</span>
              )}
              {message.replace("✅", "").replace("❌", "").trim()}
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            {selected === "announcements" && (
              <AdminAnnouncements
                announcements={announcements}
                announcementForm={announcementForm}
                handleAnnouncementChange={handleAnnouncementChange}
                handleAnnouncementSubmit={handleAnnouncementSubmit}
                handleDeleteAnnouncement={handleDeleteAnnouncement}
                message={message}
              />
            )}

            {selected === "courses" && (
              <>
                {editingCourse && (
                  <div className="mb-6 bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <h3 className="font-bold text-lg mb-4 text-blue-800 flex items-center gap-2">
                      <FaBook /> Edit Course
                    </h3>
                    <form onSubmit={handleCourseSubmit} className="space-y-4">
                      <input
                        type="text"
                        name="title"
                        placeholder="Course Title"
                        value={courseForm.title}
                        onChange={handleCourseChange}
                        className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none bg-white"
                        required
                      />
                      <input
                        type="text"
                        name="code"
                        placeholder="Course Code"
                        value={courseForm.code}
                        onChange={handleCourseChange}
                        className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none bg-white"
                        required
                      />
                      <input
                        type="text"
                        name="department"
                        placeholder="Department"
                        value={courseForm.department}
                        onChange={handleCourseChange}
                        className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none bg-white"
                        required
                      />
                      <div className="flex gap-3 mt-4">
                        <button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
                        >
                          Update Course
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCourse(null);
                            setCourseForm({ title: "", code: "", department: "" });
                          }}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-medium transition"
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
                  message={message}
                />
              </>
            )}

            {selected === "teachers" && (
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
                message={message}
              />
            )}

            {selected === "students" && (
              <AdminStudents
                students={students}
                studentForm={studentForm}
                handleStudentFormChange={handleStudentFormChange}
                handleStudentSubmit={handleStudentSubmit}
                handleEditStudent={handleEditStudent}
                handleDeleteStudent={handleDeleteStudent}
                editingStudent={editingStudent}
                setEditingStudent={setEditingStudent}
                message={message}
              />
            )}

            {selected === "applications" && (
              <AdminApplications
                applications={applications}
                applicationForm={applicationForm}
                editingApplication={editingApplication}
                handleEditApplication={handleEditApplication}
                handleApplicationFormChange={handleApplicationFormChange}
                handleDeleteApplication={handleDeleteApplication}
                message={message}
                    handleApplicationUpdate={handleApplicationUpdate}  // ✅ Add this
                     setEditingApplication={setEditingApplication}  
              />
            )}

            {selected === "results" && <AdminResults results={results} message={message} />}
            {selected === "coursesOffered" && <AdminCoursesOffered token={token} />}
          </div>
        </div>
      </div>
    </div>
</>  );
};

export default AdminDashboard;