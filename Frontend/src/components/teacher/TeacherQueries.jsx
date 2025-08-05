import React from "react";
import { 
  FaComments, 
  FaUserGraduate, 
  FaBook, 
  FaReply, 
  FaCheckCircle, 
  FaClock, 
  FaExclamationTriangle,
  FaRegComment,
  FaRegCheckCircle
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const TeacherQueries = ({
  queries = [],
  replyForm,
  handleReplyChange,
  handleReplySubmit,
}) => {
  const [expandedQuery, setExpandedQuery] = React.useState(null);
  const [replyStatus, setReplyStatus] = React.useState({}); // { [queryId]: 'sending' | 'sent' | 'error' }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleReplySubmitWrapper = async (queryId) => {
    setReplyStatus(prev => ({ ...prev, [queryId]: 'sending' }));
    
    try {
      await handleReplySubmit(queryId);
      setReplyStatus(prev => ({ ...prev, [queryId]: 'sent' }));
      
      // Reset status after 2 seconds
      setTimeout(() => {
        setReplyStatus(prev => {
          const newStatus = { ...prev };
          delete newStatus[queryId];
          return newStatus;
        });
      }, 2000);
    } catch (error) {
      setReplyStatus(prev => ({ ...prev, [queryId]: 'error' }));
    }
  };

  const getReplyButtonProps = (queryId) => {
    const status = replyStatus[queryId];
    if (status === 'sending') {
      return {
        children: (
          <>
            <div className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
            Sending...
          </>
        ),
        disabled: true,
        className: "bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed flex items-center gap-2"
      };
    }
    
    if (status === 'sent') {
      return {
        children: (
          <>
            <FaCheckCircle /> Sent!
          </>
        ),
        disabled: true,
        className: "bg-green-500 text-white px-4 py-2 rounded-lg cursor-not-allowed flex items-center gap-2"
      };
    }
    
    return {
      children: (
        <>
          <FaReply /> Send Reply
        </>
      ),
      disabled: false,
      className: "bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow transform hover:scale-105"
    };
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-green-500 p-3 rounded-xl shadow-lg">
            <FaComments className="text-2xl text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Student Queries</h1>
            <p className="text-gray-600">Respond to student questions and concerns</p>
          </div>
        </div>
      </div>

      {/* No Queries State */}
      {queries.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <FaRegComment className="text-4xl text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
            No Student Queries
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Students haven't submitted any queries yet.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {queries.map((q) => (
            <motion.div
              key={q._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              {/* Query Header */}
              <div
                className="cursor-pointer transition-colors duration-200"
                onClick={() => setExpandedQuery(expandedQuery === q._id ? null : q._id)}
              >
                <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
                          <FaRegComment /> {q.course?.title || "Unknown Course"}
                        </h3>
                        {!q.reply && (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200">
                            Pending
                          </span>
                        )}
                        {q.reply && (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                            Replied
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <FaUserGraduate className="text-purple-500" />
                          <span>{q.student?.user?.name || "Unknown Student"}</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <FaClock className="text-gray-500" />
                          <span>
                            {formatDate(q.createdAt)}
                          </span>
                        </div>
                        
                        {q.student?.registrationNumber && (
                          <div className="flex items-center gap-1">
                            <FaBook className="text-blue-500" />
                            <span className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                              {q.student.registrationNumber}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-2xl transition-transform duration-200">
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
                    {/* Question */}
                    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border-l-4 border-blue-500">
                      <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100 flex items-center gap-2">
                        <FaRegComment /> Student's Question
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {q.question}
                      </p>
                    </div>

                    {/* Reply Section */}
                    {q.reply ? (
                      <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 rounded-xl border-l-4 border-green-500">
                        <h4 className="text-lg font-semibold mb-2 text-green-800 dark:text-green-400 flex items-center gap-2">
                          <FaCheckCircle /> Your Reply
                        </h4>
                        <p className="text-green-700 dark:text-green-300 leading-relaxed">
                          {q.reply}
                        </p>
                        <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                          Replied on {formatDate(q.repliedAt)}
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 rounded-xl border border-blue-200 dark:border-blue-800">
                        <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-blue-700 dark:text-blue-400">
                          <FaReply /> Respond to Query
                        </h4>
                        
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleReplySubmitWrapper(q._id);
                          }}
                          className="space-y-4"
                        >
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              Your Response
                            </label>
                            <textarea
                              placeholder="Type your reply here..."
                              value={replyForm[q._id] || ""}
                              onChange={(e) => handleReplyChange(q._id, e.target.value)}
                              rows={4}
                              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none resize-none bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                              required
                            />
                          </div>

                          <div className="flex justify-end">
                            <button
                              type="submit"
                              disabled={replyStatus[q._id] === 'sending'}
                              {...getReplyButtonProps(q._id)}
                            />
                          </div>
                        </form>
                      </div>
                    )}
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
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Queries</div>
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

export default TeacherQueries;