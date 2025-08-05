import React from "react";
import { 
  FaComments, 
  FaBook, 
  FaRegQuestionCircle, 
  FaReply, 
  FaCheckCircle, 
  FaClock, 
  FaExclamationCircle,
  FaChevronDown,
  FaChevronUp,
  FaRegStar
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const StudentQueries = ({
  queries = [],
  courses = [],
  queryForm,
  handleQueryChange,
  handleQuerySubmit,
  darkMode = false
}) => {
  const [expandedQuery, setExpandedQuery] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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

  const getCourseTitle = (courseId) => {
    const course = courses.find(c => c._id === courseId);
    return course?.course?.title || course?.title || "Unknown Course";
  };

  const filteredQueries = queries.filter(query => 
    query.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getCourseTitle(query.course?._id).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await handleQuerySubmit(e);
      // Reset form
      handleQueryChange({ target: { name: 'courseId', value: '' } });
      handleQueryChange({ target: { name: 'question', value: '' } });
    } catch (error) {
      console.error("Failed to submit query:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`max-w-4xl mx-auto px-4 py-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-green-500 p-3 rounded-xl shadow-lg">
            <FaComments className="text-2xl text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Student Queries</h1>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Ask questions to your instructors and track responses
            </p>
          </div>
        </div>
      </div>

      {/* Ask Question Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-8"
      >
        <div className="bg-gradient-to-r from-blue-600 to-green-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FaRegQuestionCircle /> Ask a Question
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <FaBook className="inline mr-2 text-purple-600" /> Select Course
            </label>
            <select
              name="courseId"
              value={queryForm.courseId || ""}
              onChange={handleQueryChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
            >
              <option value="">Choose a course</option>
              {courses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.course?.title || c.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Your Question
            </label>
            <textarea
              name="question"
              placeholder="Describe your question in detail..."
              value={queryForm.question || ""}
              onChange={handleQueryChange}
              required
              rows={5}
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none resize-none bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Be specific and provide context for better responses
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!queryForm.courseId || !queryForm.question || isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg transform transition-all duration-200 hover:scale-105 flex items-center gap-2"
            >
              <FaComments /> {isSubmitting ? 'Submitting...' : 'Submit Question'}
            </button>
          </div>
        </form>
      </motion.div>

      {/* My Queries Section */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-4 md:mb-0">
            <FaComments /> My Questions
          </h3>
          
          {queries.length > 0 && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full md:w-64 pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                  darkMode 
                    ? 'border-gray-600 focus:border-blue-500 focus:ring-blue-500 bg-gray-800 text-white' 
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-300'
                }`}
              />
            </div>
          )}
        </div>

        {filteredQueries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <FaRegQuestionCircle className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              {searchTerm ? 'No Matching Questions' : 'No Questions Yet'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm 
                ? 'No questions match your search criteria.' 
                : 'You haven\'t asked any questions yet.'}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {filteredQueries.map((q, index) => (
              <motion.div
                key={q._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                {/* Query Header */}
                <div
                  className="cursor-pointer transition-colors duration-200"
                  onClick={() => setExpandedQuery(expandedQuery === q._id ? null : q._id)}
                >
                  <div className={`p-6 ${darkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                            {getCourseTitle(q.course?._id)}
                          </h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            q.reply 
                              ? 'bg-green-100 text-green-800 border border-green-200' 
                              : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                          }`}>
                            {q.reply ? 'Replied' : 'Pending'}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <FaClock className="text-gray-500" />
                            <span>{formatDate(q.createdAt)}</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <FaClock className="text-gray-500" />
                            <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                              {formatTimeAgo(q.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-2xl transition-transform duration-200 ml-4">
                        {expandedQuery === q._id ? (
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
                  {expandedQuery === q._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-6 pt-4 border-t border-gray-200 dark:border-gray-700"
                    >
                      <div className="space-y-6">
                        {/* Question */}
                        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border-l-4 border-blue-500">
                          <h5 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-800 dark:text-gray-100">
                            <FaRegQuestionCircle /> Your Question
                          </h5>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {q.question}
                          </p>
                        </div>

                        {/* Reply */}
                        {q.reply ? (
                          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl border-l-4 border-green-500">
                            <h5 className="text-lg font-semibold mb-2 flex items-center gap-2 text-green-800 dark:text-green-400">
                              <FaReply /> Instructor's Reply
                            </h5>
                            <p className="text-green-700 dark:text-green-300 leading-relaxed">
                              {q.reply}
                            </p>
                            <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                              Replied on {formatDate(q.repliedAt)}
                            </div>
                          </div>
                        ) : (
                          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-xl border-l-4 border-yellow-500">
                            <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-400 mb-2">
                              <FaClock /> Awaiting Response
                            </div>
                            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                              Your instructor will respond to your question soon. You'll be notified when they reply.
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}

        {/* Statistics */}
        {queries.length > 0 && (
          <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{queries.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Questions</div>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {queries.filter(q => q.reply).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Replied</div>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-xl">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {queries.filter(q => !q.reply).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};





export default StudentQueries;