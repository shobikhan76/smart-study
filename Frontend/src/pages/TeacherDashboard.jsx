import React, { useEffect, useState } from "react";
import axios from "axios";

// Teacher Components (to be created)
import TeacherCourses from "../components/teacher/TeacherCourses";
import TeacherAttendance from "../components/teacher/TeacherAttendance";
import TeacherGrades from "../components/teacher/TeacherGrades";
import TeacherMaterials from "../components/teacher/TeacherMaterials";
import TeacherAnnouncements from "../components/teacher/TeacherAnnouncements";
import TeacherProfiles from "../components/teacher/TeacherProfiles";
import TeacherAssignments from "../components/teacher/TeacherAssignments";
import TeacherQueries from "../components/teacher/TeacherQueries"; // new component for queries

// Sidebar for Teacher Navigation
const Sidebar = ({ selected, setSelected }) => (
  <div className="w-64 bg-blue-800 text-white min-h-screen p-6 flex flex-col gap-4">
    <h2 className="text-2xl font-bold mb-8">Teacher Panel</h2>

    {[
      "profile",
      "courses",
      "attendance",
      "grades",
      "materials",
      "announcements",
      "assignments",
      "queries",
    ].map((item) => (
      <button
        key={item}
        className={`text-left px-4 py-2 rounded ${
          selected === item ? "bg-blue-600" : "hover:bg-blue-700"
        }`}
        onClick={() => setSelected(item)}
      >
        {item.charAt(0).toUpperCase() + item.slice(1)}
      </button>
    ))}
  </div>
);

const TeacherDashboard = () => {
  const [selected, setSelected] = useState("courses");
  const [message, setMessage] = useState("");
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
  const [assignmentForm, setAssignmentForm] = useState({
    courseId: "",
    title: "",
    description: "",
    dueDate: "",
  });
  const [studentQueries, setStudentQueries] = useState([]);
  const [replyForm, setReplyForm] = useState({}); // { [queryId]: replyText }

  // Forms
  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    content: "",
  });
  const [uploadForm, setUploadForm] = useState({
    courseId: "",
    title: "",
    file: null,
  });
  const [attendanceForm, setAttendanceForm] = useState({});
  const [gradesForm, setGradesForm] = useState({});

  // Fetch data based on selected tab
  useEffect(() => {
    const fetchData = async () => {
      if (selected === "profile") await fetchTeacherProfile();
      if (selected === "courses") await fetchAssignedCourses();
      if (selected === "attendance") await fetchAttendance();
      if (selected === "grades") await fetchGrades();
      if (selected === "materials") await fetchMaterials();
      if (selected === "announcements") await fetchAnnouncements();
      if (selected === "assignments") await fetchAssignments();
      if (selected === "queries") await fetchStudentQueries();
    };
    fetchData();
  }, [selected, token]);

  // === API Handlers ===

  // 0. Fetch Teacher Profile (Teacher MVC)
  const fetchTeacherProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/teachers/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeacherProfile(res.data);
    } catch (e) {
      setMessage("Unable to load teacher profile.");
    }
  };

  // 1. Fetch Assigned Courses (CourseOffered MVC)
  const fetchAssignedCourses = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/course-offered/my-courses",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCourses(res.data);
    } catch (e) {
      setMessage("Unable to load your courses.", e);
    }
  };

  // 2. Fetch Students in Course (CourseOffered MVC)
  const fetchStudentsInCourse = async (courseId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/courseoffered/${courseId}/students`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStudents((prev) => ({ ...prev, [courseId]: res.data }));
    } catch (e) {
      console.error(`Failed to fetch students for course ${courseId}:`, e);
    }
  };

  // 3. Attendance
  const fetchAttendance = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/attendance/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAttendance(res.data); // Assume: { courseId: [ { studentId, date, status }, ... ] }
    } catch (e) {
      console.error("Failed to fetch attendance:", e);
    }
  };

  const handleAttendanceSubmit = async (courseId, records) => {
    try {
      await axios.post(
        "http://localhost:5000/api/attendance/mark",
        { courseId, records },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchAttendance();
      setMessage("Attendance marked successfully!");
    } catch (e) {
      setMessage("Failed to mark attendance.");
    }
  };

  // 4. Grades (Grade MVC)
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

  const handleGradeSubmit = async (courseId, studentId, assignment, grade) => {
    try {
      await axios.post(
        "http://localhost:5000/api/grades",
        { courseId, studentId, assignment, grade },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchGrades();
      setMessage("Grade updated successfully!");
    } catch (e) {
      setMessage("Failed to update grade.");
    }
  };

  // 5. Upload Materials
  const fetchMaterials = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/materials/teacher",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMaterials(res.data);
    } catch (e) {
      console.error("Failed to fetch materials:", e);
    }
  };

  const handleFileChange = (e) => {
    setUploadForm({ ...uploadForm, file: e.target.files[0] });
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    const { courseId, title } = uploadForm;
    const formData = new FormData();
    formData.append("courseId", courseId);
    formData.append("title", title);
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
      setMessage("Material uploaded successfully!");
    } catch (e) {
      setMessage("Upload failed. Try again.");
    }
  };

  // 6. Announcements (Announcement MVC)
  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/announcements/teacher",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAnnouncements(res.data);
    } catch (e) {
      console.error("Failed to fetch announcements:", e);
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
    } catch (e) {
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

  // 7. Assignments (Assignment MVC)
  const fetchAssignments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/assignments/teacher",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAssignments(res.data);
    } catch (e) {
      setMessage("Unable to load assignments.");
    }
  };

  const handleAssignmentChange = (e) => {
    setAssignmentForm({ ...assignmentForm, [e.target.name]: e.target.value });
  };

  const handleAssignmentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/assignments",
        assignmentForm,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAssignmentForm({
        courseId: "",
        title: "",
        description: "",
        dueDate: "",
      });
      fetchAssignments();
      setMessage("Assignment posted!");
    } catch (e) {
      setMessage("Failed to post assignment.");
    }
  };

  // 8. Student Queries (StudentQueries MVC)
  const fetchStudentQueries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/queries/teacher", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudentQueries(res.data);
    } catch (e) {
      setMessage("Unable to load student queries.");
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
      fetchStudentQueries();
      setReplyForm((prev) => ({ ...prev, [queryId]: "" }));
      setMessage("Reply sent!");
    } catch (e) {
      setMessage("Failed to send reply.");
    }
  };

  // === RENDER ===
  // Transform courses for TeacherCourses
  const flatCourses = courses.map((offered) => ({
    // Use CourseOffered _id for toggling/expanding
    _id: offered._id,
    // Spread course details (populated)
    ...(offered.course || {}),
    // Add extra info
    semester: offered.semester,
    year: offered.year,
    students: offered.students,
    teachers: offered.teachers,
  }));

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar selected={selected} setSelected={setSelected} />
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold mb-6 text-blue-700">
            Teacher Dashboard
          </h1>
          {message && <div className="mb-4 text-green-600">{message}</div>}

          {selected === "profile" && (
            <TeacherProfiles teacher={teacherProfile} />
          )}

          {selected === "courses" && (
            <TeacherCourses
              courses={flatCourses}
              students={students}
              fetchStudentsInCourse={fetchStudentsInCourse}
            />
          )}

          {selected === "attendance" && (
            <TeacherAttendance
              courses={courses}
              attendance={attendance}
              students={students}
              fetchStudentsInCourse={fetchStudentsInCourse}
              handleAttendanceSubmit={handleAttendanceSubmit}
            />
          )}

          {selected === "grades" && (
            <TeacherGrades
              courses={courses}
              grades={grades}
              students={students}
              fetchStudentsInCourse={fetchStudentsInCourse}
              handleGradeSubmit={handleGradeSubmit}
            />
          )}

          {selected === "materials" && (
            <TeacherMaterials
              courses={courses}
              materials={materials}
              uploadForm={uploadForm}
              setUploadForm={setUploadForm}
              handleFileChange={handleFileChange}
              handleUploadSubmit={handleUploadSubmit}
            />
          )}

          {selected === "announcements" && (
            <TeacherAnnouncements
              announcements={announcements}
              announcementForm={announcementForm}
              handleAnnouncementChange={handleAnnouncementChange}
              handleAnnouncementSubmit={handleAnnouncementSubmit}
              handleDeleteAnnouncement={handleDeleteAnnouncement}
            />
          )}

          {selected === "assignments" && (
            <TeacherAssignments
              assignments={assignments}
              courses={courses}
              assignmentForm={assignmentForm}
              handleAssignmentChange={handleAssignmentChange}
              handleAssignmentSubmit={handleAssignmentSubmit}
            />
          )}

          {selected === "queries" && (
            <TeacherQueries
              queries={studentQueries}
              replyForm={replyForm}
              handleReplyChange={handleReplyChange}
              handleReplySubmit={handleReplySubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
