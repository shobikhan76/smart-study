import React from "react";
import { 
  FaUser, 
  FaEnvelope, 
  FaIdCard, 
  FaBuilding, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaCalendarAlt,
  FaRegCalendar,
  FaEdit,
  FaGraduationCap,
  FaChalkboardTeacher
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const StudentProfiles = ({ student, darkMode = false }) => {
  if (!student) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <p className="text-lg text-gray-600 dark:text-gray-400">Loading profile...</p>
      </motion.div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <div className={`max-w-3xl mx-auto px-4 py-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
            <FaUser className="text-2xl text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Student Profile</h1>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              View and manage your personal information
            </p>
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
      >
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:gap-6">
            <div className="flex-shrink-0 mb-4 md:mb-0">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl font-bold">
                {getInitials(student.user?.name)}
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-1">{student.user?.name || "Student Name"}</h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm opacity-90">
                <div className="flex items-center gap-1">
                  <FaIdCard /> {student.registrationNumber || "N/A"}
                </div>
                <div className="flex items-center gap-1">
                  <FaBuilding /> {student.department || "Department"}
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200">
                <FaEdit /> Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                <FaUser /> Personal Information
              </h3>
              
              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <FaUser className="text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</p>
                  <p className="text-gray-800 dark:text-gray-100 font-medium">
                    {student.user?.name || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <FaEnvelope className="text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</p>
                  <p className="text-gray-800 dark:text-gray-100 font-medium">
                    {student.user?.email || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <FaIdCard className="text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Registration Number</p>
                  <p className="text-gray-800 dark:text-gray-100 font-medium">
                    {student.registrationNumber || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <FaRegCalendar className="text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</p>
                  <p className="text-gray-800 dark:text-gray-100 font-medium">
                    {student.dateOfBirth ? formatDate(student.dateOfBirth) : "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                <FaGraduationCap /> Academic Information
              </h3>
              
              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <FaBuilding className="text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Department</p>
                  <p className="text-gray-800 dark:text-gray-100 font-medium">
                    {student.department || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <FaChalkboardTeacher className="text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Program</p>
                  <p className="text-gray-800 dark:text-gray-100 font-medium">
                    {student.program || "Bachelor of Science"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <FaCalendarAlt className="text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Year of Study</p>
                  <p className="text-gray-800 dark:text-gray-100 font-medium">
                    {student.yearOfStudy || "1st Year"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <FaRegCalendar className="text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Admission Date</p>
                  <p className="text-gray-800 dark:text-gray-100 font-medium">
                    {student.admissionDate ? formatDate(student.admissionDate) : "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                <FaPhone /> Contact Information
              </h3>
              
              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <FaPhone className="text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</p>
                  <p className="text-gray-800 dark:text-gray-100 font-medium">
                    {student.contact || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <FaMapMarkerAlt className="text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Address</p>
                  <p className="text-gray-800 dark:text-gray-100 font-medium">
                    {student.address || "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            {student.emergencyContact && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                  <FaPhone /> Emergency Contact
                </h3>
                
                <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-xl border border-red-200 dark:border-red-800">
                  <div className="flex items-start gap-3 mb-2">
                    <FaUser className="text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-red-800 dark:text-red-400">Name</p>
                      <p className="text-red-700 dark:text-red-300 font-medium">
                        {student.emergencyContact.name || "Not provided"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <FaPhone className="text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-red-800 dark:text-red-400">Phone</p>
                      <p className="text-red-700 dark:text-red-300 font-medium">
                        {student.emergencyContact.phone || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Profile Statistics */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">4</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Courses</div>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">3.8</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">GPA</div>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">95%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Attendance</div>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">2</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Assignments</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentProfiles;