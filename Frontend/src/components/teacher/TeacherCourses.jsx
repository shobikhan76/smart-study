import React, { useState } from "react";
import { 
  FaBook, 
  FaUserGraduate, 
  FaChalkboardTeacher, 
  FaChevronDown, 
  FaChevronUp, 
  FaGraduationCap, 
  FaComment, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaInfoCircle,
  FaRegStar,
  FaStar,
  FaSearch
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const gradeOptions = ["A+", "A", "B", "C", "D", "F"];

const TeacherCourses = ({
  courses = [],
  students = {},
  fetchStudentsInCourse,
  handleGradeSubmit,
}) => {
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [showGradeForm, setShowGradeForm] = useState({});
  const [gradeInput, setGradeInput] = useState({});
  const [remarksInput, setRemarksInput] = useState({});
  const [finalGradeAssignment, setFinalGradeAssignment] = useState("Final Grade");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCourseClick = async (courseId) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null);
      setShowGradeForm({});
      setGradeInput({});
    } else {
      setExpandedCourse(courseId);
      if (!students[courseId]) {
        await fetchStudentsInCourse(courseId);
      }
      setShowGradeForm({});
      setGradeInput({});
    }
  };

  const handleShowGradeForm = (studentId) => {
    setShowGradeForm((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
    setGradeInput((prev) => ({
      ...prev,
      [studentId]: "",
    }));
  };

  const handleGradeInputChange = (studentId, value) => {
    setGradeInput((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  const handleRemarksInputChange = (studentId, value) => {
    setRemarksInput((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  const handleGradeFormSubmit = (e, courseId, studentId) => {
    e.preventDefault();
    if (gradeInput[studentId] !== "") {
      handleGradeSubmit(
        courseId,
        studentId,
        "Final Grade",
        gradeInput[studentId],
        remarksInput[studentId] || ""
      );
      setShowGradeForm((prev) => ({
        ...prev,
        [studentId]: false,
      }));
      setGradeInput((prev) => ({
        ...prev,
        [studentId]: "",
      }));
      setRemarksInput((prev) => ({
        ...prev,
        [studentId]: "",
      }));
    }
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case "A+": case "A": return "text-green-600 bg-green-100";
      case "B": return "text-blue-600 bg-blue-100";
      case "C": return "text-yellow-600 bg-yellow-100";
      default: return "text-red-600 bg-red-100";
    }
  };

  const filteredStudents = (studentList) => {
    if (!searchTerm) return studentList;
    return studentList.filter(student => 
      (student.user?.name || student.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.registrationNumber || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
            <FaBook className="text-2xl text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Courses</h1>
            <p className="text-gray-600">Manage your courses and student grades</p>
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
            <FaBook className="text-4xl text-gray-400" />
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
          {courses.map((offered) => {
            const courseStudents = students[offered._id] || [];
            const hasStudents = courseStudents.length > 0;

            return (
              <motion.div
                key={offered._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                {/* Course Header */}
                <div
                  className="cursor-pointer transition-colors duration-200"
                  onClick={() => handleCourseClick(offered._id)}
                >
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
                            <FaBook /> {offered.course?.title || "Untitled Course"}
                          </h3>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                            {offered.course?.code || "N/A"}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <FaChalkboardTeacher className="text-purple-500" />
                            <span>{offered.course?.department || "Department"}</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <FaUserGraduate className="text-blue-500" />
                            <span>{courseStudents.length} students</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <FaInfoCircle className="text-gray-500" />
                            <span>Semester {offered.semester}, {offered.year}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right hidden md:block">
                          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {hasStudents ? courseStudents.length : 0} enrolled
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {hasStudents ? 'Students' : 'No students'}
                          </div>
                        </div>

                        <div className="text-2xl transition-transform duration-200">
                          {expandedCourse === offered._id ? (
                            <FaChevronUp className="text-blue-500" />
                          ) : (
                            <FaChevronDown className="text-blue-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedCourse === offered._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-6 pt-4 border-t border-gray-200 dark:border-gray-700"
                    >
                      {/* Students Section */}
                      <div className="mb-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-2 md:mb-0">
                            <FaUserGraduate /> Students Enrolled
                          </h4>
                          
                          {hasStudents && (
                            <div className="relative">
                              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                              <input
                                type="text"
                                placeholder="Search students..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 w-full md:w-64 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                              />
                            </div>
                          )}
                        </div>

                        {courseStudents.length === 0 ? (
                          <div className="text-center py-8 bg-gray-50 dark:bg-gray-900 rounded-xl">
                            <FaUserGraduate className="mx-auto text-4xl text-gray-400 mb-3" />
                            <p className="text-gray-500 dark:text-gray-400">No students enrolled in this course.</p>
                          </div>
                        ) : (
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm rounded-lg overflow-hidden bg-white dark:bg-gray-900 shadow">
                              <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                  <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Student
                                  </th>
                                  <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Registration
                                  </th>
                                  <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Email
                                  </th>
                                  <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Action
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredStudents(courseStudents).map((student) => (
                                  <tr key={student._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <td className="p-4">
                                      <div className="font-medium text-gray-800 dark:text-gray-100">
                                        {student.user?.name || student.name}
                                      </div>
                                    </td>
                                    <td className="p-4">
                                      <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                                        {student.registrationNumber || "N/A"}
                                      </div>
                                    </td>
                                    <td className="p-4">
                                      <div className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-xs">
                                        {student.user?.email || student.email || "N/A"}
                                      </div>
                                    </td>
                                    <td className="p-4">
                                      <div className="flex gap-2">
                                        <button
                                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 text-sm font-medium shadow"
                                          onClick={() => handleShowGradeForm(student._id)}
                                          type="button"
                                        >
                                          <FaGraduationCap /> Final Grade
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>

                      {/* Grade Forms */}
                      <AnimatePresence>
                        {Object.keys(showGradeForm).map((studentId) => 
                          showGradeForm[studentId] && (
                            <motion.div
                              key={`grade-form-${studentId}`}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="mt-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-xl border border-green-200 dark:border-green-800"
                            >
                              <h5 className="text-lg font-bold mb-4 flex items-center gap-2 text-green-700 dark:text-green-400">
                                <FaGraduationCap /> Assign Final Grade
                              </h5>
                              
                              {courseStudents.length > 0 && (
                                <form
                                  onSubmit={(e) =>
                                    handleGradeFormSubmit(
                                      e,
                                      offered._id,
                                      studentId
                                    )
                                  }
                                  className="space-y-6"
                                >
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Student
                                      </label>
                                      <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600">
                                        <p className="font-medium text-gray-800 dark:text-gray-100">
                                          {courseStudents.find(s => s._id === studentId)?.user?.name || "Unknown Student"}
                                        </p>
                                      </div>
                                    </div>

                                    <div>
                                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Select Grade
                                      </label>
                                      <select
                                        value={gradeInput[studentId] || ""}
                                        onChange={(e) =>
                                          handleGradeInputChange(
                                            studentId,
                                            e.target.value
                                          )
                                        }
                                        className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-green-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                                        required
                                      >
                                        <option value="">Choose a grade...</option>
                                        {gradeOptions.map((g) => (
                                          <option key={g} value={g}>
                                            {g} - {g === "A+" ? "Excellent" : g === "A" ? "Very Good" : g === "B" ? "Good" : g === "C" ? "Satisfactory" : g === "D" ? "Needs Improvement" : "Fail"}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>

                                  <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                      <FaComment className="inline mr-2 text-blue-500" /> Remarks (Optional)
                                    </label>
                                    <textarea
                                      placeholder="Add any comments or feedback for the student..."
                                      value={remarksInput[studentId] || ""}
                                      onChange={(e) =>
                                        handleRemarksInputChange(
                                          studentId,
                                          e.target.value
                                        )
                                      }
                                      rows={3}
                                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none resize-none bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                                    />
                                  </div>

                                  <div className="flex justify-end gap-3">
                                    <button
                                      type="button"
                                      className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold transition-colors duration-200"
                                      onClick={() => handleShowGradeForm(studentId)}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="submit"
                                      className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-blue-700 font-semibold shadow-lg transform transition-all duration-200 hover:scale-105 flex items-center gap-2"
                                    >
                                      <FaCheckCircle /> Submit Grade
                                    </button>
                                  </div>
                                </form>
                              )}
                            </motion.div>
                          )
                        )}
                      </AnimatePresence>
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

export default TeacherCourses;