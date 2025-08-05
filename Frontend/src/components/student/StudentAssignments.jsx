import React from "react";
import { 
  FaTasks, 
  FaBook, 
  FaUpload, 
  FaDownload, 
  FaRegFilePdf, 
  FaCheckCircle, 
  FaClock, 
  FaExclamationTriangle,
  FaStar,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const StudentAssignments = ({
  assignments = [],
  courses = [],
  assignmentForm,
  handleAssignmentChange,
  handleAssignmentSubmit,
  handleFileChange,
  darkMode = false
}) => {
  const [expandedAssignment, setExpandedAssignment] = React.useState(null);
  const [dragActive, setDragActive] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const fileInputRef = React.useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + 10;
      });
    }, 200);

    try {
      await handleAssignmentSubmit(e);
      // Complete progress
      setTimeout(() => {
        setUploadProgress(100);
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const posted = new Date(dateString);
    const diffMs = now - posted;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getAssignmentStatus = (assignment) => {
    if (assignment.marks !== undefined) return "graded";
    if (assignment.fileUrl) return "submitted";
    
    const daysRemaining = getDaysRemaining(assignment.dueDate);
    return daysRemaining < 0 ? "overdue" : "pending";
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "graded":
        return { 
          text: "Graded", 
          color: "bg-green-100 text-green-800 border-green-200", 
          icon: <FaCheckCircle className="text-green-600" /> 
        };
      case "submitted":
        return { 
          text: "Submitted", 
          color: "bg-blue-100 text-blue-800 border-blue-200", 
          icon: <FaUpload className="text-blue-600" /> 
        };
      case "overdue":
        return { 
          text: "Overdue", 
          color: "bg-red-100 text-red-800 border-red-200", 
          icon: <FaExclamationTriangle className="text-red-600" /> 
        };
      case "pending":
        return { 
          text: "Pending", 
          color: "bg-purple-100 text-purple-800 border-purple-200", 
          icon: <FaClock className="text-purple-600" /> 
        };
      default:
        return { text: "Unknown", color: "bg-gray-100 text-gray-800 border-gray-200", icon: null };
    }
  };

  return (
    <div className={`max-w-4xl mx-auto px-4 py-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-3 rounded-xl shadow-lg">
            <FaTasks className="text-2xl text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Assignments</h1>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Submit your assignments and track your progress
            </p>
          </div>
        </div>
      </div>

      {/* Submit Assignment Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-8"
      >
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FaUpload /> Submit New Assignment
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Course Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <FaBook className="inline mr-2 text-purple-600" /> Select Course
              </label>
              <select
                name="course"
                value={assignmentForm.course || ""}
                onChange={handleAssignmentChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              >
                <option value="">Choose a course</option>
                {courses.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.course?.title || c.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Assignment Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter assignment title"
                value={assignmentForm.title || ""}
                onChange={handleAssignmentChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Provide details about your assignment..."
              value={assignmentForm.description || ""}
              onChange={handleAssignmentChange}
              required
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-purple-500 focus:outline-none resize-none bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <FaRegFilePdf className="inline mr-2 text-red-600" /> PDF File
            </label>
            
            <div
              className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl transition-colors duration-200 cursor-pointer
                ${dragActive ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-300 hover:border-gray-400'}
                ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={onButtonClick}
              tabIndex={0}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="application/pdf"
                onChange={handleChange}
                disabled={isSubmitting}
              />
              
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FaRegFilePdf className="text-4xl text-gray-400 mb-3" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">PDF files only (MAX. 10MB)</p>
              </div>
            </div>

            {/* File name display */}
            {assignmentForm.pdf && (
              <div className="mt-3 flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <FaRegFilePdf className="text-red-600" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate flex-1">
                    {assignmentForm.pdf.name}
                  </span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {Math.round(assignmentForm.pdf.size / 1024)} KB
                </span>
              </div>
            )}

            {/* Upload Progress */}
            {isSubmitting && (
              <div className="mt-3">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <span>Submitting...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!assignmentForm.course || !assignmentForm.title || !assignmentForm.description || !assignmentForm.pdf || isSubmitting}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg transform transition-all duration-200 hover:scale-105 flex items-center gap-2"
            >
              <FaUpload /> {isSubmitting ? 'Submitting...' : 'Submit Assignment'}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Assignments List */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <FaTasks /> My Assignments
          </h3>
          <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
            {assignments.length} {assignments.length === 1 ? 'assignment' : 'assignments'}
          </span>
        </div>

        {assignments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <FaTasks className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              No Assignments Yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Your instructors haven't assigned any assignments yet.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {assignments.map((a) => {
              const status = getAssignmentStatus(a);
              const statusConfig = getStatusConfig(status);
              const daysRemaining = getDaysRemaining(a.dueDate);

              return (
                <motion.div
                  key={a._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl"
                >
                  {/* Assignment Header */}
                  <div
                    className="cursor-pointer transition-colors duration-200"
                    onClick={() => setExpandedAssignment(expandedAssignment === a._id ? null : a._id)}
                  >
                    <div className={`p-6 ${darkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                              {a.title}
                            </h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig.color}`}>
                              {statusConfig.icon} {statusConfig.text}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <FaBook className="text-blue-500" />
                              <span>{a.course?.title}</span>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <FaClock className="text-gray-500" />
                              <span>
                                Due: {formatDate(a.dueDate)}
                              </span>
                            </div>
                            
                            {daysRemaining > 0 && status !== 'graded' && status !== 'submitted' && (
                              <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                                <FaClock />
                                <span>{daysRemaining} days left</span>
                              </div>
                            )}
                            
                            {daysRemaining < 0 && status === 'pending' && (
                              <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                                <FaExclamationTriangle />
                                <span>Overdue</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="text-2xl transition-transform duration-200">
                          {expandedAssignment === a._id ? (
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
                    {expandedAssignment === a._id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-6 pt-4 border-t border-gray-200 dark:border-gray-700"
                      >
                        <div className="space-y-6">
                          {/* Description */}
                          <div>
                            <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</h5>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{a.description}</p>
                          </div>

                          {/* Files */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {a.fileUrl && (
                              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
                                <FaRegFilePdf className="text-red-600" />
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-blue-800 dark:text-blue-400">Your Submission</p>
                                  <a
                                    href={a.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                                  >
                                    View PDF
                                  </a>
                                </div>
                              </div>
                            )}

                            {a.replyFileUrl && (
                              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-800">
                                <FaRegFilePdf className="text-red-600" />
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-green-800 dark:text-green-400">Teacher Feedback</p>
                                  <a
                                    href={a.replyFileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-600 dark:text-green-400 hover:underline text-sm"
                                  >
                                    View Feedback PDF
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Grading Information */}
                          {a.marks !== undefined && (
                            <div className="border-t pt-6">
                              <div className="flex items-center gap-3">
                                <FaStar className="text-yellow-500" />
                                <div>
                                  <p className="text-lg font-bold text-green-700 dark:text-green-400">
                                    Grade: {a.marks} / 20
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Graded on {formatDate(a.markedAt)}
                                  </p>
                                </div>
                              </div>
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
        {assignments.length > 0 && (
          <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {assignments.filter(a => a.marks !== undefined).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Graded</div>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {assignments.filter(a => a.fileUrl).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Submitted</div>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {assignments.filter(a => getAssignmentStatus(a) === 'pending').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-xl">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {assignments.filter(a => getAssignmentStatus(a) === 'overdue').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Overdue</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAssignments;