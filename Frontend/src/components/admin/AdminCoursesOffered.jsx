import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

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
      if (isEditing && editId) {
        await axios.put(`http://localhost:5000/api/course-offered/${editId}`, {
          course: selectedCourses[0],
          students: selectedStudents,
          teachers: selectedTeachers,
          semester,
          year,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("✅ Course offering updated successfully!");
      } else {
        for (let courseId of selectedCourses) {
          await axios.post("http://localhost:5000/api/course-offered/create", {
            course: courseId,
            students: selectedStudents,
            teachers: selectedTeachers,
            semester,
            year,
          }, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }
        setMessage("✅ Courses offered successfully!");
      }
      resetForm();
      fetchOffered();
    } catch (err) {
      setMessage("❌ Failed to process course offering.");
    }
  };

  const resetForm = () => {
    setSelectedStudents([]);
    setSelectedTeachers([]);
    setSelectedCourses([]);
    setSemester(1);
    setYear(new Date().getFullYear());
    setIsEditing(false);
    setEditId(null);
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

  const handleEdit = (offered) => {
    setIsEditing(true);
    setEditId(offered._id);
    setSemester(offered.semester);
    setYear(offered.year);
    setSelectedCourses([offered.course?._id]);
    setSelectedStudents(offered.students?.map(s => s._id) || []);
    setSelectedTeachers(offered.teachers?.map(t => t._id) || []);
  };

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <FaBook className="text-indigo-600" /> Manage Courses Offered
      </h2>

      <form onSubmit={handleAssign} className="space-y-4">
        {/* Semester and Year Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Semester</label>
            <select value={semester} onChange={(e) => setSemester(Number(e.target.value))} className="w-full border rounded p-2">
              {semesters.map(s => <option key={s} value={s}>Semester {s}</option>)}
            </select>
          </div>
          <div>
            <label className="block mb-1">Year</label>
            <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} className="w-full border rounded p-2" />
          </div>
        </div>

        {/* Student Select */}
        <div>
          <label className="block mb-1">Students</label>
          <select multiple value={selectedStudents} onChange={(e) => setSelectedStudents(Array.from(e.target.selectedOptions, o => o.value))} className="w-full border rounded p-2 h-32">
            {students.map(s => <option key={s._id} value={s._id}>{s.user?.name} ({s.user?.email})</option>)}
          </select>
        </div>

        {/* Teacher Select */}
        <div>
          <label className="block mb-1">Teachers</label>
          <select multiple value={selectedTeachers} onChange={(e) => setSelectedTeachers(Array.from(e.target.selectedOptions, o => o.value))} className="w-full border rounded p-2 h-32">
            {teachers.map(t => <option key={t._id} value={t._id}>{t.user?.name} ({t.user?.email})</option>)}
          </select>
        </div>

        {/* Course Select */}
        <div>
          <label className="block mb-1">Courses</label>
          <select multiple required value={selectedCourses} onChange={(e) => setSelectedCourses(Array.from(e.target.selectedOptions, o => o.value))} className="w-full border rounded p-2 h-32">
            {courses.map(c => <option key={c._id} value={c._id}>{c.title} ({c.code})</option>)}
          </select>
        </div>

        {/* Submit/Cancel Buttons */}
        <div className="flex gap-3">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
            {isEditing ? <><FaSave /> Update</> : <><FaPlus /> Assign</>}
          </button>
          {isEditing && (
            <button type="button" onClick={resetForm} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
          )}
        </div>
      </form>

      {/* Message */}
      {message && (
        <div className={`p-3 rounded text-sm ${message.startsWith("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {message.startsWith("✅") ? <FaCheckCircle className="inline mr-1" /> : <FaExclamationCircle className="inline mr-1" />} {message}
        </div>
      )}

      {/* Offered Courses List */}
      <div className="border rounded shadow">
        <div className="p-4 bg-gray-50 border-b">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2"><FaList className="text-green-600" /> Offered Courses</h3>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Course</th>
              <th className="p-3 text-left">Semester</th>
              <th className="p-3 text-left">Year</th>
              <th className="p-3 text-left">Students</th>
              <th className="p-3 text-left">Teachers</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {offeredList.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500 italic">No courses offered yet.</td>
              </tr>
            ) : (
              offeredList.map(o => (
                <tr key={o._id} className="hover:bg-gray-50">
                  <td className="p-3">{o.course?.title} <span className="text-xs text-gray-500">({o.course?.code})</span></td>
                  <td className="p-3">Semester {o.semester}</td>
                  <td className="p-3">{o.year}</td>
                  <td className="p-3">{o.students?.length || 0}</td>
                  <td className="p-3">{o.teachers?.length || 0}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(o)} className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
                      <button onClick={() => handleDeleteOffered(o._id)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCoursesOffered;