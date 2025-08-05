import React, { useState } from "react";
import { 
  FaBook, 
  FaChalkboardTeacher, 
  FaUserGraduate, 
  FaCalendarAlt, 
  FaChevronDown, 
  FaChevronUp,
  FaRegStar,
  FaStar,
  FaRegFileAlt,
  FaCheckCircle
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const StudentCourses = ({ courses = [], darkMode = false }) => {
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name"); // name, semester, department

  const handleCourseClick = (courseId) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getTeacherNames = (teachers) => {
    if (!teachers || teachers.length === 0) return "No instructors assigned";
    return teachers
      .map(t => t.user?.name || t.name || "Unknown Instructor")
      .join(", ");
  };

  const getStudentCount = (students, enrolledStudentId) => {
    if (!students) return 0;
    return students.filter(s => s._id !== enrolledStudentId).length + 1; // Include current student
  };

  const filteredAndSortedCourses = () => {
    let filtered = courses.filter(course => 
      (course.course?.title || "Unnamed Course").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.course?.code || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.course?.department || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort courses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return (a.course?.title || "").localeCompare(b.course?.title || "");
        case "semester":
          return `${b.semester}${b.year}`.localeCompare(`${a.semester}${a.year}`);
        case "department":
          return (a.course?.department || "").localeCompare(b.course?.department || "");
        default:
          return 0;
      }
    });

    return filtered;
  };

  const sortedCourses = filteredAndSortedCourses();

  return (
    <div className={`max-w-4xl mx-auto px-4 py-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
            <FaBook className="text-2xl text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">My Courses</h1>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              View your enrolled courses and course details
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      {courses.length > 0 && (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                darkMode 
                  ? 'border-gray-600 focus:border-blue-500 focus:ring-blue-500 bg-gray-800 text-white' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-300'
              }`}
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                darkMode 
                  ? 'border-gray-600 focus:border-blue-500 focus:ring-blue-500 bg-gray-800 text-white' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-300'
              }`}
            >
              <option value="name">Course Name</option>
              <option value="semester">Semester</option>
              <option value="department">Department</option>
            </select>
          </div>
        </div>
      )}

      {/* No Courses State */}
      {sortedCourses.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <FaBook className="text-4xl text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
            {searchTerm ? 'No Matching Courses' : 'No Courses Assigned'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {searchTerm 
              ? 'No courses match your search criteria.' 
              : 'You are not currently enrolled in any courses.'}
          </p>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {sortedCourses.map((offered, index) => (
            <motion.div
              key={offered._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              {/* Course Header */}
              <div
                className="cursor-pointer transition-colors duration-200"
                onClick={() => handleCourseClick(offered._id)}
              >
                <div className={`p-6 ${darkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                          {offered.course?.title || "Unnamed Course"}
                        </h3>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                          {offered.course?.code || "N/A"}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <FaChalkboardTeacher className="text-purple-500" />
                            <span>{getTeacherNames(offered.teachers)}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <FaUserGraduate className="text-blue-500" />
                            <span>
                              {getStudentCount(offered.students, offered.enrolledStudent?._id)} students
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <FaCalendarAlt className="text-gray-500" />
                            <span>Semester {offered.semester}, {offered.year}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-2xl transition-transform duration-200 ml-4">
                      {expandedCourse === offered._id ? (
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
                {expandedCourse === offered._id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-6 pt-4 border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className="space-y-6">
                      {/* Course Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-800 dark:text-gray-100">
                            <FaChalkboardTeacher /> Instructors
                          </h4>
                          <div className="space-y-2">
                            {offered.teachers && offered.teachers.length > 0 ? (
                              offered.teachers.map((teacher, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                                    {teacher.user?.name?.charAt(0) || teacher.name?.charAt(0) || '?'}
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-800 dark:text-gray-100">
                                      {teacher.user?.name || teacher.name || "Unknown Instructor"}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                      {teacher.user?.email || "No email"}
                                    </p>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="text-gray-500 dark:text-gray-400 italic">No instructors assigned</div>
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-800 dark:text-gray-100">
                            <FaUserGraduate /> Classmates
                          </h4>
                          <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                            {offered.students && offered.students.length > 0 ? (
                              offered.students
                                .filter((s) => s._id !== offered.enrolledStudent?._id)
                                .map((student, idx) => (
                                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                      {student.user?.name?.charAt(0) || student.name?.charAt(0) || '?'}
                                    </div>
                                    <div>
                                      <p className="font-medium text-gray-800 dark:text-gray-100">
                                        {student.user?.name || student.name || "Unknown Student"}
                                      </p>
                                      <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {student.registrationNumber || "No ID"}
                                      </p>
                                    </div>
                                  </div>
                                ))
                            ) : (
                              <div className="text-gray-500 dark:text-gray-400 italic">No classmates yet</div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Additional Information */}
                      <div className="border-t pt-6">
                        <h4 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-800 dark:text-gray-100">
                          <FaRegFileAlt /> Course Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                            <div className="text-sm font-medium text-blue-800 dark:text-blue-400">Department</div>
                            <div className="text-lg font-bold text-blue-700 dark:text-blue-300">
                              {offered.course?.department || "N/A"}
                            </div>
                          </div>
                          <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
                            <div className="text-sm font-medium text-purple-800 dark:text-purple-400">Credits</div>
                            <div className="text-lg font-bold text-purple-700 dark:text-purple-300">
                              {offered.course?.credits || "3"}
                            </div>
                          </div>
                          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
                            <div className="text-sm font-medium text-green-800 dark:text-green-400">Level</div>
                            <div className="text-lg font-bold text-green-700 dark:text-green-300">
                              {offered.course?.level || "Undergraduate"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}

      {/* Statistics */}
      {courses.length > 0 && (
        <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">Course Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{sortedCourses.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Courses</div>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {courses.reduce((total, course) => total + getStudentCount(course.students, course.enrolledStudent?._id), 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Students</div>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {new Set(courses.map(c => c.course?.department)).size}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Departments</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Add Chevron icons


export default StudentCourses;