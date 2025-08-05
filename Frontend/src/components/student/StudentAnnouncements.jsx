import React from "react";
import { 
  FaBullhorn, 
  FaCalendarAlt, 
  FaClock, 
  FaExclamationCircle, 
  FaRegNewspaper,
  FaUserTie 
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const StudentAnnouncements = ({ announcements = [], darkMode = false }) => {
  const [expandedAnnouncement, setExpandedAnnouncement] = React.useState(null);
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

  const getPriorityColor = (ann) => {
    // You can add a priority field to your announcement model
    // For now, using a simple algorithm based on title
    if (ann.title.toLowerCase().includes('urgent') || 
        ann.title.toLowerCase().includes('important') ||
        ann.title.toLowerCase().includes('deadline')) {
      return 'border-red-500 bg-red-50 dark:bg-red-900/20';
    }
    return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
  };

  const getPriorityIcon = (ann) => {
    if (ann.title.toLowerCase().includes('urgent') || 
        ann.title.toLowerCase().includes('important')) {
      return <FaExclamationCircle className="text-red-500" />;
    }
    return <FaBullhorn className="text-blue-500" />;
  };

  const filteredAnnouncements = announcements.filter(ann => 
    ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ann.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`max-w-3xl mx-auto px-4 py-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-green-500 p-3 rounded-xl shadow-lg">
            <FaBullhorn className="text-2xl text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Announcements</h1>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Stay updated with the latest news and important information
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {announcements.length > 5 && (
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                darkMode 
                  ? 'border-gray-600 focus:border-blue-500 focus:ring-blue-500 bg-gray-800 text-white' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-300'
              }`}
            />
          </div>
        </div>
      )}

      {/* No Announcements State */}
      {filteredAnnouncements.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <FaRegNewspaper className="text-4xl text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
            No Announcements
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {searchTerm ? 'No announcements match your search.' : 'There are no announcements at the moment.'}
          </p>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {filteredAnnouncements.map((ann, index) => (
            <motion.div
              key={ann._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl shadow-lg border-l-4 overflow-hidden transition-all duration-300 hover:shadow-xl ${
                getPriorityColor(ann)
              } ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              {/* Announcement Header */}
              <div
                className="cursor-pointer transition-colors duration-200"
                onClick={() => setExpandedAnnouncement(expandedAnnouncement === ann._id ? null : ann._id)}
              >
                <div className={`p-6 ${darkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        {getPriorityIcon(ann)}
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                          {ann.title}
                        </h3>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <FaUserTie className="text-blue-500" />
                          <span>From: {ann.teacher?.user?.name || 'Administration'}</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <FaCalendarAlt className="text-gray-500" />
                          <span>{formatDate(ann.createdAt)}</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <FaClock className="text-gray-500" />
                          <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                            {formatTimeAgo(ann.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-2xl transition-transform duration-200 ml-4">
                      {expandedAnnouncement === ann._id ? (
                        <FaChevronUp className="text-blue-500" />
                      ) : (
                        <FaChevronDown className="text-blue-500" />
                      )}
                    </div>
                  </div>

                  {/* Preview */}
                  <p className={`text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-2 ${
                    expandedAnnouncement === ann._id ? 'line-clamp-none' : ''
                  }`}>
                    {ann.content}
                  </p>
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedAnnouncement === ann._id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-6 pt-4 border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {ann.content}
                      </p>
                    </div>
                    
                    {/* Additional Info */}
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>Posted: {formatDate(ann.createdAt)}</span>
                        {ann.updatedAt && ann.updatedAt !== ann.createdAt && (
                          <span>Updated: {formatDate(ann.updatedAt)}</span>
                        )}
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
      {announcements.length > 0 && (
        <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{announcements.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Announcements</div>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {announcements.filter(ann => new Date(ann.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">This Week</div>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {announcements.filter(ann => 
                  ann.title.toLowerCase().includes('urgent') || 
                  ann.title.toLowerCase().includes('important')
                ).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Urgent</div>
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

export default StudentAnnouncements;