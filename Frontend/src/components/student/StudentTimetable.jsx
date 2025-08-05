import React, { useState, useEffect } from "react";
import { 
  FaCalendarAlt, 
  FaBook, 
  FaChalkboardTeacher, 
  FaClock, 
  FaRegCalendarCheck,
  FaExclamationCircle,
  FaInfoCircle,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Sample timetable data (to be replaced with actual API data)
const generateSampleTimetable = (courses) => {
  if (!courses || courses.length === 0) return [];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    '08:00 - 09:30', '09:45 - 11:15', '11:30 - 13:00', 
    '13:45 - 15:15', '15:30 - 17:00', '17:15 - 18:45'
  ];
  
  const subjects = courses.slice(0, 6);
  const timetable = [];

  days.forEach(day => {
    timeSlots.forEach(time => {
      // Randomly assign courses to time slots (20% chance)
      if (Math.random() < 0.2) {
        const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
        timetable.push({
          id: `${day}-${time}`,
          day,
          time,
          course: randomSubject.course?.title || randomSubject.title,
          code: randomSubject.course?.code || 'N/A',
          teacher: randomSubject.teachers?.[0]?.user?.name || 'TBA',
          room: `Room ${Math.floor(Math.random() * 100) + 101}`,
          type: Math.random() > 0.7 ? 'Lab' : 'Lecture'
        });
      }
    });
  });

  return timetable;
};

const StudentTimetable = ({ timetable: propTimetable, courses = [], darkMode = false }) => {
  const [selectedDay, setSelectedDay] = useState('All');
  const [expandedClass, setExpandedClass] = useState(null);
  const [viewMode, setViewMode] = useState('weekly'); // weekly, daily, list

  // Use provided timetable or generate sample data
  const timetable = propTimetable || generateSampleTimetable(courses);
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = [
    '08:00 - 09:30', '09:45 - 11:15', '11:30 - 13:00', 
    '13:45 - 15:15', '15:30 - 17:00', '17:15 - 18:45'
  ];

  const getCourseColor = (courseName) => {
    const colors = [
      'bg-blue-100 text-blue-800 border-blue-200',
      'bg-green-100 text-green-800 border-green-200',
      'bg-purple-100 text-purple-800 border-purple-200',
      'bg-yellow-100 text-yellow-800 border-yellow-200',
      'bg-red-100 text-red-800 border-red-200',
      'bg-indigo-100 text-indigo-800 border-indigo-200',
      'bg-pink-100 text-pink-800 border-pink-200'
    ];
    
    // Hash the course name to get consistent color
    let hash = 0;
    for (let i = 0; i < courseName.length; i++) {
      hash = courseName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  const filteredTimetable = () => {
    if (selectedDay === 'All') return timetable;
    return timetable.filter(item => item.day === selectedDay);
  };

  const getDaySchedule = (day) => {
    return filteredTimetable().filter(item => item.day === day);
  };

  const getTotalClasses = () => {
    return timetable.length;
  };

  const getClassesByDay = () => {
    const dayCount = {};
    days.forEach(day => {
      dayCount[day] = timetable.filter(item => item.day === day).length;
    });
    return dayCount;
  };

  const getNextClass = () => {
    const now = new Date();
    const currentDay = days[now.getDay() - 1] || 'Monday'; // Adjust for week start
    const currentTime = now.toTimeString().slice(0, 5);
    
    const nextClass = timetable
      .filter(item => item.day === currentDay)
      .find(item => {
        const [startTime] = item.time.split(' - ');
        return startTime > currentTime;
      });
      
    return nextClass;
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
            <FaCalendarAlt className="text-2xl text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">My Timetable</h1>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              View your class schedule and academic calendar
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      {timetable.length > 0 && (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          {/* View Mode */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            {['weekly', 'daily', 'list'].map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 rounded text-sm font-medium transition-all duration-200 ${
                  viewMode === mode
                    ? 'bg-white dark:bg-gray-600 text-gray-800 dark:text-white shadow'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>

          {/* Day Filter */}
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Day:
            </span>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className={`px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                darkMode 
                  ? 'border-gray-600 focus:border-blue-500 focus:ring-blue-500 bg-gray-800 text-white' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-300'
              }`}
            >
              <option value="All">All Days</option>
              {days.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      {timetable.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {/* Total Classes */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-2">
              <FaRegCalendarCheck className="text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Total Classes</h3>
            </div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{getTotalClasses()}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">This week</div>
          </div>

          {/* Next Class */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-2">
              <FaClock className="text-green-500" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Next Class</h3>
            </div>
            {getNextClass() ? (
              <>
                <div className="text-lg font-bold text-green-600 dark:text-green-400">
                  {getNextClass().course}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {getNextClass().day}, {getNextClass().time}
                </div>
              </>
            ) : (
              <div className="text-sm text-gray-500 dark:text-gray-400">No upcoming classes</div>
            )}
          </div>

          {/* Busiest Day */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-2">
              <FaInfoCircle className="text-purple-500" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Busiest Day</h3>
            </div>
            {Object.keys(getClassesByDay()).length > 0 && (
              <>
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  {Object.entries(getClassesByDay()).reduce((a, b) => a[1] > b[1] ? a : b)[0]}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {Object.entries(getClassesByDay()).reduce((a, b) => a[1] > b[1] ? a : b)[1]} classes
                </div>
              </>
            )}
          </div>

          {/* Courses */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-2">
              <FaBook className="text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Courses</h3>
            </div>
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{courses.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Enrolled</div>
          </div>
        </motion.div>
      )}

      {/* Weekly View */}
      {viewMode === 'weekly' && timetable.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Weekly Schedule</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Click on a class for more details</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <th className="p-4 text-left w-20">Time</th>
                  {days.map(day => (
                    <th key={day} className="p-4 text-center min-w-32">
                      <div className="font-semibold">{day}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {selectedDay === 'All' || selectedDay === day ? 
                          `${getDaySchedule(day).length} classes` : ''}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map(time => (
                  <tr key={time} className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="p-4 font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {time}
                    </td>
                    {days.map(day => {
                      const classItem = timetable.find(item => 
                        item.day === day && item.time === time
                      );
                      
                      return (
                        <td key={`${day}-${time}`} className="p-2">
                          {classItem ? (
                            <div
                              className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                                getCourseColor(classItem.course)
                              }`}
                              onClick={() => setExpandedClass(expandedClass === classItem.id ? null : classItem.id)}
                            >
                              <div className="font-medium text-sm mb-1 truncate">
                                {classItem.course}
                              </div>
                              <div className="text-xs opacity-90">
                                {classItem.code} • {classItem.type}
                              </div>
                              <div className="text-xs mt-1">
                                {classItem.room}
                              </div>
                            </div>
                          ) : (
                            <div className="h-20"></div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Daily View */}
      {viewMode === 'daily' && timetable.length > 0 && (
        <div className="space-y-6">
          {days.map(day => {
            const dayClasses = getDaySchedule(day);
            if (dayClasses.length === 0 && selectedDay !== 'All') return null;
            if (selectedDay !== 'All' && selectedDay !== day) return null;
            
            return (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{day}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{dayClasses.length} classes</p>
                </div>
                
                <div className="p-6">
                  {dayClasses.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                      No classes scheduled for {day}
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {dayClasses.map((classItem, index) => (
                        <div
                          key={index}
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => setExpandedClass(expandedClass === classItem.id ? null : classItem.id)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCourseColor(classItem.course)}`}>
                                {classItem.type}
                              </div>
                              <span className="font-medium text-gray-800 dark:text-gray-100">
                                {classItem.time}
                              </span>
                            </div>
                            <div className="text-2xl transition-transform duration-200">
                              {expandedClass === classItem.id ? (
                                <FaChevronUp className="text-blue-500" />
                              ) : (
                                <FaChevronDown className="text-blue-500" />
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 mb-2">
                            <FaBook className="text-blue-500" />
                            <span className="font-semibold text-gray-800 dark:text-gray-100">
                              {classItem.course}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              ({classItem.code})
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <FaChalkboardTeacher className="text-purple-500" />
                              <span>{classItem.teacher}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaRegCalendarCheck className="text-green-500" />
                              <span>{classItem.room}</span>
                            </div>
                          </div>

                          {/* Expanded Details */}
                          <AnimatePresence>
                            {expandedClass === classItem.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                              >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Course Code</p>
                                    <p className="text-gray-800 dark:text-gray-100">{classItem.code}</p>
                                  </div>
                                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Class Type</p>
                                    <p className="text-gray-800 dark:text-gray-100">{classItem.type}</p>
                                  </div>
                                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Instructor</p>
                                    <p className="text-gray-800 dark:text-gray-100">{classItem.teacher}</p>
                                  </div>
                                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Room</p>
                                    <p className="text-gray-800 dark:text-gray-100">{classItem.room}</p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && timetable.length > 0 && (
        <div className="space-y-4">
          {filteredTimetable().map((classItem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div
                className="p-6 cursor-pointer"
                onClick={() => setExpandedClass(expandedClass === classItem.id ? null : classItem.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCourseColor(classItem.course)}`}>
                      {classItem.type}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                      {classItem.course}
                    </h3>
                  </div>
                  <div className="text-2xl transition-transform duration-200">
                    {expandedClass === classItem.id ? (
                      <FaChevronUp className="text-blue-500" />
                    ) : (
                      <FaChevronDown className="text-blue-500" />
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FaCalendarAlt className="text-blue-500" />
                    <span>{classItem.day}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FaClock className="text-green-500" />
                    <span>{classItem.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FaRegCalendarCheck className="text-purple-500" />
                    <span>{classItem.room}</span>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {expandedClass === classItem.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-6 pt-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Course Details</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                            <FaBook className="text-blue-500" />
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Course Code</p>
                              <p className="font-medium text-gray-800 dark:text-gray-100">{classItem.code}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                            <FaChalkboardTeacher className="text-purple-500" />
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Instructor</p>
                              <p className="font-medium text-gray-800 dark:text-gray-100">{classItem.teacher}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Class Information</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                            <FaRegCalendarCheck className="text-green-500" />
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Room</p>
                              <p className="font-medium text-gray-800 dark:text-gray-100">{classItem.room}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                            <FaInfoCircle className="text-yellow-500" />
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Class Type</p>
                              <p className="font-medium text-gray-800 dark:text-gray-100">{classItem.type}</p>
                            </div>
                          </div>
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

      {/* Empty State */}
      {timetable.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <FaCalendarAlt className="text-4xl text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
            No Timetable Available
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Your timetable will be available once your courses are scheduled.
          </p>
          <div className="flex justify-center">
            <div className="bg-blue-50 dark:bg-blue-900/30 px-6 py-3 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-400 font-medium">
                📅 Timetable will be updated when your courses are finalized
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};



export default StudentTimetable;