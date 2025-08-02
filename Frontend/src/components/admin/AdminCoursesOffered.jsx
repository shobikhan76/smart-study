import React, { useEffect, useState } from "react";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaBook,
  FaCalendarAlt,
  FaPlus,
  FaTrash,
  FaEdit,
  FaList,
  FaCheckCircle,
  FaExclamationCircle,
  FaSave,
} from "react-icons/fa";

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
  }, [token]);

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
      setMessage("Failed to fetch data.");
    }
  };

  const fetchOffered = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/course-offered", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOfferedList(res.data);
    } catch {
      setMessage("Failed to load offered courses.");
    }
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    setMessage("");
    if (selectedCourses.length === 0) {
      setMessage("Please select at least one course.");
      return;
    }

    try {
      for (let courseId of selectedCourses) {
        await axios.post(
          "http://localhost:5000/api/course-offered/create",
          {
            course: courseId,
            students: selectedStudents,
            teachers: selectedTeachers,
            semester,
            year,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setMessage("✅ Courses offered successfully!");
      setSelectedStudents([]);
      setSelectedTeachers([]);
      setSelectedCourses([]);
      fetchOffered();
    } catch (err) {
      setMessage("❌ Failed to offer courses. Please try again.");
    }
  };

  const handleDeleteOffered = async (id) => {
    if (!window.confirm("Delete this course offering?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/course-offered/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("✅ Deleted successfully!");
      fetchOffered();
    } catch {
      setMessage("❌ Failed to delete course offering.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-600 text-white rounded-lg">
          <FaBook />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manage Courses Offered</h2>
          <p className="text-gray-600 text-sm">Assign courses to students and teachers per semester.</p>
        </div>
      </div>

      {/* Assignment Form */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 shadow-sm">
        <form onSubmit={handleAssign} className="space-y-5">
          {/* Semester & Year */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FaCalendarAlt /> Semester
              </label>
              <select
                value={semester}
                onChange={(e) => setSemester(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              >
                {semesters.map((s) => (
                  <option key={s} value={s}>
                    Semester {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FaCalendarAlt /> Year
              </label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                min="2000"
                max="2100"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              />
            </div>
          </div>

          {/* Students */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <FaUserGraduate /> Select Students (Optional)
            </label>
            <select
              multiple
              value={selectedStudents}
              onChange={(e) =>
                setSelectedStudents(
                  Array.from(e.target.selectedOptions, (o) => o.value)
                )
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white h-32"
            >
              {students.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.user?.name} ({s.user?.email})
                </option>
              ))}
            </select>
          </div>

          {/* Teachers */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <FaChalkboardTeacher /> Select Teachers (Optional)
            </label>
            <select
              multiple
              value={selectedTeachers}
              onChange={(e) =>
                setSelectedTeachers(
                  Array.from(e.target.selectedOptions, (o) => o.value)
                )
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white h-32"
            >
              {teachers.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.user?.name} ({t.user?.email})
                </option>
              ))}
            </select>
          </div>

          {/* Courses */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <FaBook /> Select Courses
            </label>
            <select
              multiple
              value={selectedCourses}
              onChange={(e) =>
                setSelectedCourses(
                  Array.from(e.target.selectedOptions, (o) => o.value)
                )
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white h-32"
              required
            >
              {courses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.title} ({c.code})
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="flex items-center gap-2 mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <FaPlus /> Assign Courses
          </button>
        </form>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div
          className={`text-center py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
            message.startsWith("✅")
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {message.startsWith("✅") ? <FaCheckCircle /> : <FaExclamationCircle />}
          {message}
        </div>
      )}

      {/* Offered Courses Table */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-600 text-white rounded-lg">
              <FaList />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Offered Courses</h3>
              <p className="text-gray-600 text-sm">Current and past course offerings.</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Course</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Semester</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Year</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Students</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Teachers</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {offeredList.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500 italic">
                    No courses have been offered yet.
                  </td>
                </tr>
              ) : (
                offeredList.map((o) => (
                  <tr key={o._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {o.course?.title || "-"}{" "}
                      <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">
                        {o.course?.code || "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">Semester {o.semester}</td>
                    <td className="px-6 py-4 text-gray-600">{o.year}</td>
                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate" title={
                      (o.students || []).map(s => `${s.user?.name || s.name} (${s.user?.email || s.email})`).join(", ")
                    }>
                      {(o.students || []).length === 0
                        ? "-"
                        : `${(o.students || []).length} student(s)`
                      }
                    </td>
                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate" title={
                      (o.teachers || []).map(t => `${t.user?.name || t.name} (${t.user?.email || t.email})`).join(", ")
                    }>
                      {(o.teachers || []).length === 0
                        ? "-"
                        : `${(o.teachers || []).length} teacher(s)`
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => alert("Edit functionality not implemented yet.")}
                          className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition"
                          aria-label="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteOffered(o._id)}
                          className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition"
                          aria-label="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCoursesOffered;