import React from "react";
import  { useState } from "react";
import { 
  FaGraduationCap, 
  FaBook, 
  FaRegStar, 
  FaStar, 
  FaRegFileAlt, 
  FaChartBar,
  FaExclamationCircle,
  FaCheckCircle
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const StudentGrades = ({ grades = [], courses = [], darkMode = false }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("course"); // course, grade, date
  const [expandedGrade, setExpandedGrade] = useState(null);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getGradeColor = (grade) => {
    if (!grade) return 'text-gray-500';
    
    const gradeStr = grade.toString().toUpperCase();
    if (['A+', 'A', 'A-'].includes(gradeStr)) return darkMode ? 'text-green-400' : 'text-green-600';
    if (['B+', 'B', 'B-'].includes(gradeStr)) return darkMode ? 'text-blue-400' : 'text-blue-600';
    if (['C+', 'C', 'C-'].includes(gradeStr)) return darkMode ? 'text-yellow-400' : 'text-yellow-600';
    if (['D+', 'D', 'F'].includes(gradeStr)) return darkMode ? 'text-red-400' : 'text-red-600';
    return darkMode ? 'text-gray-400' : 'text-gray-600';
  };

  const getGradeIcon = (grade) => {
    if (!grade) return <FaExclamationCircle className="text-gray-500" />;
    
    const gradeStr = grade.toString().toUpperCase();
    if (['A+', 'A', 'A-'].includes(gradeStr)) return <FaCheckCircle className="text-green-500" />;
    if (['B+', 'B', 'B-'].includes(gradeStr)) return <FaRegStar className="text-blue-500" />;
    if (['C+', 'C', 'C-'].includes(gradeStr)) return <FaRegStar className="text-yellow-500" />;
    if (['D+', 'D', 'F'].includes(gradeStr)) return <FaExclamationCircle className="text-red-500" />;
    return <FaRegStar className="text-gray-500" />;
  };

  const getGPA = () => {
    if (grades.length === 0) return 0;
    
    const gradePoints = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'F': 0.0
    };
    
    const totalPoints = grades.reduce((sum, g) => {
      const grade = g.grade?.toString().toUpperCase();
      return sum + (gradePoints[grade] || 0);
    }, 0);
    
    return (totalPoints / grades.length).toFixed(2);
  };

  const getCourseInfo = (grade) => {
    let courseTitle = grade.course?.title;
    let courseCode = grade.course?.code;
    let courseDepartment = grade.course?.department;

    if (!courseTitle || !courseCode) {
      const offered = courses.find(
        (c) =>
          c.course?._id === grade.course?._id ||
          c.course === grade.course ||
          c._id === grade.course?._id ||
          c.course?._id === grade.course ||
          c._id === grade.course
      );
      courseTitle = courseTitle || offered?.course?.title || offered?.title || "Unknown Course";
      courseCode = courseCode || offered?.course?.code || offered?.code || "N/A";
      courseDepartment = courseDepartment || offered?.course?.department || "Unknown Department";
    }

    return { courseTitle, courseCode, courseDepartment };
  };

  const filteredAndSortedGrades = () => {
    let filtered = grades.filter(grade => {
      const { courseTitle, courseCode } = getCourseInfo(grade);
      return courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
             courseCode.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Sort grades
    filtered.sort((a, b) => {
      const aInfo = getCourseInfo(a);
      const bInfo = getCourseInfo(b);
      
      switch (sortBy) {
        case "course":
          return aInfo.courseTitle.localeCompare(bInfo.courseTitle);
        case "grade":
          return (b.grade || '').localeCompare(a.grade || '');
        case "date":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const sortedGrades = filteredAndSortedGrades();
  const gpa = getGPA();

  return (
    <div className={`max-w-4xl mx-auto px-4 py-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
            <FaGraduationCap className="text-2xl text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">My Grades</h1>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              View your academic performance and course grades
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      {grades.length > 0 && (
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
              <option value="course">Course Name</option>
              <option value="grade">Grade</option>
              <option value="date">Date</option>
            </select>
          </div>
        </div>
      )}

      {/* GPA Summary */}
      {grades.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-8"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FaChartBar /> Academic Summary
            </h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* GPA */}
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {gpa}
                </div>
                <div className="text-sm font-semibold text-blue-800 dark:text-blue-400">
                  GPA
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Current Semester
                </div>
              </div>

              {/* Total Courses */}
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-xl border border-green-200 dark:border-green-800">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {sortedGrades.length}
                </div>
                <div className="text-sm font-semibold text-green-800 dark:text-green-400">
                  Courses
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Graded
                </div>
              </div>

              {/* A Grades */}
              <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 rounded-xl border border-yellow-200 dark:border-yellow-800">
                <div className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                  {sortedGrades.filter(g => ['A+', 'A', 'A-'].includes(g.grade?.toString().toUpperCase())).length}
                </div>
                <div className="text-sm font-semibold text-yellow-800 dark:text-yellow-400">
                  A Grades
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Excellent
                </div>
              </div>

              {/* F Grades */}
              <div className="text-center p-6 bg-gradient-to-br from-red-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 rounded-xl border border-red-200 dark:border-red-800">
                <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">
                  {sortedGrades.filter(g => ['F'].includes(g.grade?.toString().toUpperCase())).length}
                </div>
                <div className="text-sm font-semibold text-red-800 dark:text-red-400">
                  F Grades
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Needs Improvement
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* No Grades State */}
      {sortedGrades.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <FaGraduationCap className="text-4xl text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
            {searchTerm ? 'No Matching Grades' : 'No Grades Available'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {searchTerm 
              ? 'No grades match your search criteria.' 
              : 'Your grades will appear here once they are available.'}
          </p>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {sortedGrades.map((g, index) => {
            const { courseTitle, courseCode, courseDepartment } = getCourseInfo(g);
            
            return (
              <motion.div
                key={g._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                {/* Grade Header */}
                <div
                  className="cursor-pointer transition-colors duration-200"
                  onClick={() => setExpandedGrade(expandedGrade === g._id ? null : g._id)}
                >
                  <div className={`p-6 ${darkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          {getGradeIcon(g.grade)}
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                              {courseTitle}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {courseCode} • {courseDepartment}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className={`text-3xl font-bold ${getGradeColor(g.grade)}`}>
                            {g.grade || 'N/A'}
                          </div>
                          {g.createdAt && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              Graded on {formatDate(g.createdAt)}
                            </div>
                          )}
                        </div>
                        
                        <div className="text-2xl transition-transform duration-200 ml-4">
                          {expandedGrade === g._id ? (
                            <FaChevronUp className="text-blue-500" />
                          ) : (
                            <FaChevronDown className="text-blue-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedGrade === g._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-6 pt-4 border-t border-gray-200 dark:border-gray-700"
                    >
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                            <div className="text-sm font-medium text-blue-800 dark:text-blue-400">Course</div>
                            <div className="text-lg font-bold text-blue-700 dark:text-blue-300">
                              {courseTitle}
                            </div>
                          </div>
                          <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
                            <div className="text-sm font-medium text-purple-800 dark:text-purple-400">Course Code</div>
                            <div className="text-lg font-bold text-purple-700 dark:text-purple-300">
                              {courseCode}
                            </div>
                          </div>
                          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
                            <div className="text-sm font-medium text-green-800 dark:text-green-400">Department</div>
                            <div className="text-lg font-bold text-green-700 dark:text-green-300">
                              {courseDepartment}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-xl">
                            <div className="text-sm font-medium text-yellow-800 dark:text-yellow-400">Final Grade</div>
                            <div className={`text-3xl font-bold ${getGradeColor(g.grade)}`}>
                              {g.grade || 'N/A'}
                            </div>
                          </div>
                          
                          {g.createdAt && (
                            <div className="p-4 bg-gray-50 dark:bg-gray-900/30 rounded-xl">
                              <div className="text-sm font-medium text-gray-800 dark:text-gray-400">Date Graded</div>
                              <div className="text-lg font-bold text-gray-700 dark:text-gray-300">
                                {formatDate(g.createdAt)}
                              </div>
                            </div>
                          )}
                        </div>

                        {g.remarks && (
                          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border-l-4 border-blue-500">
                            <h4 className="text-lg font-semibold mb-2 text-blue-800 dark:text-blue-400 flex items-center gap-2">
                              <FaRegFileAlt /> Instructor Remarks
                            </h4>
                            <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                              {g.remarks}
                            </p>
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

      {/* Statistics */}
      {grades.length > 0 && (
        <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">Grade Distribution</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {sortedGrades.filter(g => ['A+', 'A', 'A-'].includes(g.grade?.toString().toUpperCase())).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">A Grades</div>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {sortedGrades.filter(g => ['B+', 'B', 'B-'].includes(g.grade?.toString().toUpperCase())).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">B Grades</div>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-xl">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {sortedGrades.filter(g => ['C+', 'C', 'C-'].includes(g.grade?.toString().toUpperCase())).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">C Grades</div>
            </div>
            <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-xl">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {sortedGrades.filter(g => ['D+', 'D'].includes(g.grade?.toString().toUpperCase())).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">D Grades</div>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-xl">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {sortedGrades.filter(g => ['F'].includes(g.grade?.toString().toUpperCase())).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">F Grades</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Add Chevron icons
const FaChevronUp = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
  </svg>
);

const FaChevronDown = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

export default StudentGrades;