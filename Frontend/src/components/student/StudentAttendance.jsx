import React, { useEffect, useState } from "react";
import { 
  FaCalendarCheck, 
  FaChartPie, 
  FaClock, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaExclamationCircle,
  FaRegCalendarCheck,
  FaSpinner
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const StudentAttendance = ({ token, studentId, attendance = [], darkMode = false }) => {
  const [percentage, setPercentage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedRecord, setExpandedRecord] = useState(null);
  const [timeRange, setTimeRange] = useState('all'); // 'all', 'month', 'week'

  useEffect(() => {
    if (!studentId) return;
    
    const fetchPercentage = async () => {
      setLoading(true);
      try {
        const percRes = await axios.get(
          `http://localhost:5000/api/attendance/percentage/${studentId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPercentage(percRes.data.attendancePercentage);
      } catch (error) {
        setPercentage(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPercentage();
  }, [studentId, token]);

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

  const getFilteredAttendance = () => {
    if (timeRange === 'all') return attendance;
    
    const now = new Date();
    const cutoff = new Date();
    
    if (timeRange === 'week') {
      cutoff.setDate(now.getDate() - 7);
    } else if (timeRange === 'month') {
      cutoff.setMonth(now.getMonth() - 1);
    }
    
    return attendance.filter(record => new Date(record.date) >= cutoff);
  };

  const getAttendanceColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'present':
        return darkMode ? 'text-green-400' : 'text-green-600';
      case 'absent':
        return darkMode ? 'text-red-400' : 'text-red-600';
      case 'leave':
        return darkMode ? 'text-yellow-400' : 'text-yellow-600';
      default:
        return darkMode ? 'text-gray-400' : 'text-gray-600';
    }
  };

  const getAttendanceIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'present':
        return <FaCheckCircle className="text-green-500" />;
      case 'absent':
        return <FaTimesCircle className="text-red-500" />;
      case 'leave':
        return <FaExclamationCircle className="text-yellow-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const getPercentageStatus = () => {
    if (!percentage) return { status: 'Unknown', color: 'text-gray-500' };
    if (percentage >= 90) return { status: 'Excellent', color: 'text-green-600 dark:text-green-400' };
    if (percentage >= 75) return { status: 'Good', color: 'text-blue-600 dark:text-blue-400' };
    if (percentage >= 60) return { status: 'Fair', color: 'text-yellow-600 dark:text-yellow-400' };
    return { status: 'Needs Improvement', color: 'text-red-600 dark:text-red-400' };
  };

  const filteredAttendance = getFilteredAttendance();
  const percentageStatus = getPercentageStatus();

  return (
    <div className={`max-w-4xl mx-auto px-4 py-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-green-500 to-blue-600 p-3 rounded-xl shadow-lg">
            <FaCalendarCheck className="text-2xl text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Attendance Report</h1>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Track your attendance records and performance
            </p>
          </div>
        </div>
      </div>

      {/* Attendance Summary */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-8"
      >
        <div className="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FaChartPie /> Attendance Summary
          </h2>
        </div>
        
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <FaSpinner className="animate-spin text-4xl text-green-500 mr-3" />
              <span className="text-lg text-gray-600 dark:text-gray-400">Loading attendance data...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Overall Percentage */}
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-xl border border-green-200 dark:border-green-800">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {percentage !== null ? `${percentage}%` : 'N/A'}
                </div>
                <div className={`text-sm font-semibold ${percentageStatus.color}`}>
                  {percentageStatus.status}
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Overall Attendance
                </div>
              </div>

              {/* Present Count */}
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {attendance.filter(a => a.status === 'present').length}
                </div>
                <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                  Present
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Days Attended
                </div>
              </div>

              {/* Absent Count */}
              <div className="text-center p-6 bg-gradient-to-br from-red-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800 rounded-xl border border-red-200 dark:border-red-800">
                <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">
                  {attendance.filter(a => a.status === 'absent').length}
                </div>
                <div className="text-sm font-semibold text-red-600 dark:text-red-400">
                  Absent
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Days Missed
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Attendance Records */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-4 md:mb-0">
            <FaRegCalendarCheck /> Attendance Records
          </h3>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Show:</span>
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {['all', 'month', 'week'].map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-all duration-200 ${
                    timeRange === range
                      ? 'bg-white dark:bg-gray-600 text-gray-800 dark:text-white shadow'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredAttendance.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <FaCalendarCheck className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              No Attendance Records
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {timeRange === 'all' 
                ? 'You have no attendance records yet.' 
                : `No attendance records for the last ${timeRange}.`}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredAttendance.map((a, index) => (
              <motion.div
                key={a._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                {/* Attendance Record Header */}
                <div
                  className="cursor-pointer transition-colors duration-200"
                  onClick={() => setExpandedRecord(expandedRecord === a._id ? null : a._id)}
                >
                  <div className={`p-6 ${darkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          {getAttendanceIcon(a.status)}
                          <div>
                            <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                              {a.course?.title || a.course?.course?.title || "Unknown Course"}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {formatDate(a.date)} • {formatTimeAgo(a.date)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getAttendanceColor(a.status)} ${darkMode ? 'border-opacity-30' : 'border-opacity-50'}`}>
                          {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                        </span>
                        
                        <div className="text-2xl transition-transform duration-200">
                          {expandedRecord === a._id ? (
                            <FaChevronUp className="text-green-500" />
                          ) : (
                            <FaChevronDown className="text-green-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedRecord === a._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-6 pt-4 border-t border-gray-200 dark:border-gray-700"
                    >
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                            <FaCalendarCheck className="text-green-500" />
                            <div>
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Date</p>
                              <p className="text-gray-600 dark:text-gray-400">{formatDate(a.date)}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                            <FaClock className="text-blue-500" />
                            <div>
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Time Recorded</p>
                              <p className="text-gray-600 dark:text-gray-400">{formatTimeAgo(a.date)}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
                          <FaBook className="text-blue-500" />
                          <div>
                            <p className="text-sm font-medium text-blue-800 dark:text-blue-400">Course</p>
                            <p className="text-blue-700 dark:text-blue-300">
                              {a.course?.title || a.course?.course?.title || "Unknown Course"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-800">
                          <FaCheckCircle className="text-green-500" />
                          <div>
                            <p className="text-sm font-medium text-green-800 dark:text-green-400">Status</p>
                            <p className="text-green-700 dark:text-green-300 capitalize font-bold">
                              {a.status}
                            </p>
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
        {attendance.length > 0 && (
          <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">Attendance Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {attendance.filter(a => a.status === 'present').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Present</div>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-xl">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {attendance.filter(a => a.status === 'absent').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Absent</div>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-xl">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {attendance.filter(a => a.status === 'leave').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">On Leave</div>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {attendance.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Records</div>
              </div>
            </div>
          </div>
        )}
      </div>
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

export default StudentAttendance;