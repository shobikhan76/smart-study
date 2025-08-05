import React, { useState } from "react";
import { 
  FaTasks, 
  FaBook, 
  FaCalendarAlt, 
  FaFilePdf, 
  FaCheckCircle, 
  FaRegFilePdf, 
  FaUpload, 
  FaStar, 
  FaRegStar, 
  FaClock, 
  FaGraduationCap 
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const TeacherAssignments = ({
  assignments = [],
  courses = [],
  assignmentForm,
  handleAssignmentChange,
  handleAssignmentSubmit,
  handleFileChange,
  token,
  fetchAssignments,
}) => {
  const [markInputs, setMarkInputs] = useState({});
  const [replyFiles, setReplyFiles] = useState({});
  const [expandedAssignment, setExpandedAssignment] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleMarkChange = (id, value) => {
    setMarkInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleReplyFileChange = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      setReplyFiles((prev) => ({ ...prev, [id]: file }));
      // Simulate upload progress
      setUploadProgress((prev) => ({ ...prev, [id]: 0 }));
      setTimeout(() => {
        setUploadProgress((prev) => ({ ...prev, [id]: 100 }));
      }, 800);
    }
  };

  const handleMarkSubmit = async (id) => {
    const formData = new FormData();
    formData.append("marks", markInputs[id] || 0);
    if (replyFiles[id]) formData.append("replyPdf", replyFiles[id]);
    
    try {
      await axios.post(
        `http://localhost:5000/api/assignments/${id}/mark`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Reset state
      setMarkInputs((prev) => ({ ...prev, [id]: "" }));
      setReplyFiles((prev) => ({ ...prev, [id]: null }));
      setUploadProgress((prev) => ({ ...prev, [id]: 0 }));
      
      // Refresh assignments
      fetchAssignments();
    } catch (error) {
      console.error("Failed to submit marks:", error);
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

  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatus = (assignment) => {
    if (assignment.marks !== undefined) return "graded";
    if (assignment.submittedAt) return "submitted";
    return "pending";
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "graded":
        return { 
          text: "Graded", 
          color: "bg-green-100 text-green-800", 
          icon: <FaCheckCircle className="text-green-600" /> 
        };
      case "submitted":
        return { 
          text: "Submitted", 
          color: "bg-blue-100 text-blue-800", 
          icon: <FaUpload className="text-blue-600" /> 
        };
      case "pending":
        return { 
          text: "Pending", 
          color: "bg-yellow-100 text-yellow-800", 
          icon: <FaClock className="text-yellow-600" /> 
        };
      default:
        return { text: "Unknown", color: "bg-gray-100 text-gray-800", icon: null };
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-3 rounded-xl shadow-lg">
            <FaTasks className="text-2xl text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Assignments</h1>
            <p className="text-gray-600">Create, manage, and grade student assignments</p>
          </div>
        </div>
      </div>

      {/* Create Assignment Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8"
      >
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FaTasks /> Create New Assignment
          </h2>
        </div>
        
        <form onSubmit={handleAssignmentSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Course Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FaBook className="inline mr-2 text-purple-600" /> Select Course
              </label>
              <select
                name="course"
                value={assignmentForm.course}
                onChange={handleAssignmentChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white text-gray-700"
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Assignment Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter assignment title"
                value={assignmentForm.title}
                onChange={handleAssignmentChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Provide detailed instructions for the assignment..."
              value={assignmentForm.description}
              onChange={handleAssignmentChange}
              required
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Due Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FaCalendarAlt className="inline mr-2 text-purple-600" /> Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                value={assignmentForm.dueDate}
                onChange={handleAssignmentChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200"
              />
            </div>

            {/* PDF Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FaFilePdf className="inline mr-2 text-red-600" /> Reference PDF (Optional)
              </label>
              <div className="relative">
                <input
                  type="file"
                  name="pdf"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!assignmentForm.course || !assignmentForm.title || !assignmentForm.description || !assignmentForm.dueDate}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg transform transition-all duration-200 hover:scale-105 flex items-center gap-2"
            >
              <FaTasks /> Post Assignment
            </button>
          </div>
        </form>
      </motion.div>

      {/* Assignments List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaTasks /> My Assignments
          </h3>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
            {assignments.length} {assignments.length === 1 ? 'assignment' : 'assignments'}
          </span>
        </div>

        <AnimatePresence>
          {assignments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FaTasks className="text-4xl text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No assignments yet</h3>
              <p className="text-gray-500 mb-6">Create your first assignment to get started</p>
              <div className="flex justify-center">
                <div className="bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-lg">
                  <p className="text-sm text-purple-800 font-medium">💡 Tip: Start by creating an assignment above</p>
                </div>
              </div>
            </motion.div>
          ) : (
            assignments.map((a) => {
              const status = getStatus(a);
              const statusConfig = getStatusConfig(status);
              const daysRemaining = getDaysRemaining(a.dueDate);

              return (
                <motion.div
                  key={a._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Assignment Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-xl font-bold text-gray-800">{a.title}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.color}`}>
                            {statusConfig.icon} {statusConfig.text}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <FaBook className="text-purple-500" />
                            <span>{a.course?.title}</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <FaCalendarAlt className="text-blue-500" />
                            <span>
                              Due: {formatDate(a.dueDate)} at {formatTime(a.dueDate)}
                            </span>
                          </div>
                          
                          {daysRemaining > 0 && (
                            <div className="flex items-center gap-1 text-green-600">
                              <FaClock />
                              <span>{daysRemaining} days left</span>
                            </div>
                          )}
                          
                          {daysRemaining < 0 && (
                            <div className="flex items-center gap-1 text-red-600">
                              <FaClock />
                              <span>Overdue</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => setExpandedAssignment(expandedAssignment === a._id ? null : a._id)}
                        className="text-gray-500 hover:text-gray-700 transition-colors duration-200 ml-auto"
                      >
                        <FaTasks className={`text-lg transition-transform duration-200 ${expandedAssignment === a._id ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Assignment Content */}
                  <AnimatePresence>
                    {expandedAssignment === a._id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-6 pt-4"
                      >
                        <div className="space-y-6">
                          {/* Description */}
                          <div>
                            <h5 className="text-sm font-semibold text-gray-700 mb-2">Description</h5>
                            <p className="text-gray-600 leading-relaxed">{a.description}</p>
                          </div>

                          {/* Files */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {a.fileUrl && (
                              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                <FaRegFilePdf className="text-red-600 text-xl" />
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-blue-800">Student Submission</p>
                                  <a
                                    href={a.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 text-sm underline"
                                  >
                                    View PDF
                                  </a>
                                </div>
                              </div>
                            )}

                            {a.replyFileUrl && (
                              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                                <FaRegFilePdf className="text-red-600 text-xl" />
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-green-800">Your Feedback</p>
                                  <a
                                    href={a.replyFileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-600 hover:text-green-800 text-sm underline"
                                  >
                                    View Feedback PDF
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Grading Section */}
                          {!a.marks ? (
                            <div className="border-t pt-6">
                              <h5 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <FaGraduationCap /> Grade Submission
                              </h5>
                              
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  handleMarkSubmit(a._id);
                                }}
                                className="space-y-4"
                              >
                                <div>
                                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Marks (out of 20)
                                  </label>
                                  <div className="flex gap-3">
                                    <input
                                      type="number"
                                      min="0"
                                      max="20"
                                      step="0.5"
                                      value={markInputs[a._id] || ""}
                                      onChange={(e) => handleMarkChange(a._id, e.target.value)}
                                      placeholder="Enter marks..."
                                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                                      required
                                    />
                                  </div>
                                </div>

                                <div>
                                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Feedback PDF (Optional)
                                  </label>
                                  <input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e) => handleReplyFileChange(a._id, e)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                                  />
                                  
                                  {uploadProgress[a._id] > 0 && (
                                    <div className="mt-2">
                                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                                        <span>Uploading...</span>
                                        <span>{uploadProgress[a._id]}%</span>
                                      </div>
                                      <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                                          style={{ width: `${uploadProgress[a._id]}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <div className="flex justify-end">
                                  <button
                                    type="submit"
                                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 font-semibold shadow-lg transform transition-all duration-200 hover:scale-105 flex items-center gap-2"
                                  >
                                    <FaCheckCircle /> Submit Grade & Feedback
                                  </button>
                                </div>
                              </form>
                            </div>
                          ) : (
                            <div className="border-t pt-6">
                              <div className="flex items-center gap-3">
                                <FaStar className="text-yellow-500" />
                                <div>
                                  <p className="text-lg font-bold text-green-700">
                                    Grade: {a.marks} / 20
                                  </p>
                                  <p className="text-sm text-gray-600">
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
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TeacherAssignments;