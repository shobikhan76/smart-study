import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminAnnouncements from "../components/admin/AdminAnnouncements";
import AdminUsers from "../components/admin/AdminUsers";
import AdminCourses from "../components/admin/AdminCourses";
import AdminApplications from "../components/admin/AdminApplications";
import AdminResults from "../components/admin/AdminResults";
import AdminGrades from "../components/admin/AdminGrades";
import AdminStudents from "../components/admin/AdminStudents";

// Sidebar for navigation
const Sidebar = ({ selected, setSelected }) => (
  <div className="w-64 bg-blue-800 text-white min-h-screen p-6 flex flex-col gap-4">
    <h2 className="text-2xl font-bold mb-8">Admin Menu</h2>
    <button
      className={`text-left px-4 py-2 rounded ${
        selected === "announcements" ? "bg-blue-600" : "hover:bg-blue-700"
      }`}
      onClick={() => setSelected("announcements")}
    >
      Announcements
    </button>
    <button
      className={`text-left px-4 py-2 rounded ${
        selected === "users" ? "bg-blue-600" : "hover:bg-blue-700"
      }`}
      onClick={() => setSelected("users")}
    >
      Manage Users
    </button>
    <button
      className={`text-left px-4 py-2 rounded ${
        selected === "courses" ? "bg-blue-600" : "hover:bg-blue-700"
      }`}
      onClick={() => setSelected("courses")}
    >
      Manage Courses
    </button>
    <button
      className={`text-left px-4 py-2 rounded ${
        selected === "applications" ? "bg-blue-600" : "hover:bg-blue-700"
      }`}
      onClick={() => setSelected("applications")}
    >
      Applications
    </button>

    <button
      className={`text-left px-4 py-2 rounded ${
        selected === "grades" ? "bg-blue-600" : "hover:bg-blue-700"
      }`}
      onClick={() => setSelected("grades")}
    >
      Grades
    </button>
    <button
      className={`text-left px-4 py-2 rounded ${
        selected === "students" ? "bg-blue-600" : "hover:bg-blue-700"
      }`}
      onClick={() => setSelected("students")}
    >
      Manage Students
    </button>
  </div>
);

const AdminDashboard = () => {
  const [selected, setSelected] = useState("announcements");
  const [announcements, setAnnouncements] = useState([]);

  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    content: "",
  });
  const [users, setUsers] = useState([]);
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [editingUser, setEditingUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [courseForm, setCourseForm] = useState({
    title: "",
    code: "",
    department: "",
  });
  const [courseAssignForm, setCourseAssignForm] = useState({
    courseId: "",
    students: [],
    teachers: [],
  });
  const [applications, setApplications] = useState([]);
  const [results, setResults] = useState([]);
  const [grades, setGrades] = useState([]);
  const [message, setMessage] = useState("");
  const [editingApplication, setEditingApplication] = useState(null);
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
  // Removed unused editingResult and resultForm state
  const [students, setStudents] = useState([]);
  // Removed unused studentForm and editingStudent state
  const token = localStorage.getItem("token");

  // Fetch data on mount or tab change
  useEffect(() => {
    if (selected === "announcements") fetchAnnouncements();
    if (selected === "users") fetchUsers();
    if (selected === "courses") fetchCourses();
    if (selected === "applications") fetchApplications();
    // eslint-disable-next-line
  }, [selected]);

  // Announcement handlers
  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/announcements", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnnouncements(res.data);
    } catch (e) {
      console.error(e);
    }
  };
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
      setMessage("Announcement posted!");
      fetchAnnouncements();
    } catch {
      setMessage("Failed to post announcement.");
    }
  };
  const handleDeleteAnnouncement = async (id) => {
    if (!window.confirm("Delete this announcement?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/announcements/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAnnouncements();
    } catch (e) {
      console.error(e);
    }
  };

  // User handlers
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (e) {
      setMessage("❌ Failed to fetch users.");
      console.error(e);
    }
  };
  const handleUserFormChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      if (editingUser) {
        // Update user
        await axios.put(
          `http://localhost:5000/api/users/${editingUser._id}`,
          userForm,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessage("User updated successfully!");
      } else {
        // Create user
        await axios.post(
          "http://localhost:5000/api/users/admin-create-user",
          userForm,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessage("User created successfully!");
      }
      // Reset form and reload users
      setUserForm({ name: "", email: "", password: "", role: "student" });
      setEditingUser(null);
      fetchUsers();
    } catch {
      setMessage("❌ Failed to create or update user.");
    }
  };
  const handleEditUser = (user) => {
    setEditingUser(user);
    setUserForm({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });
  };
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (e) {
      console.error(e);
    }
  };

  // Course handlers
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
      console.error(e);
    }
  };
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
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCourseForm({ title: "", code: "", department: "" });
      setMessage("Course created!");
      fetchCourses();
    } catch {
      setMessage("Failed to create course.");
    }
  };
  // Assign students/teachers to course
  const handleCourseAssignChange = (e) => {
    const { name, value, options } = e.target;
    if (options) {
      // Multi-select
      const values = Array.from(options)
        .filter((o) => o.selected)
        .map((o) => o.value);
      setCourseAssignForm({ ...courseAssignForm, [name]: values });
    } else {
      setCourseAssignForm({ ...courseAssignForm, [name]: value });
    }
  };
  const handleAssignToCourse = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await axios.post(
        "http://localhost:5000/api/courses/assign",
        courseAssignForm,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCourseAssignForm({ courseId: "", students: [], teachers: [] });
      setMessage("Assigned successfully!");
      fetchCourses();
      fetchUsers();
    } catch {
      setMessage("Failed to assign.");
    }
  };

  // Application handlers
  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/applications/admin/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setApplications(res.data);
    } catch {
      setMessage("Failed to fetch applications.");
    }
  };
  const handleEditApplication = (app) => {
    setEditingApplication(app);
    setApplicationForm({
      name: app.name || "",
      email: app.email || "",
      department: app.department || "",
      fatherName: app.fatherName || "",
      dateOfBirth: app.dateOfBirth ? app.dateOfBirth.substring(0, 10) : "",
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
  const handleApplicationUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await axios.put(
        `http://localhost:5000/api/applications/admin/${editingApplication._id}`,
        applicationForm,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Application updated!");
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
    } catch {
      setMessage("Failed to update application.");
    }
  };
  const handleDeleteApplication = async (id) => {
    if (!window.confirm("Delete this application?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/applications/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchApplications();
    } catch {
      setMessage("Failed to delete application.");
    }
  };

  // Only keep fetchResults and handleDeleteResult if AdminResults component actually uses them as props

  // Only keep fetchGrades if AdminGrades component actually uses it as a prop

  // Only keep student handlers if AdminStudents component actually uses them as props

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar selected={selected} setSelected={setSelected} />
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold mb-6 text-blue-700">
            Admin Dashboard
          </h1>
          {message && <div className="mb-4 text-green-600">{message}</div>}

          {selected === "announcements" && (
            <AdminAnnouncements
              announcements={announcements}
              announcementForm={announcementForm}
              handleAnnouncementChange={handleAnnouncementChange}
              handleAnnouncementSubmit={handleAnnouncementSubmit}
              handleDeleteAnnouncement={handleDeleteAnnouncement}
            />
          )}
          {selected === "users" && (
            <AdminUsers
              users={users}
              userForm={userForm}
              editingUser={editingUser}
              handleUserFormChange={handleUserFormChange}
              handleUserSubmit={handleUserSubmit}
              handleEditUser={handleEditUser}
              handleDeleteUser={handleDeleteUser}
            />
          )}
          {selected === "courses" && (
            <AdminCourses
              courses={courses}
              courseForm={courseForm}
              courseAssignForm={courseAssignForm}
              users={users}
              handleCourseChange={handleCourseChange}
              handleCourseSubmit={handleCourseSubmit}
              handleCourseAssignChange={handleCourseAssignChange}
              handleAssignToCourse={handleAssignToCourse}
            />
          )}
          {selected === "applications" && (
            <AdminApplications
              applications={applications}
              applicationForm={applicationForm}
              editingApplication={editingApplication}
              handleEditApplication={handleEditApplication}
              handleApplicationFormChange={handleApplicationFormChange}
              handleApplicationUpdate={handleApplicationUpdate}
              handleDeleteApplication={handleDeleteApplication}
            />
          )}
          {selected === "results" && <AdminResults results={results} />}
          {selected === "grades" && <AdminGrades grades={grades} />}
          {selected === "students" && (
            <AdminStudents students={students} courses={courses} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
