import React, { useState, useEffect } from "react";
import {
  FaCalendarCheck,
  FaUser,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaClipboardList,
  FaChevronDown,
  FaChevronUp,
  FaEye,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const TeacherAttendance = ({
  courses = [],
  attendance = {},
  students = {},
  fetchStudentsInCourse,
  handleAttendanceSubmit,
  token,
  darkMode = false,
}) => {
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [courseAttendance, setCourseAttendance] = useState({});
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [loadingRecords, setLoadingRecords] = useState({});
  const [error, setError] = useState(null);

  // Status badge colors
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "present":
        return "bg-green-100 text-green-800 border-green-200";
      case "absent":
        return "bg-red-100 text-red-800 border-red-200";
      case "leave":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleCourseToggle = async (courseId) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null);
      setCourseAttendance({});
      return;
    }

    setExpandedCourse(courseId);
    setCourseAttendance({});

    // Fetch students if not already loaded
    if (!students[courseId]) {
      try {
        await fetchStudentsInCourse(courseId);
      } catch (err) {
        console.error("Failed to fetch students:", err);
      }
    }

    // Fetch attendance records
    fetchAttendanceRecords(courseId);
  };

  const fetchAttendanceRecords = async (courseId) => {
    setLoadingRecords((prev) => ({ ...prev, [courseId]: true }));
    setError(null);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/attendance/course/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAttendanceRecords((prev) => ({ ...prev, [courseId]: res.data }));
    } catch (err) {
      setError("Failed to load attendance records.");
      setAttendanceRecords((prev) => ({ ...prev, [courseId]: [] }));
    } finally {
      setLoadingRecords((prev) => ({ ...prev, [courseId]: false }));
    }
  };

  const handleStatusChange = (studentId, status) => {
    setCourseAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const records = Object.keys(courseAttendance).map((studentId) => ({
      student: studentId,
      course: expandedCourse,
      date,
      status: courseAttendance[studentId].toLowerCase(),
    }));

    try {
      await handleAttendanceSubmit(expandedCourse, records);
      // Refresh records after submission
      await fetchAttendanceRecords(expandedCourse);
    } catch (err) {
      console.error("Failed to submit attendance:", err);
    }
  };

  return (
    <div className={`max-w-5xl mx-auto px-4 py-6 ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-green-500 to-blue-600 p-3 rounded-xl shadow-lg">
            <FaCalendarCheck className="text-2xl text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Attendance Management</h1>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Mark and track student attendance for your courses
            </p>
          </div>
        </div>
      </div>

      {/* No Courses State */}
      {courses.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <FaClipboardList className="text-4xl text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
            No Courses Assigned
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            You are not currently assigned to any courses.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {courses.map((course) => {
            const courseStudents = students[course._id] || [];
            const records = attendanceRecords[course._id] || [];
            const presentCount = records.filter(r => r.status === "present").length;
            const totalCount = records.length;

            return (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl`}
              >
                {/* Course Header */}
                <div
                  className={`p-6 cursor-pointer transition-colors duration-200 ${
                    darkMode 
                      ? "bg-gray-900 hover:bg-gray-800" 
                      : "bg-gradient-to-r from-blue-50 to-green-50 hover:bg-blue-100"
                  }`}
                  onClick={() => handleCourseToggle(course._id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400">
                          {course.course?.title || course.title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          darkMode ? "bg-gray-700 text-gray-300" : "bg-white text-gray-700"
                        } border ${darkMode ? "border-gray-600" : "border-gray-200"}`}>
                          {course.course?.code || course.code}
                        </span>
                      </div>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {course.course?.department || course.department} •{" "}
                        {courseStudents.length} students enrolled
                      </p>
                    </div>

                    <div className="flex items-center gap-6">
                      {/* Stats */}
                      <div className="text-right hidden md:block">
                        <div className="text-sm font-medium text-green-600 dark:text-green-400">
                          {presentCount} Present
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {totalCount} total records
                        </div>
                      </div>

                      {/* Expand Icon */}
                      <div className={`text-2xl transition-transform duration-200 ${
                        expandedCourse === course._id ? "rotate-180" : ""
                      }`}>
                        {expandedCourse === course._id ? (
                          <FaChevronUp className="text-blue-500" />
                        ) : (
                          <FaChevronDown className="text-blue-500" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedCourse === course._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-6 pt-4 border-t border-gray-200 dark:border-gray-700"
                    >
                      {/* Attendance Form */}
                      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900" : "bg-blue-50"} border ${darkMode ? "border-gray-700" : "border-blue-200"}`}>
                        <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                          <FaCalendarCheck /> Mark Today's Attendance
                        </h4>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div>
                            <label className="block text-sm font-semibold mb-2">
                              <FaClock className="inline mr-2 text-blue-500" /> Date
                            </label>
                            <input
                              type="date"
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                              className={`w-48 px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200
                                ${darkMode 
                                  ? "border-gray-600 focus:border-blue-500 focus:ring-blue-500 bg-gray-800 text-white" 
                                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-300"
                                }`}
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold mb-3">
                              <FaUser className="inline mr-2 text-green-500" /> Student Status
                            </label>
                            
                            {courseStudents.length === 0 ? (
                              <div className="text-center py-8">
                                <FaClock className="mx-auto text-4xl text-gray-400 mb-3" />
                                <p className="text-gray-500 dark:text-gray-400">Loading students...</p>
                              </div>
                            ) : (
                              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                                {courseStudents.map((student) => (
                                  <div
                                    key={student._id}
                                    className={`p-4 rounded-lg border transition-all duration-200 ${
                                      darkMode 
                                        ? "bg-gray-800 border-gray-700 hover:bg-gray-750" 
                                        : "bg-white border-gray-200 hover:shadow"
                                    }`}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <p className="font-medium text-gray-800 dark:text-gray-100">
                                          {student.user?.name || student.name}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                          {student.registrationNumber}
                                        </p>
                                      </div>

                                      <div className="flex gap-4">
                                        {["Present", "Absent", "Leave"].map((status) => (
                                          <label
                                            key={status}
                                            className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
                                          >
                                            <input
                                              type="radio"
                                              name={`status-${student._id}`}
                                              value={status}
                                              checked={courseAttendance[student._id] === status}
                                              onChange={() => handleStatusChange(student._id, status)}
                                              className="sr-only"
                                            />
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                              courseAttendance[student._id] === status
                                                ? status === "Present" ? "bg-green-500 border-green-500" :
                                                  status === "Absent" ? "bg-red-500 border-red-500" :
                                                  "bg-yellow-500 border-yellow-500"
                                                : "border-gray-300 dark:border-gray-600"
                                            }`}>
                                              {courseAttendance[student._id] === status && (
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                              )}
                                            </div>
                                            <span className={`text-sm font-medium ${
                                              status === "Present" ? "text-green-600 dark:text-green-400" :
                                              status === "Absent" ? "text-red-600 dark:text-red-400" :
                                              "text-yellow-600 dark:text-yellow-400"
                                            }`}>
                                              {status}
                                            </span>
                                          </label>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="flex justify-end">
                            <button
                              type="submit"
                              disabled={Object.keys(courseAttendance).length === 0}
                              className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-green-600 hover:to-blue-700 disabled:opacity-60 disabled:cursor-not-allowed font-semibold shadow-lg transform transition-all duration-200 hover:scale-105 flex items-center gap-2"
                            >
                              <FaCheckCircle /> Submit Attendance
                            </button>
                          </div>
                        </form>
                      </div>

                      {/* Attendance Records */}
                      <div>
                        <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                          <FaEye /> Attendance Records
                        </h4>

                        {loadingRecords[course._id] ? (
                          <div className="text-center py-8">
                            <div className="inline-block animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mb-3"></div>
                            <p className="text-gray-500 dark:text-gray-400">Loading records...</p>
                          </div>
                        ) : records.length === 0 ? (
                          <div className="text-center py-8 bg-gray-50 dark:bg-gray-900 rounded-xl">
                            <FaClipboardList className="mx-auto text-4xl text-gray-400 mb-3" />
                            <p className="text-gray-500 dark:text-gray-400">No attendance records found.</p>
                          </div>
                        ) : (
                          <div className="overflow-x-auto">
                            <table className={`w-full text-sm rounded-lg overflow-hidden ${
                              darkMode ? "bg-gray-900" : "bg-white"
                            } shadow`}>
                              <thead className={`${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                                <tr>
                                  <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Date & Time
                                  </th>
                                  <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Student
                                  </th>
                                  <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Status
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {records.slice(0, 10).map((rec, idx) => (
                                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <td className="p-4">
                                      <div className="font-medium text-gray-800 dark:text-gray-100">
                                        {formatDate(rec.date)}
                                      </div>
                                      <div className="text-sm text-gray-500 dark:text-gray-400">
                                        {formatTime(rec.date)}
                                      </div>
                                    </td>
                                    <td className="p-4">
                                      <div className="font-medium text-gray-800 dark:text-gray-100">
                                        {rec.student?.user?.name || "Unknown"}
                                      </div>
                                      <div className="text-sm text-gray-500 dark:text-gray-400">
                                        {rec.student?.registrationNumber || "N/A"}
                                      </div>
                                    </td>
                                    <td className="p-4">
                                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(rec.status)}`}>
                                        {rec.status.charAt(0).toUpperCase() + rec.status.slice(1)}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TeacherAttendance;