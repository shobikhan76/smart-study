import React , {useState }from "react";
import { 
  FaUserGraduate, 
  FaEnvelope, 
  FaCalendarAlt, 
  FaCity, 
  FaSchool, 
  FaBook, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaExclamationTriangle,
  FaSave,
  FaTimes,
  FaSearch,
  FaEdit,
  FaTrash,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const AdminApplications = ({
  applications = [],
  editingApplication,
  applicationForm,
  handleEditApplication,
  handleApplicationFormChange,
  handleDeleteApplication,
  setEditingApplication,
  handleApplicationUpdate,
  darkMode = false
}) => {
  const [expandedApplication, setExpandedApplication] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return { 
          text: "Approved", 
          color: "bg-green-100 text-green-800 border-green-200", 
          icon: <FaCheckCircle className="text-green-600" /> 
        };
      case "rejected":
        return { 
          text: "Rejected", 
          color: "bg-red-100 text-red-800 border-red-200", 
          icon: <FaTimesCircle className="text-red-600" /> 
        };
      case "pending":
        return { 
          text: "Pending", 
          color: "bg-purple-100 text-purple-800 border-purple-200", 
          icon: <FaExclamationTriangle className="text-purple-600" /> 
        };
      default:
        return { text: "Unknown", color: "bg-gray-100 text-gray-800 border-gray-200", icon: null };
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || app.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className={`max-w-6xl mx-auto px-4 py-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-3 rounded-xl shadow-lg">
            <FaUserGraduate className="text-2xl text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Admission Applications</h1>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Review and manage student admission requests
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
              darkMode 
                ? 'border-gray-600 focus:border-purple-500 focus:ring-purple-500 bg-gray-800 text-white' 
                : 'border-gray-300 focus:border-purple-500 focus:ring-purple-300'
            }`}
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Status:
          </span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
              darkMode 
                ? 'border-gray-600 focus:border-purple-500 focus:ring-purple-500 bg-gray-800 text-white' 
                : 'border-gray-300 focus:border-purple-500 focus:ring-purple-300'
            }`}
          >
            <option value="all">All Applications</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Edit Application Form */}
      {editingApplication && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-8"
        >
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FaEdit /> Edit Application
            </h2>
          </div>
          
          <form onSubmit={handleApplicationUpdate} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Info */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <FaUserGraduate className="inline mr-2 text-purple-600" /> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={applicationForm.name}
                  onChange={handleApplicationFormChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <FaEnvelope className="inline mr-2 text-blue-600" /> Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={applicationForm.email}
                  onChange={handleApplicationFormChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <FaUserGraduate className="inline mr-2 text-purple-600" /> Father's Name
                </label>
                <input
                  type="text"
                  name="fatherName"
                  value={applicationForm.fatherName}
                  onChange={handleApplicationFormChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <FaCalendarAlt className="inline mr-2 text-green-600" /> Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={applicationForm.dateOfBirth}
                  onChange={handleApplicationFormChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <FaCity className="inline mr-2 text-yellow-600" /> City
                </label>
                <input
                  type="text"
                  name="city"
                  value={applicationForm.city}
                  onChange={handleApplicationFormChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <FaSchool className="inline mr-2 text-red-600" /> Previous School
                </label>
                <input
                  type="text"
                  name="previousSchool"
                  value={applicationForm.previousSchool}
                  onChange={handleApplicationFormChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <FaBook className="inline mr-2 text-indigo-600" /> Board
                </label>
                <input
                  type="text"
                  name="board"
                  value={applicationForm.board}
                  onChange={handleApplicationFormChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <FaBook className="inline mr-2 text-indigo-600" /> Marks
                </label>
                <input
                  type="number"
                  name="marks"
                  value={applicationForm.marks}
                  onChange={handleApplicationFormChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <FaBook className="inline mr-2 text-indigo-600" /> Passing Year
                </label>
                <input
                  type="number"
                  name="passingYear"
                  value={applicationForm.passingYear}
                  onChange={handleApplicationFormChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <FaExclamationTriangle className="inline mr-2 text-orange-600" /> Status
                </label>
                <select
                  name="status"
                  value={applicationForm.status}
                  onChange={handleApplicationFormChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <FaEdit className="inline mr-2 text-gray-600" /> Message to Applicant
              </label>
              <textarea
                name="message"
                placeholder="Optional message to applicant..."
                value={applicationForm.message}
                onChange={handleApplicationFormChange}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none resize-none bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-purple-700 hover:to-indigo-700 font-semibold shadow-lg transform transition-all duration-200 hover:scale-105 flex items-center gap-2"
              >
                <FaSave /> Update Application
              </button>
              <button
                type="button"
                onClick={() => setEditingApplication(null)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-8 py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center gap-2"
              >
                <FaTimes /> Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Applications List */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <FaSearch /> All Applications
          </h3>
          <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
            {filteredApplications.length} {filteredApplications.length === 1 ? 'application' : 'applications'}
          </span>
        </div>

        {filteredApplications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <FaUserGraduate className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              {searchTerm || filterStatus !== 'all' ? 'No Matching Applications' : 'No Applications Yet'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm || filterStatus !== 'all' 
                ? 'No applications match your search criteria.' 
                : 'No admission applications have been submitted yet.'}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {filteredApplications.map((app, index) => {
              const statusConfig = getStatusConfig(app.status);
              
              return (
                <motion.div
                  key={app._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl"
                >
                  {/* Application Header */}
                  <div
                    className="cursor-pointer transition-colors duration-200"
                    onClick={() => setExpandedApplication(expandedApplication === app._id ? null : app._id)}
                  >
                    <div className={`p-6 ${darkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                              {app.name}
                            </h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig.color}`}>
                              {statusConfig.icon} {statusConfig.text}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <FaEnvelope className="text-blue-500" />
                              <span>{app.email}</span>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <FaBook className="text-indigo-500" />
                              <span>{app.department}</span>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <FaCity className="text-yellow-500" />
                              <span>{app.city}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-2xl transition-transform duration-200">
                            {expandedApplication === app._id ? (
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
                    {expandedApplication === app._id && (
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
                              <FaUserGraduate /> Personal Information
                            </h5>
                            
                            <div className="space-y-3">
                              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                                <FaUserGraduate className="text-purple-500" />
                                <div>
                                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</p>
                                  <p className="text-gray-800 dark:text-gray-100">{app.name}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                                <FaUserGraduate className="text-purple-500" />
                                <div>
                                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Father's Name</p>
                                  <p className="text-gray-800 dark:text-gray-100">{app.fatherName}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                                <FaCalendarAlt className="text-green-500" />
                                <div>
                                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</p>
                                  <p className="text-gray-800 dark:text-gray-100">{formatDate(app.dateOfBirth)}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                                <FaCity className="text-yellow-500" />
                                <div>
                                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">City</p>
                                  <p className="text-gray-800 dark:text-gray-100">{app.city}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Academic Information */}
                          <div>
                            <h5 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                              <FaBook /> Academic Information
                            </h5>
                            
                            <div className="space-y-3">
                              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                                <FaSchool className="text-red-500" />
                                <div>
                                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Previous School</p>
                                  <p className="text-gray-800 dark:text-gray-100">{app.previousSchool}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                                <FaBook className="text-indigo-500" />
                                <div>
                                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Board</p>
                                  <p className="text-gray-800 dark:text-gray-100">{app.board}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                                <FaBook className="text-indigo-500" />
                                <div>
                                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Marks</p>
                                  <p className="text-gray-800 dark:text-gray-100">{app.marks}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                                <FaBook className="text-indigo-500" />
                                <div>
                                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Passing Year</p>
                                  <p className="text-gray-800 dark:text-gray-100">{app.passingYear}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Status and Actions */}
                        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <span className="font-semibold text-gray-700 dark:text-gray-300">Current Status:</span>
                              <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${statusConfig.color}`}>
                                {statusConfig.icon} {statusConfig.text}
                              </span>
                            </div>
                            
                            <div className="flex gap-3">
                              <button
                                onClick={() => handleEditApplication(app)}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                              >
                                <FaEdit /> Edit
                              </button>
                              <button
                                onClick={() => handleDeleteApplication(app._id)}
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
              );
            })}
          </div>
        )}

        {/* Statistics */}
        {applications.length > 0 && (
          <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">Application Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {applications.filter(a => a.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {applications.filter(a => a.status === 'approved').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Approved</div>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-xl">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {applications.filter(a => a.status === 'rejected').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Rejected</div>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{applications.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Applications</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminApplications;