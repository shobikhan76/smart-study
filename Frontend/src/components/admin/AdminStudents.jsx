import React , {useState} from "react";
import { 
  FaUserGraduate,
  FaUser,
  FaEnvelope,
  FaKey,
  FaBuilding,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaTrash,
  FaPlus,
  FaList,
  FaCheckCircle,
  FaExclamationTriangle,
  FaChevronDown,
  FaChevronUp,
  FaSearch
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const AdminStudents = ({
  students = [],
  studentForm,
  handleStudentFormChange,
  handleStudentSubmit,
  handleEditStudent,
  handleDeleteStudent,
  editingStudent,
  setEditingStudent,
  darkMode = false
}) => {
  const [expandedStudent, setExpandedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter(student => 
    student.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.user?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`max-w-6xl mx-auto px-4 py-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-3 rounded-xl shadow-lg">
            <FaUserGraduate className="text-2xl text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Manage Students</h1>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Add, edit, and manage student records
            </p>
          </div>
        </div>
      </div>

      {/* Student Form */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-8"
      >
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FaPlus /> {editingStudent ? 'Edit' : 'Add'} Student
          </h2>
        </div>
        
        <form onSubmit={handleStudentSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <FaUser className="inline mr-2 text-purple-600" /> Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter student's full name"
                value={studentForm.name}
                onChange={handleStudentFormChange}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                required
              />
            </div>
            
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <FaEnvelope className="inline mr-2 text-blue-600" /> Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={studentForm.email}
                onChange={handleStudentFormChange}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                required
              />
            </div>
            
            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <FaKey className="inline mr-2 text-red-600" /> Password
              </label>
              <input
                type="password"
                name="password"
                placeholder={editingStudent ? "Leave blank to keep current password" : "Create password"}
                value={studentForm.password}
                onChange={handleStudentFormChange}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                required={!editingStudent}
              />
            </div>
            
            {/* Registration Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <FaUserGraduate className="inline mr-2 text-green-600" /> Registration Number
              </label>
              <input
                type="text"
                name="registrationNumber"
                placeholder="e.g., STU2024001"
                value={studentForm.registrationNumber}
                onChange={handleStudentFormChange}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                required
              />
            </div>
            
            {/* Department */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <FaBuilding className="inline mr-2 text-yellow-600" /> Department
              </label>
              <input
                type="text"
                name="department"
                placeholder="e.g., Computer Science"
                value={studentForm.department}
                onChange={handleStudentFormChange}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                required
              />
            </div>
            
            {/* Contact */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <FaPhone className="inline mr-2 text-indigo-600" /> Contact
              </label>
              <input
                type="text"
                name="contact"
                placeholder="e.g., +62 812-3456-7890"
                value={studentForm.contact}
                onChange={handleStudentFormChange}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                required
              />
            </div>
            
            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <FaMapMarkerAlt className="inline mr-2 text-red-600" /> Address
              </label>
              <textarea
                name="address"
                placeholder="Enter full address"
                value={studentForm.address}
                onChange={handleStudentFormChange}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none resize-none bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="submit"
              disabled={!studentForm.name || !studentForm.email || !studentForm.registrationNumber || !studentForm.department || !studentForm.contact || !studentForm.address}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg transform transition-all duration-200 hover:scale-105 flex items-center gap-2"
            >
              <FaPlus /> {editingStudent ? 'Update Student' : 'Create Student'}
            </button>
            
            {editingStudent && (
              <button
                type="button"
                onClick={() => {
                  setEditingStudent(null);
                  setStudentForm({
                    name: "",
                    email: "",
                    password: "",
                    registrationNumber: "",
                    department: "",
                    contact: "",
                    address: "",
                    courses: [],
                  });
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-8 py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center gap-2"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </motion.div>

      {/* Search Bar */}
      {students.length > 5 && (
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search students..."
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

      {/* Students List */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <FaList /> All Students
          </h3>
          <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
            {filteredStudents.length} {filteredStudents.length === 1 ? 'student' : 'students'}
          </span>
        </div>

        {filteredStudents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <FaUserGraduate className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              {searchTerm ? 'No Matching Students' : 'No Students Yet'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm 
                ? 'No students match your search criteria.' 
                : 'No students have been registered yet.'}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {filteredStudents.map((s, index) => (
              <motion.div
                key={s._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                {/* Student Header */}
                <div
                  className="cursor-pointer transition-colors duration-200"
                  onClick={() => setExpandedStudent(expandedStudent === s._id ? null : s._id)}
                >
                  <div className={`p-6 ${darkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                            {s.user?.name || "Unknown"}
                          </h4>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
                            {s.registrationNumber || "N/A"}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <FaEnvelope className="text-blue-500" />
                            <span>{s.user?.email || "—"}</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <FaBuilding className="text-yellow-500" />
                            <span>{s.department || "—"}</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <FaPhone className="text-indigo-500" />
                            <span>{s.contact || "—"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditStudent(s);
                          }}
                          className="text-blue-500 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors duration-200"
                          title="Edit student"
                        >
                          <FaEdit className="text-lg" />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteStudent(s._id);
                          }}
                          className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors duration-200"
                          title="Delete student"
                        >
                          <FaTrash className="text-lg" />
                        </button>
                        
                        <div className="text-2xl transition-transform duration-200">
                          {expandedStudent === s._id ? (
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
                  {expandedStudent === s._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-6 pt-4 border-t border-gray-200 dark:border-gray-700"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Personal Information */}
                        <div>
                          <h5 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                            <FaUser /> Personal Information
                          </h5>
                          
                          <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                              <FaUser className="text-purple-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</p>
                                <p className="text-gray-800 dark:text-gray-100">{s.user?.name || "Unknown"}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                              <FaUserGraduate className="text-green-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Registration Number</p>
                                <p className="text-gray-800 dark:text-gray-100">{s.registrationNumber || "—"}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                              <FaEnvelope className="text-blue-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</p>
                                <p className="text-gray-800 dark:text-gray-100">{s.user?.email || "—"}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                              <FaPhone className="text-indigo-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Contact</p>
                                <p className="text-gray-800 dark:text-gray-100">{s.contact || "—"}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Academic Information */}
                        <div>
                          <h5 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                            <FaBook /> Academic Information
                          </h5>
                          
                          <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                              <FaBuilding className="text-yellow-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Department</p>
                                <p className="text-gray-800 dark:text-gray-100">{s.department || "—"}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                              <FaMapMarkerAlt className="text-red-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Address</p>
                                <p className="text-gray-800 dark:text-gray-100">{s.address || "—"}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                              <FaUserGraduate className="text-purple-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Courses</p>
                                <p className="text-gray-800 dark:text-gray-100">
                                  {s.courses?.length || 0} courses enrolled
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Created: {new Date(s.createdAt).toLocaleDateString()}
                            </p>
                            {s.updatedAt && s.updatedAt !== s.createdAt && (
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Updated: {new Date(s.updatedAt).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleEditStudent(s)}
                              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                            >
                              <FaEdit /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteStudent(s._id)}
                              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                            >
                              <FaTrash /> Delete
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
        {students.length > 0 && (
          <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">Student Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{students.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Students</div>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {new Set(students.map(s => s.department)).size}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Departments</div>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {students.filter(s => s.courses?.length > 0).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Enrolled Students</div>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-xl">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {students.reduce((total, s) => total + (s.courses?.length || 0), 0)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Enrollments</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminStudents;