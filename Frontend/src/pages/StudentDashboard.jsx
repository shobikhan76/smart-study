import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentCourses from "../components/student/StudentCourses";
import StudentAnnouncements from "../components/student/StudentAnnouncements";
import StudentGrades from "../components/student/StudentGrades";
import StudentTimetable from "../components/student/StudentTimetable";
import StudentQueries from "../components/student/StudentQueries";
import StudentProfiles from "../components/student/StudentProfiles"; // <-- import
import StudentAttendance from "../components/student/StudentAttendance";

const Sidebar = ({ selected, setSelected }) => (
  <div className="w-64 bg-green-800 text-white min-h-screen p-6 flex flex-col gap-4">
    <h2 className="text-2xl font-bold mb-8">Student Panel</h2>
    {[
      "profile",
      "courses",
      "announcements",
      "grades",
      "attendance", // <-- add attendance tab
      "timetable",
      "queries",
    ].map((item) => (
      <button
        key={item}
        className={`text-left px-4 py-2 rounded ${
          selected === item ? "bg-green-600" : "hover:bg-green-700"
        }`}
        onClick={() => setSelected(item)}
      >
        {item.charAt(0).toUpperCase() + item.slice(1)}
      </button>
    ))}
  </div>
);

const StudentDashboard = () => {
  const [selected, setSelected] = useState("courses");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  // State
  const [studentProfile, setStudentProfile] = useState(null); // <-- add
  const [courses, setCourses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [grades, setGrades] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [queries, setQueries] = useState([]);
  const [queryForm, setQueryForm] = useState({ courseId: "", question: "" });

  // Fetch data
  useEffect(() => {
    if (selected === "profile") fetchStudentProfile();
    if (selected === "courses") fetchCourses();
    if (selected === "announcements") fetchAnnouncements();
    if (selected === "grades") fetchGrades();
    if (selected === "timetable") fetchTimetable();
    if (selected === "queries") fetchQueries();
    // eslint-disable-next-line
  }, [selected, token]);

  // Fetch student profile
  const fetchStudentProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudentProfile(res.data);
    } catch {
      setMessage("Unable to load student profile.");
    }
  };

  // 1. Courses
  const fetchCourses = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/course-offered/my-courses-student",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCourses(res.data);
    } catch {
      setMessage("Unable to load your courses.");
    }
  };

  // 2. Announcements
  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/announcements", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnnouncements(res.data);
    } catch {
      setMessage("Unable to load announcements.");
    }
  };

  // 3. Grades
  const fetchGrades = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/grades/student/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setGrades(res.data);
    } catch {
      setMessage("Unable to load grades.");
    }
  };

  // 4. Timetable (placeholder)
  const fetchTimetable = async () => {
    // Implement API if available, else use static data
    setTimetable([]);
  };

  // 5. Queries
  const fetchQueries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/queries/student", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQueries(res.data);
    } catch {
      setMessage("Unable to load queries.");
    }
  };

  // Query form handlers
  const handleQueryChange = (e) => {
    setQueryForm({ ...queryForm, [e.target.name]: e.target.value });
  };
  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/queries", queryForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQueryForm({ courseId: "", question: "" });
      fetchQueries();
      setMessage("Query sent!");
    } catch {
      setMessage("Failed to send query.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar selected={selected} setSelected={setSelected} />
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold mb-6 text-green-700">
            Student Dashboard
          </h1>
          {message && <div className="mb-4 text-green-600">{message}</div>}

          {selected === "profile" && (
            <StudentProfiles student={studentProfile} />
          )}
          {selected === "courses" && (
            <StudentCourses courses={courses} grades={grades} />
          )}
          {selected === "announcements" && (
            <StudentAnnouncements announcements={announcements} />
          )}
          {selected === "grades" && (
            <StudentGrades grades={grades} courses={courses} />
          )}
          {selected === "attendance" && (
            <StudentAttendance token={token} studentId={studentProfile?._id} />
          )}
          {selected === "timetable" && (
            <StudentTimetable timetable={timetable} courses={courses} />
          )}
          {selected === "queries" && (
            <StudentQueries
              queries={queries}
              courses={courses}
              queryForm={queryForm}
              handleQueryChange={handleQueryChange}
              handleQuerySubmit={handleQuerySubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
