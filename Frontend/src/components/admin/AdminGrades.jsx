import React from "react";
import { 
  FaChartBar, 
  FaUserGraduate, 
  FaBook, 
  FaStar, 
  FaExclamationCircle, 
  FaCheckCircle,
  FaSearch,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const AdminGrades = ({ grades = [], message, darkMode = false }) => {
  const [expandedGrade, setExpandedGrade] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGrade, setFilterGrade] = useState("all");

  const filteredGrades = grades.filter(grade => {
    const matchesSearch = grade.student?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.course?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGrade = filterGrade === "all" || grade.grade === filterGrade;
    
    return matchesSearch && matchesGrade;
  });

  const getGradeColor = (grade) => {
    if (!grade) return 'bg-gray-100 text-gray-800 border-gray-200';
    const gradeStr = grade.toString().toUpperCase();
    if (['A+', 'A', 'A-'].includes(gradeStr)) return 'bg-green-100 text-green-800 border-green-200';
    if (['B+', 'B', 'B-'].includes(gradeStr)) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (['C+', 'C', 'C-'].includes(gradeStr)) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (['D+', 'D', 'F'].includes(gradeStr)) return 'bg-red-100 text-red-800 border-red-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getGPA = () => {
    if (filteredGrades.length === 0) return 0;
    
    const gradePoints = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'F': 0.0
    };
    
    const totalPoints = filteredGrades.reduce((sum, g) => {
      const grade = g.grade?.toString().toUpperCase();
      return sum + (gradePoints[grade] || 0);
    }, 0);
    
    return (totalPoints / filteredGrades.length).toFixed(2);
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-3 rounded-xl shadow-lg">
            <FaChartBar className="text-2xl text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Student Grades</h1>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              View and manage academic performance records
            </p>
          </div>
        </div>
      </div>

      {/* Message Alert */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-xl text-sm font-medium flex items-center gap-2 transition-all duration-300 ${
            message.includes("success") || message.includes("updated") || message.includes("assigned")
              ? "bg-green-100 text-green-800 border border-green-200" 
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {message.includes("success") || message.includes("updated") || message.includes("assigned") ? (
            <FaCheckCircle className="text-lg" />
          ) : (
            <FaExclamationCircle className="text-lg" />
          )}
          {message.replace("✅", "").replace("❌", "").trim()}
        </motion.div>
      )}

      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search grades..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
              darkMode 
                ? 'border-gray-600 focus:border-purple-500 focus:ring-purple-500 bg-gray-800 text-white' 
                : 'border-gray-300 focus:border-purple-500 focus:ring-purple-300'
            }`}
          />
        </div>

        {/* Grade Filter */}
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Grade:
          </span>
          <select
            value={filterGrade}
            onChange={(e) => setFilterGrade(e.target.value)}
            className={`px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
              darkMode 
                ? 'border-gray-600 focus:border-purple-500 focus:ring-purple-500 bg-gray-800 text-white' 
                : 'border-gray-300 focus:border-purple-500 focus:ring-purple-300'
            }`}
          >
            <option value="all">All Grades</option>
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="B-">B-</option>
            <option value="C+">C+</option>
            <option value="C">C</option>
            <option value="C-">C-</option>
            <option value="D">D</option>
            <option value="F">F</option>
          </select>
        </div>
      </div>

      {/* Grades List */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <FaChartBar /> All Grades
          </h3>
          <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
            {filteredGrades.length} {filteredGrades.length === 1 ? 'grade' : 'grades'}
          </span>
        </div>

        {filteredGrades.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <FaChartBar className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              {searchTerm || filterGrade !== 'all' ? 'No Matching Grades' : 'No Grades Yet'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm || filterGrade !== 'all' 
                ? 'No grades match your search criteria.' 
                : 'No grades have been entered yet.'}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {filteredGrades.map((g, index) => (
              <motion.div
                key={g._id}
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
                          <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                            {g.student || "Unknown Student"}
                          </h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getGradeColor(g.grade)}`}>
                            {g.grade || 'N/A'}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <FaBook className="text-blue-500" />
                            <span>{g.course || "Unnamed Course"}</span>
                          </div>
                          
                          {g.createdAt && (
                            <div className="flex items-center gap-1">
                              <FaChartBar className="text-gray-500" />
                              <span>
                                Graded on: {new Date(g.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-2xl transition-transform duration-200">
                        {expandedGrade === g._id ? (
                          <FaChevronUp className="text-purple-500" />
                        ) : (
                          <FaChevronDown className="text-purple-500" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedGrade === g._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-6 pt-4 border-t border-gray-200 dark:border-gray-700"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Student Information */}
                        <div>
                          <h5 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                            <FaUserGraduate /> Student Information
                          </h5>
                          
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                              <FaUserGraduate className="text-purple-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Student Name</p>
                                <p className="text-gray-800 dark:text-gray-100">{g.student || "Unknown Student"}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                              <FaBook className="text-blue-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Course</p>
                                <p className="text-gray-800 dark:text-gray-100">{g.course || "Unnamed Course"}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                              <FaStar className="text-yellow-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Grade</p>
                                <p className="text-gray-800 dark:text-gray-100">{g.grade || "N/A"}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Grade Details */}
                        <div>
                          <h5 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                            <FaChartBar /> Grade Details
                          </h5>
                          
                          <div className="space-y-6">
                            {/* Grade Value */}
                            <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg border border-purple-200 dark:border-purple-800">
                              <FaStar className="text-yellow-500" />
                              <div>
                                <p className="text-sm font-medium text-purple-800 dark:text-purple-400">Grade Value</p>
                                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                                  {g.grade || "N/A"}
                                </p>
                              </div>
                            </div>
                            
                            {/* Remarks */}
                            {g.remarks && (
                              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
                                <p className="text-sm font-medium text-blue-800 dark:text-blue-400 mb-2">Remarks</p>
                                <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                                  {g.remarks}
                                </p>
                              </div>
                            )}
                            
                            {/* Grading Date */}
                            {g.createdAt && (
                              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-800">
                                <FaChartBar className="text-green-500" />
                                <div>
                                  <p className="text-sm font-medium text-green-800 dark:text-green-400">Graded On</p>
                                  <p className="text-green-700 dark:text-green-300">
                                    {new Date(g.createdAt).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </p>
                                </div>
                              </div>
                            )}
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
        {grades.length > 0 && (
          <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">Grade Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {grades.filter(g => ['A+', 'A', 'A-'].includes(g.grade?.toString().toUpperCase())).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">A Grades</div>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {grades.filter(g => ['B+', 'B', 'B-'].includes(g.grade?.toString().toUpperCase())).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">B Grades</div>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-xl">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {grades.filter(g => ['C+', 'C', 'C-'].includes(g.grade?.toString().toUpperCase())).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">C Grades</div>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-xl">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {grades.filter(g => ['D+', 'D'].includes(g.grade?.toString().toUpperCase())).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">D Grades</div>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-xl">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {grades.filter(g => ['F'].includes(g.grade?.toString().toUpperCase())).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">F Grades</div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-500" />
                <div>
                  <p className="text-lg font-bold text-purple-700 dark:text-purple-400">
                    Average GPA: {getGPA()}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Based on {grades.length} grades
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGrades;