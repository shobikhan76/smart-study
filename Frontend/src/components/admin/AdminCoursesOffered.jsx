import React, { useEffect, useState } from "react";
import axios from "axios";

const semesters = Array.from({ length: 8 }, (_, i) => i + 1);

const AdminCoursesOffered = ({ token }) => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [semester, setSemester] = useState(1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [message, setMessage] = useState("");
  const [offeredList, setOfferedList] = useState([]);

  useEffect(() => {
    fetchData();
    fetchOffered();
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    try {
      const [stdRes, tchRes, crsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/students", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/teachers", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/courses/getCourses", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setStudents(stdRes.data);
      setTeachers(tchRes.data);
      setCourses(crsRes.data);
    } catch {
      setMessage("Failed to fetch data");
    }
  };

  const fetchOffered = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/course-offered", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOfferedList(res.data);
    } catch {}
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      for (let course of selectedCourses) {
        await axios.post(
          "http://localhost:5000/api/course-offered/create",
          {
            course,
            students: selectedStudents,
            teachers: selectedTeachers,
            semester,
            year,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setMessage("Courses offered successfully!");
      setSelectedStudents([]);
      setSelectedTeachers([]);
      setSelectedCourses([]);
      fetchOffered();
    } catch {
      setMessage("Failed to offer courses");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Courses Offered</h2>
      <form className="mb-6 space-y-2" onSubmit={handleAssign}>
        <div>
          <label className="block font-medium">Semester</label>
          <select
            value={semester}
            onChange={(e) => setSemester(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded"
          >
            {semesters.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium">Year</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">
            Select Students (optional)
          </label>
          <select
            multiple
            value={selectedStudents}
            onChange={(e) =>
              setSelectedStudents(
                Array.from(e.target.selectedOptions, (o) => o.value)
              )
            }
            className="w-full px-3 py-2 border rounded h-32"
          >
            {students.map((s) => (
              <option key={s._id} value={s._id}>
                {s.user?.name} ({s.user?.email})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium">
            Select Teachers (optional)
          </label>
          <select
            multiple
            value={selectedTeachers}
            onChange={(e) =>
              setSelectedTeachers(
                Array.from(e.target.selectedOptions, (o) => o.value)
              )
            }
            className="w-full px-3 py-2 border rounded h-32"
          >
            {teachers.map((t) => (
              <option key={t._id} value={t._id}>
                {t.user?.name} ({t.user?.email})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium">Select Courses</label>
          <select
            multiple
            value={selectedCourses}
            onChange={(e) =>
              setSelectedCourses(
                Array.from(e.target.selectedOptions, (o) => o.value)
              )
            }
            className="w-full px-3 py-2 border rounded h-32"
          >
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title} ({c.code})
              </option>
            ))}
          </select>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Assign
        </button>
      </form>
      {message && <div className="mb-4 text-green-600">{message}</div>}
      <h3 className="text-lg font-semibold mb-2">Offered Courses List</h3>
      <table className="w-full border">
        <thead>
          <tr className="bg-blue-100">
            <th>Course</th>
            <th>Semester</th>
            <th>Year</th>
            <th>Students</th>
            <th>Teachers</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {offeredList.map((o) => (
            <tr key={o._id} className="border-t">
              <td>
                {o.course?.title || "-"} ({o.course?.code || "-"})
              </td>
              <td>{o.semester}</td>
              <td>{o.year}</td>
              <td>
                {(o.students || []).length === 0
                  ? "-"
                  : (o.students || [])
                      .map(
                        (s) =>
                          (s.user?.name || s.name || "-") +
                          " (" +
                          (s.user?.email || s.email || "-") +
                          ")"
                      )
                      .join(", ")}
              </td>
              <td>
                {(o.teachers || []).length === 0
                  ? "-"
                  : (o.teachers || [])
                      .map(
                        (t) =>
                          (t.user?.name || t.name || "-") +
                          " (" +
                          (t.user?.email || t.email || "-") +
                          ")"
                      )
                      .join(", ")}
              </td>
              <td>
                <button
                  className="text-blue-600 hover:underline mr-2"
                  onClick={() => {
                    // You can implement edit logic here
                    alert("Edit not implemented yet");
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={async () => {
                    if (window.confirm("Delete this course offering?")) {
                      try {
                        await axios.delete(
                          `http://localhost:5000/api/course-offered/${o._id}`,
                          {
                            headers: { Authorization: `Bearer ${token}` },
                          }
                        );
                        setMessage("Deleted successfully");
                        fetchOffered();
                      } catch {
                        setMessage("Failed to delete");
                      }
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCoursesOffered;
