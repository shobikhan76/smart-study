import React , {useState} from "react";
import { 
  FaBook, 
  FaEdit, 
  FaTrash, 
  FaCheckCircle, 
  FaExclamationTriangle,
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaRegStar
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const AdminCourses = ({
  courses = [],
  courseForm,
  handleCourseChange,
  handleCourseSubmit,
  handleEditCourse,
  handleDeleteCourse,
  darkMode = false
}) => {
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`max-w-4xl mx-auto px-4 py-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-3 rounded-xl shadow-lg">
            <FaBook className="text-2xl text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Manage Courses</h1>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Create, edit, and manage academic courses
            </p>
          </div>
        </div>
      </div>

      {/* Create Course Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-8"
      >
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FaRegStar /> Create New Course
          </h2>
        </div>
        
        <form onSubmit={handleCourseSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Course Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter course title"
                value={courseForm.title}
                onChange={handleCourseChange}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                required
              />
            </div>
            
            {/* Code */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Course Code
              </label>
              <input
                type="text"
                name="code"
                placeholder="Enter course code"
                value={courseForm.code}
                onChange={handleCourseChange}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                required
              />
            </div>
            
            {/* Department */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Department
              </label>
              <input
                type="text"
                name="department"
                placeholder="Enter department"
                value={courseForm.department}
                onChange={handleCourseChange}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!courseForm.title || !courseForm.code || !courseForm.department}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg transform transition-all duration-200 hover:scale-105 flex items-center gap-2"
            >
              <FaRegStar /> Create Course
            </button>
          </div>
        </form>
      </motion.div>

      {/* Search Bar */}
      {courses.length > 5 && (
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                darkMode 
                  ? 'border-gray-600 focus:border-purple-500 focus:ring-purple-500 bg-gray-800 text-white' 
                  : 'border-gray-300 focus:border-purple-500 focus:ring-purple-300'
              }`}
            />
          </div>
        </div>
      )}

      {/* All Courses Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <FaBook /> All Courses
          </h3>
          <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
            {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
          </span>
        </div>

        {filteredCourses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <FaBook className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              {searchTerm ? 'No Matching Courses' : 'No Courses Yet'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm 
                ? 'No courses match your search criteria.' 
                : 'No courses have been created yet.'}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {filteredCourses.map((c, index) => (
              <motion.div
                key={c._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                {/* Course Header */}
                <div
                  className="cursor-pointer transition-colors duration-200"
                  onClick={() => setExpandedCourse(expandedCourse === c._id ? null : c._id)}
                >
                  <div className={`p-6 ${darkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                            {c.title}
                          </h4>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
                            {c.code}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <FaBook className="text-blue-500" />
                            <span>Department: {c.department}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditCourse(c);
                          }}
                          className="text-blue-500 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors duration-200"
                          title="Edit course"
                        >
                          <FaEdit className="text-lg" />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCourse(c._id);
                          }}
                          className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors duration-200"
                          title="Delete course"
                        >
                          <FaTrash className="text-lg" />
                        </button>
                        
                        <div className="text-2xl transition-transform duration-200">
                          {expandedCourse === c._id ? (
                            <FaChevronUp className="text-purple-500" />
                          ) : (
                            <FaChevronDown className="text-purple-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedCourse === c._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-6 pt-4 border-t border-gray-200 dark:border-gray-700"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h5 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                            <FaBook /> Course Details
                          </h5>
                          
                          <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                              <FaBook className="text-purple-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Course Title</p>
                                <p className="text-gray-800 dark:text-gray-100">{c.title}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                              <FaBook className="text-purple-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Course Code</p>
                                <p className="text-gray-800 dark:text-gray-100">{c.code}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                              <FaBook className="text-purple-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Department</p>
                                <p className="text-gray-800 dark:text-gray-100">{c.department}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                            <FaRegStar /> Management
                          </h5>
                          
                          <div className="space-y-4">
                            <button
                              onClick={() => handleEditCourse(c)}
                              className="w-full flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors duration-200"
                            >
                              <FaEdit className="text-blue-600 dark:text-blue-400" />
                              <div>
                                <p className="text-sm font-medium text-blue-800 dark:text-blue-400">Edit Course</p>
                                <p className="text-sm text-blue-700 dark:text-blue-300">Modify course details</p>
                              </div>
                            </button>
                            
                            <button
                              onClick={() => handleDeleteCourse(c._id)}
                              className="w-full flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors duration-200"
                            >
                              <FaTrash className="text-red-600 dark:text-red-400" />
                              <div>
                                <p className="text-sm font-medium text-red-800 dark:text-red-400">Delete Course</p>
                                <p className="text-sm text-red-700 dark:text-red-300">Remove this course</p>
                              </div>
                            </button>
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
              <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{courses.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Courses</div>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {new Set(courses.map(c => c.department)).size}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Departments</div>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {courses.reduce((total, c) => total + (c.credits || 3), 0)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Credits</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCourses;