import React, { useEffect, useState } from "react";
import axios from "axios";

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
        selected === "results" ? "bg-blue-600" : "hover:bg-blue-700"
      }`}
      onClick={() => setSelected("results")}
    >
      Results
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
  const [editingResult, setEditingResult] = useState(null);
  const [resultForm, setResultForm] = useState({
    student: "",
    name: "",
    fatherName: "",
    rollNumber: "",
    course: "",
    department: "",
    totalMarks: "",
    obtainedMarks: "",
  });
  const [students, setStudents] = useState([]);
  const [studentForm, setStudentForm] = useState({
    name: "",
    email: "",
    password: "",
    registrationNumber: "",
    department: "",
    semester: "",
    contact: "",
    address: "",
    courses: [],
  });
  const [editingStudent, setEditingStudent] = useState(null);
  const token = localStorage.getItem("token");

  // Fetch data on mount or tab change
  useEffect(() => {
    if (selected === "announcements") fetchAnnouncements();
    if (selected === "users") fetchUsers();
    if (selected === "courses") fetchCourses();
    if (selected === "applications") fetchApplications();
    if (selected === "results") fetchResults();
    if (selected === "grades") fetchGrades();
    if (selected === "students") {
      fetchStudents();
      fetchCourses();
    }
    // eslint-disable-next-line
  }, [selected]);

  // Announcement handlers
  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/announcements", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnnouncements(res.data);
    } catch {}
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
    } catch (err) {
      setMessage("Failed to post announcement.");
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
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessage("❌ Failed to fetch users.");
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
    } catch (err) {
      console.error("Error during create/update:", err);
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
    } catch {}
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
    } catch {}
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
    } catch (err) {
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
    } catch (error) {
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
    } catch (err) {
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

  // Result handlers
  const fetchResults = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/results", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResults(res.data);
    } catch {}
  };

  // Grade handlers
  const fetchGrades = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/grades", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGrades(res.data);
    } catch {}
  };

  // Delete announcement
  const handleDeleteAnnouncement = async (id) => {
    if (!window.confirm("Delete this announcement?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/announcements/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAnnouncements();
    } catch {}
  };

  // Delete course
  // (Assuming you have a delete route for courses)
  // const handleDeleteCourse = async (id) => { ... }

  // Delete user
  // (Assuming you have a delete route for users)
  // const handleDeleteUser = async (id) => { ... }

  // Delete result
  const handleDeleteResult = async (id) => {
    if (!window.confirm("Delete this result?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/results/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchResults();
    } catch {}
  };

  // Delete grade
  // (Assuming you have a delete route for grades)
  // const handleDeleteGrade = async (id) => { ... }

  // Fetch all students
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

  // Student form handlers
  const handleStudentFormChange = (e) => {
    const { name, value, options } = e.target;
    if (name === "courses" && options) {
      const values = Array.from(options)
        .filter((o) => o.selected)
        .map((o) => o.value);
      setStudentForm({ ...studentForm, courses: values });
    } else {
      setStudentForm({ ...studentForm, [name]: value });
    }
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      if (editingStudent) {
        // Update student
        await axios.put(
          `http://localhost:5000/api/students/${editingStudent._id}`,
          studentForm,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("Student updated successfully!");
      } else {
        // Create student
        await axios.post(
          "http://localhost:5000/api/students/create",
          studentForm,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("Student created successfully!");
      }
      setStudentForm({
        name: "",
        email: "",
        password: "",
        registrationNumber: "",
        department: "",
        semester: "",
        contact: "",
        address: "",
        courses: [],
      });
      setEditingStudent(null);
      fetchStudents();
    } catch {
      setMessage("Failed to create or update student.");
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setStudentForm({
      name: student.user?.name || "",
      email: student.user?.email || "",
      password: "",
      registrationNumber: student.registrationNumber,
      department: student.department,
      semester: student.semester,
      contact: student.contact,
      address: student.address,
      courses: student.courses ? student.courses.map((c) => c._id || c) : [],
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
      setMessage("Failed to delete student.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar selected={selected} setSelected={setSelected} />
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold mb-6 text-blue-700">
            Admin Dashboard
          </h1>
          {message && <div className="mb-4 text-green-600">{message}</div>}

          {/* Announcements */}
          {selected === "announcements" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Post Announcement</h2>
              <form
                className="mb-6 space-y-2"
                onSubmit={handleAnnouncementSubmit}
              >
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={announcementForm.title}
                  onChange={handleAnnouncementChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
                <textarea
                  name="content"
                  placeholder="Content"
                  value={announcementForm.content}
                  onChange={handleAnnouncementChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Post
                </button>
              </form>
              <h2 className="text-lg font-semibold mb-2">All Announcements</h2>
              <ul>
                {announcements.map((a) => (
                  <li
                    key={a._id}
                    className="mb-3 border-b pb-2 flex justify-between items-center"
                  >
                    <div>
                      <span className="font-bold">{a.title}</span>: {a.content}
                      <span className="ml-2 text-xs text-gray-500">
                        ({a.postedBy?.name || "Admin"})
                      </span>
                    </div>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDeleteAnnouncement(a._id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Users */}
          {selected === "users" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {editingUser ? "Edit User" : "Create User"}
              </h2>
              <form className="mb-6 space-y-2" onSubmit={handleUserSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={userForm.name}
                  onChange={handleUserFormChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={userForm.email}
                  onChange={handleUserFormChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                  disabled={!!editingUser}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={userForm.password}
                  onChange={handleUserFormChange}
                  className="w-full px-3 py-2 border rounded"
                  required={!editingUser}
                />
                <select
                  name="role"
                  value={userForm.role}
                  onChange={handleUserFormChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  {editingUser ? "Update" : "Create"}
                </button>
                {editingUser && (
                  <button
                    type="button"
                    className="ml-2 px-4 py-2 rounded border"
                    onClick={() => {
                      setEditingUser(null);
                      setUserForm({
                        name: "",
                        email: "",
                        password: "",
                        role: "student",
                      });
                    }}
                  >
                    Cancel
                  </button>
                )}
              </form>
              <h2 className="text-lg font-semibold mb-2">All Users</h2>
              <table className="w-full border">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="p-2">Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Courses</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id} className="border-t">
                      <td className="p-2">{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.role}</td>
                      <td>
                        {(u.courses || []).map((c) => (
                          <span
                            key={c._id}
                            className="inline-block bg-gray-200 px-2 py-1 rounded mr-1"
                          >
                            {c.title || c.code}
                          </span>
                        ))}
                      </td>
                      <td>
                        <button
                          className="text-blue-600 hover:underline mr-2"
                          onClick={() => handleEditUser(u)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => handleDeleteUser(u._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Courses */}
          {selected === "courses" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Create Course</h2>
              <form className="mb-6 space-y-2" onSubmit={handleCourseSubmit}>
                <input
                  type="text"
                  name="title"
                  placeholder="Course Title"
                  value={courseForm.title}
                  onChange={handleCourseChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="code"
                  placeholder="Course Code"
                  value={courseForm.code}
                  onChange={handleCourseChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="department"
                  placeholder="Department"
                  value={courseForm.department}
                  onChange={handleCourseChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />

                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Create
                </button>
              </form>
              <h2 className="text-lg font-semibold mb-2">
                Assign Students/Teachers to Course
              </h2>
              <form className="mb-6 space-y-2" onSubmit={handleAssignToCourse}>
                <select
                  name="courseId"
                  value={courseAssignForm.courseId}
                  onChange={handleCourseAssignChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                >
                  <option value="">Select Course</option>
                  {courses.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.title} ({c.code})
                    </option>
                  ))}
                </select>
                <select
                  name="students"
                  multiple
                  value={courseAssignForm.students}
                  onChange={handleCourseAssignChange}
                  className="w-full px-3 py-2 border rounded"
                >
                  {users
                    .filter((u) => u.role === "student")
                    .map((u) => (
                      <option key={u._id} value={u._id}>
                        {u.name} ({u.email})
                      </option>
                    ))}
                </select>
                <select
                  name="teachers"
                  multiple
                  value={courseAssignForm.teachers}
                  onChange={handleCourseAssignChange}
                  className="w-full px-3 py-2 border rounded"
                >
                  {users
                    .filter((u) => u.role === "teacher")
                    .map((u) => (
                      <option key={u._id} value={u._id}>
                        {u.name} ({u.email})
                      </option>
                    ))}
                </select>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Assign
                </button>
              </form>
              <h2 className="text-lg font-semibold mb-2">All Courses</h2>
              <ul>
                {courses.map((c) => (
                  <li key={c._id} className="mb-2 border-b pb-2">
                    <span className="font-bold">{c.title}</span> ({c.code}) -{" "}
                    {c.department}
                    <div>
                      <span className="text-xs text-gray-600">Teachers: </span>
                      {(c.teachers || []).map((t) => (
                        <span
                          key={t._id}
                          className="inline-block bg-blue-100 px-2 py-1 rounded mr-1"
                        >
                          {t.name || t}
                        </span>
                      ))}
                      <span className="text-xs text-gray-600 ml-2">
                        Students:{" "}
                      </span>
                      {(c.students || []).map((s) => (
                        <span
                          key={s._id}
                          className="inline-block bg-green-100 px-2 py-1 rounded mr-1"
                        >
                          {s.name || s}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Applications */}
          {selected === "applications" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">All Applications</h2>
              {editingApplication && (
                <div className="mb-6 bg-blue-50 p-4 rounded">
                  <h3 className="font-bold mb-2">Edit Application</h3>
                  <form
                    className="grid grid-cols-1 md:grid-cols-2 gap-2"
                    onSubmit={handleApplicationUpdate}
                  >
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={applicationForm.name}
                      onChange={handleApplicationFormChange}
                      className="px-3 py-2 border rounded"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={applicationForm.email}
                      required
                    />
                    <input
                      type="text"
                      name="fatherName"
                      placeholder="Father Name"
                      value={applicationForm.fatherName}
                      onChange={handleApplicationFormChange}
                      className="px-3 py-2 border rounded"
                      required
                    />
                    <input
                      type="date"
                      name="dateOfBirth"
                      placeholder="Date of Birth"
                      value={applicationForm.dateOfBirth}
                      onChange={handleApplicationFormChange}
                      className="px-3 py-2 border rounded"
                      required
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={applicationForm.city}
                      onChange={handleApplicationFormChange}
                      className="px-3 py-2 border rounded"
                      required
                    />
                    <input
                      type="text"
                      name="previousSchool"
                      placeholder="Previous School"
                      value={applicationForm.previousSchool}
                      onChange={handleApplicationFormChange}
                      className="px-3 py-2 border rounded"
                      required
                    />
                    <input
                      type="text"
                      name="board"
                      placeholder="Board"
                      value={applicationForm.board}
                      onChange={handleApplicationFormChange}
                      className="px-3 py-2 border rounded"
                      required
                    />
                    <input
                      type="number"
                      name="marks"
                      placeholder="Marks"
                      value={applicationForm.marks}
                      onChange={handleApplicationFormChange}
                      className="px-3 py-2 border rounded"
                      required
                    />
                    <input
                      type="number"
                      name="passingYear"
                      placeholder="Passing Year"
                      value={applicationForm.passingYear}
                      onChange={handleApplicationFormChange}
                      className="px-3 py-2 border rounded"
                      required
                    />
                    <select
                      name="status"
                      value={applicationForm.status}
                      onChange={handleApplicationFormChange}
                      className="px-3 py-2 border rounded"
                      required
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <input
                      type="text"
                      name="message"
                      placeholder="Message"
                      value={applicationForm.message}
                      onChange={handleApplicationFormChange}
                      className="px-3 py-2 border rounded"
                    />
                    <div className="col-span-2 flex gap-2 mt-2">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Update
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 rounded border"
                        onClick={() => {
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
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
              <div className="overflow-x-auto">
                <table className="w-full border text-sm">
                  <thead>
                    <tr className="bg-blue-100">
                      <th>Name</th>
                      <th>Email</th>
                      <th>Department</th>
                      <th>Father Name</th>
                      <th>DOB</th>
                      <th>City</th>
                      <th>Prev School</th>
                      <th>Board</th>
                      <th>Marks</th>
                      <th>Passing Year</th>
                      <th>Status</th>
                      <th>Message</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((a) => (
                      <tr key={a._id} className="border-t">
                        <td>{a.name}</td>
                        <td>{a.email}</td>
                        <td>{a.department}</td>
                        <td>{a.fatherName}</td>
                        <td>
                          {a.dateOfBirth ? a.dateOfBirth.substring(0, 10) : ""}
                        </td>
                        <td>{a.city}</td>
                        <td>{a.previousSchool}</td>
                        <td>{a.board}</td>
                        <td>{a.marks}</td>
                        <td>{a.passingYear}</td>
                        <td>{a.status}</td>
                        <td>{a.message}</td>
                        <td>
                          <button
                            className="text-blue-600 hover:underline mr-2"
                            onClick={() => handleEditApplication(a)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-600 hover:underline"
                            onClick={() => handleDeleteApplication(a._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {applications.length === 0 && (
                      <tr>
                        <td
                          colSpan={13}
                          className="text-center text-gray-400 py-2"
                        >
                          No applications found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Results */}
          {selected === "results" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">All Results</h2>
              <table className="w-full border">
                <thead>
                  <tr className="bg-blue-100">
                    <th>Name</th>
                    <th>Roll No</th>
                    <th>Course</th>
                    <th>Department</th>
                    <th>Marks</th>
                    <th>Grade</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r) => (
                    <tr key={r._id} className="border-t">
                      <td>{r.name}</td>
                      <td>{r.rollNumber}</td>
                      <td>{r.course}</td>
                      <td>{r.department}</td>
                      <td>
                        {r.obtainedMarks}/{r.totalMarks} ({r.percentage}%)
                      </td>
                      <td>{r.grade}</td>
                      <td>
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => handleDeleteResult(r._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Grades */}
          {selected === "grades" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">All Grades</h2>
              <table className="w-full border">
                <thead>
                  <tr className="bg-blue-100">
                    <th>Student</th>
                    <th>Course</th>
                    <th>Grade</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {grades.map((g) => (
                    <tr key={g._id} className="border-t">
                      <td>{g.student}</td>
                      <td>{g.course}</td>
                      <td>{g.grade}</td>
                      <td>{g.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Students */}
          {selected === "students" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {editingStudent ? "Edit Student" : "Create Student"}
              </h2>
              <form className="mb-6 space-y-2" onSubmit={handleStudentSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={studentForm.name}
                  onChange={handleStudentFormChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={studentForm.email}
                  onChange={handleStudentFormChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={studentForm.password}
                  onChange={handleStudentFormChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="registrationNumber"
                  placeholder="Registration Number"
                  value={studentForm.registrationNumber}
                  onChange={handleStudentFormChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="department"
                  placeholder="Department"
                  value={studentForm.department}
                  onChange={handleStudentFormChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="semester"
                  placeholder="Semester"
                  value={studentForm.semester}
                  onChange={handleStudentFormChange}
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  name="contact"
                  placeholder="Contact"
                  value={studentForm.contact}
                  onChange={handleStudentFormChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={studentForm.address}
                  onChange={handleStudentFormChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
                <select
                  name="courses"
                  multiple
                  value={studentForm.courses}
                  onChange={handleStudentFormChange}
                  className="w-full px-3 py-2 border rounded"
                >
                  {courses.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.title} ({c.code})
                    </option>
                  ))}
                </select>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  {editingStudent ? "Update Student" : "Create Student"}
                </button>
                {editingStudent && (
                  <button
                    type="button"
                    className="ml-2 px-4 py-2 rounded border"
                    onClick={() => {
                      setEditingStudent(null);
                      setStudentForm({
                        name: "",
                        email: "",
                        password: "",
                        registrationNumber: "",
                        department: "",
                        semester: "",
                        contact: "",
                        address: "",
                        courses: [],
                      });
                    }}
                  >
                    Cancel
                  </button>
                )}
              </form>
              <h2 className="text-lg font-semibold mb-2">All Students</h2>
              <table className="w-full border">
                <thead>
                  <tr className="bg-blue-100">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Registration #</th>
                    <th>Department</th>
                    <th>Semester</th>
                    <th>Contact</th>
                    <th>Address</th>
                    <th>Courses</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr key={s._id} className="border-t">
                      <td>{s.user?.name || ""}</td>
                      <td>{s.user?.email || ""}</td>
                      <td>{s.registrationNumber}</td>
                      <td>{s.department}</td>
                      <td>{s.semester}</td>
                      <td>{s.contact}</td>
                      <td>{s.address}</td>
                      <td>
                        {(s.courses || []).map((c) => (
                          <span
                            key={c._id || c}
                            className="inline-block bg-gray-200 px-2 py-1 rounded mr-1"
                          >
                            {c.title || c}
                          </span>
                        ))}
                      </td>
                      <td>
                        <button
                          className="text-blue-600 hover:underline mr-2"
                          onClick={() => handleEditStudent(s)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => handleDeleteStudent(s._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
