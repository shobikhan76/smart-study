import React, { useEffect, useState } from "react";
import { 
  FaUserGraduate, 
  FaClipboardList, 
  FaEdit, 
  FaTrash, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaClock,
  FaEnvelope,
  FaBuilding,
  FaCalendarAlt,
  FaCity,
  FaSchool,
  FaBook,
  FaExclamationCircle,
  FaArrowRight,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const Sidebar = ({ selected, setSelected, hasApplication, darkMode = false }) => (
  <div className={`w-72 ${darkMode ? 'bg-gradient-to-b from-blue-900 to-indigo-950' : 'bg-gradient-to-b from-blue-800 to-blue-900'} text-white min-h-screen p-6 flex flex-col gap-3 shadow-xl`}>
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full mb-3">
        <FaUserGraduate className="text-2xl" />
      </div>
      <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
        Applicant Portal
      </h2>
    </div>
    
    <nav className="space-y-2 flex-1">
      <button
        className={`flex items-center gap-3 text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm group ${
          selected === "apply" 
            ? "bg-white/30 shadow-lg scale-105 font-semibold transform translate-x-1" 
            : "hover:bg-white/20 hover:scale-102 hover:translate-x-1"
        } ${hasApplication ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => !hasApplication && setSelected("apply")}
        disabled={hasApplication}
      >
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
          selected === "apply" 
            ? "bg-white text-blue-700" 
            : "bg-white/20 group-hover:bg-white/30"
        }`}>
          <FaClipboardList className="text-lg" />
        </div>
        <span className="flex-1 text-left">Apply for Admission</span>
        {selected === "apply" && (
          <div className="w-2 h-2 bg-white rounded-full"></div>
        )}
      </button>
      
      <button
        className={`flex items-center gap-3 text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm group ${
          selected === "manage" 
            ? "bg-white/30 shadow-lg scale-105 font-semibold transform translate-x-1" 
            : "hover:bg-white/20 hover:scale-102 hover:translate-x-1"
        } ${!hasApplication ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => hasApplication && setSelected("manage")}
        disabled={!hasApplication}
      >
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
          selected === "manage" 
            ? "bg-white text-blue-700" 
            : "bg-white/20 group-hover:bg-white/30"
        }`}>
          <FaEdit className="text-lg" />
        </div>
        <span className="flex-1 text-left">Manage Application</span>
        {selected === "manage" && (
          <div className="w-2 h-2 bg-white rounded-full"></div>
        )}
      </button>
    </nav>

    {/* Quick Stats */}
    <div className={`p-4 rounded-xl backdrop-blur-sm ${darkMode ? "bg-blue-900/50" : "bg-white/20"} border ${darkMode ? "border-blue-800" : "border-blue-600"}`}>
      <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
        <FaClipboardList /> Application Status
      </h4>
      {hasApplication ? (
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span>Status:</span>
            <span className="font-medium">In Review</span>
          </div>
          <div className="flex justify-between">
            <span>Submitted:</span>
            <span className="font-medium">Today</span>
          </div>
          <div className="flex justify-between">
            <span>Department:</span>
            <span className="font-medium">IT</span>
          </div>
        </div>
      ) : (
        <p className="text-xs text-blue-200 italic">No application submitted</p>
      )}
    </div>
  </div>
);

const StatusIcon = ({ status }) => {
  if (status === "approved") return <FaCheckCircle className="text-green-600 inline-block mr-2" />;
  if (status === "rejected") return <FaTimesCircle className="text-red-600 inline-block mr-2" />;
  return <FaClock className="text-yellow-600 inline-block mr-2" />;
};

const Field = ({ label, name, value, onChange, type = "text", required = true }) => (
  <div className="space-y-1">
    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
    />
  </div>
);

const MessageBox = ({ message, type = "success" }) => (
  message ? (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mb-6 p-4 rounded-xl text-sm font-medium flex items-center gap-2 transition-all duration-300 ${
        type === "success"
          ? "bg-green-100 text-green-800 border border-green-200" 
          : "bg-red-100 text-red-800 border border-red-200"
      }`}
    >
      {type === "success" ? <FaCheckCircle /> : <FaExclamationCircle />}
      {message}
    </motion.div>
  ) : null
);

const ApplicantDashboard = () => {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    department: "",
    fatherName: "",
    dateOfBirth: "",
    city: "",
    previousSchool: "",
    board: "",
    marks: "",
    passingYear: "",
  });
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState("apply");
  const [editMode, setEditMode] = useState(false);
  const [expandedSection, setExpandedSection] = useState("personal");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/applications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data) setApplication(res.data);
      } catch (error) {
        console.error("Failed to fetch application:", error);
        setApplication(null);
      } finally {
        setLoading(false);
      }
    };
    fetchApplication();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/applications", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplication(res.data.application);
      setMessage("✅ Application submitted successfully!");
      setSelected("manage");
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || "Failed to submit application."}`);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/applications/${application._id}`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplication(res.data.application);
      setMessage("✅ Application updated successfully!");
      setEditMode(false);
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || "Failed to update application."}`);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your application?")) return;
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/applications/${application._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplication(null);
      setMessage("✅ Application deleted successfully.");
      setSelected("apply");
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || "Failed to delete application."}`);
    }
  };

  const startEdit = () => {
    setForm({
      name: application.name,
      department: application.department,
      fatherName: application.fatherName,
      dateOfBirth: application.dateOfBirth?.slice(0, 10),
      city: application.city,
      previousSchool: application.previousSchool,
      board: application.board,
      marks: application.marks,
      passingYear: application.passingYear,
    });
    setEditMode(true);
    setMessage("");
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your application...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-slate-50 to-slate-100"}`}>
      <Sidebar selected={selected} setSelected={setSelected} hasApplication={!!application} darkMode={darkMode} />
      
      <div className="flex-1 p-6 md:p-8 overflow-auto">
        <div className={`max-w-4xl mx-auto rounded-2xl shadow-xl overflow-hidden transition-colors duration-300 ${darkMode ? "bg-gray-800" : "bg-white/90 backdrop-blur-sm"}`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                  <FaUserGraduate className="text-2xl" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Applicant Dashboard</h1>
                  <p className="text-blue-100 mt-1">Complete your admission application and track your status</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <MessageBox message={message} type={message?.includes("success") ? "success" : "error"} />

            {/* Apply for Admission */}
            {selected === "apply" && !application && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    <FaClipboardList /> Apply for Admission
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Fill out the form below to submit your admission application
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden`}>
                    <div
                      className="p-6 cursor-pointer"
                      onClick={() => setExpandedSection(expandedSection === 'personal' ? null : 'personal')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                            1
                          </div>
                          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                            Personal Information
                          </h3>
                        </div>
                        <div className="text-2xl">
                          {expandedSection === 'personal' ? (
                            <FaChevronUp className="text-blue-500" />
                          ) : (
                            <FaChevronDown className="text-blue-500" />
                          )}
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedSection === 'personal' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-6 pt-4 border-t border-gray-200 dark:border-gray-700"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Field
                              label="Full Name"
                              name="name"
                              value={form.name}
                              onChange={handleChange}
                              required
                            />
                            
                            <Field
                              label="Father's Name"
                              name="fatherName"
                              value={form.fatherName}
                              onChange={handleChange}
                              required
                            />
                            
                            <Field
                              label="Date of Birth"
                              name="dateOfBirth"
                              value={form.dateOfBirth}
                              onChange={handleChange}
                              type="date"
                              required
                            />
                            
                            <Field
                              label="City"
                              name="city"
                              value={form.city}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Academic Information */}
                  <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden`}>
                    <div
                      className="p-6 cursor-pointer"
                      onClick={() => setExpandedSection(expandedSection === 'academic' ? null : 'academic')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                            2
                          </div>
                          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                            Academic Information
                          </h3>
                        </div>
                        <div className="text-2xl">
                          {expandedSection === 'academic' ? (
                            <FaChevronUp className="text-green-500" />
                          ) : (
                            <FaChevronDown className="text-green-500" />
                          )}
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedSection === 'academic' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-6 pt-4 border-t border-gray-200 dark:border-gray-700"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Field
                              label="Previous School"
                              name="previousSchool"
                              value={form.previousSchool}
                              onChange={handleChange}
                              required
                            />
                            
                            <Field
                              label="Board"
                              name="board"
                              value={form.board}
                              onChange={handleChange}
                              required
                            />
                            
                            <Field
                              label="Marks"
                              name="marks"
                              value={form.marks}
                              onChange={handleChange}
                              type="number"
                              required
                            />
                            
                            <Field
                              label="Passing Year"
                              name="passingYear"
                              value={form.passingYear}
                              onChange={handleChange}
                              type="number"
                              required
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Department Selection */}
                  <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden`}>
                    <div
                      className="p-6 cursor-pointer"
                      onClick={() => setExpandedSection(expandedSection === 'department' ? null : 'department')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center">
                            3
                          </div>
                          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                            Department Selection
                          </h3>
                        </div>
                        <div className="text-2xl">
                          {expandedSection === 'department' ? (
                            <FaChevronUp className="text-purple-500" />
                          ) : (
                            <FaChevronDown className="text-purple-500" />
                          )}
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedSection === 'department' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-6 pt-4 border-t border-gray-200 dark:border-gray-700"
                        >
                          <div className="space-y-1">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              <FaBuilding className="inline mr-2 text-purple-600" /> Select Department
                            </label>
                            <select
                              name="department"
                              value={form.department}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                            >
                              <option value="">Choose a department</option>
                              <option value="IT">Information Technology</option>
                              <option value="CIVIL">Civil Engineering</option>
                              <option value="MECHANICS">Mechanical Engineering</option>
                              <option value="ELECTRICAL">Electrical Engineering</option>
                              <option value="OTHER">Other</option>
                            </select>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-6">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 font-semibold shadow-lg transform transition-all duration-200 hover:scale-105 flex items-center gap-2"
                    >
                      <FaArrowRight /> Submit Application
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Manage Application */}
            {selected === "manage" && application && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    <FaEdit /> Manage Your Application
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Review and update your admission application details
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                  {/* Application Header */}
                  <div className={`p-6 ${darkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                          Application Status
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          application.status === 'approved' 
                            ? 'bg-green-100 text-green-800 border border-green-200' 
                            : application.status === 'rejected'
                              ? 'bg-red-100 text-red-800 border border-red-200'
                              : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                        }`}>
                          <StatusIcon status={application.status} />
                          {application.status.toUpperCase()}
                        </span>
                      </div>
                      
                      {!editMode && (
                        <div className="flex gap-3">
                          <button
                            onClick={startEdit}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
                          >
                            <FaEdit /> Edit Application
                          </button>
                          <button
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
                          >
                            <FaTrash /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {editMode ? (
                    /* Edit Mode */
                    <form onSubmit={handleUpdate} className="p-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field
                          label="Full Name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                        />
                        
                        <Field
                          label="Father's Name"
                          name="fatherName"
                          value={form.fatherName}
                          onChange={handleChange}
                          required
                        />
                        
                        <Field
                          label="Date of Birth"
                          name="dateOfBirth"
                          value={form.dateOfBirth}
                          onChange={handleChange}
                          type="date"
                          required
                        />
                        
                        <Field
                          label="City"
                          name="city"
                          value={form.city}
                          onChange={handleChange}
                          required
                        />
                        
                        <Field
                          label="Previous School"
                          name="previousSchool"
                          value={form.previousSchool}
                          onChange={handleChange}
                          required
                        />
                        
                        <Field
                          label="Board"
                          name="board"
                          value={form.board}
                          onChange={handleChange}
                          required
                        />
                        
                        <Field
                          label="Marks"
                          name="marks"
                          value={form.marks}
                          onChange={handleChange}
                          type="number"
                          required
                        />
                        
                        <Field
                          label="Passing Year"
                          name="passingYear"
                          value={form.passingYear}
                          onChange={handleChange}
                          type="number"
                          required
                        />
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            <FaBuilding className="inline mr-2 text-purple-600" /> Department
                          </label>
                          <select
                            name="department"
                            value={form.department}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                          >
                            <option value="">Choose a department</option>
                            <option value="IT">Information Technology</option>
                            <option value="CIVIL">Civil Engineering</option>
                            <option value="MECHANICS">Mechanical Engineering</option>
                            <option value="ELECTRICAL">Electrical Engineering</option>
                            <option value="OTHER">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-6">
                        <button
                          type="submit"
                          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 font-semibold shadow-lg transform transition-all duration-200 hover:scale-105 flex items-center gap-2"
                        >
                          <FaCheckCircle /> Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditMode(false)}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center gap-2"
                        >
                          <FaTimes /> Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* View Mode */
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Personal Information */}
                        <div>
                          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                            <FaUserGraduate /> Personal Information
                          </h4>
                          
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                              <FaUserGraduate className="text-blue-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</p>
                                <p className="text-gray-800 dark:text-gray-100">{application.name}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                              <FaUserGraduate className="text-blue-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Father's Name</p>
                                <p className="text-gray-800 dark:text-gray-100">{application.fatherName}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                              <FaCalendarAlt className="text-green-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</p>
                                <p className="text-gray-800 dark:text-gray-100">{formatDate(application.dateOfBirth)}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                              <FaCity className="text-yellow-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">City</p>
                                <p className="text-gray-800 dark:text-gray-100">{application.city}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Academic Information */}
                        <div>
                          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                            <FaBook /> Academic Information
                          </h4>
                          
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                              <FaSchool className="text-red-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Previous School</p>
                                <p className="text-gray-800 dark:text-gray-100">{application.previousSchool}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                              <FaBook className="text-indigo-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Board</p>
                                <p className="text-gray-800 dark:text-gray-100">{application.board}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                              <FaBook className="text-indigo-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Marks</p>
                                <p className="text-gray-800 dark:text-gray-100">{application.marks}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                              <FaBook className="text-indigo-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Passing Year</p>
                                <p className="text-gray-800 dark:text-gray-100">{application.passingYear}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                              <FaBuilding className="text-purple-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Department</p>
                                <p className="text-gray-800 dark:text-gray-100">{application.department}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Admin Message */}
                      {application.message && (
                        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
                          <h5 className="font-semibold text-blue-800 dark:text-blue-400 mb-2 flex items-center gap-2">
                            <FaEnvelope /> Message from Administration
                          </h5>
                          <p className="text-blue-700 dark:text-blue-300">{application.message}</p>
                        </div>
                      )}
                      
                      {/* Submission Info */}
                      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span>Submitted: {formatDate(application.createdAt)}</span>
                          {application.updatedAt && application.updatedAt !== application.createdAt && (
                            <span>Updated: {formatDate(application.updatedAt)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* No Application State */}
            {selected === "manage" && !application && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <FaClipboardList className="text-4xl text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  No Application Submitted
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  You haven't submitted an admission application yet.
                </p>
                <button
                  onClick={() => setSelected("apply")}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 font-semibold shadow-lg transform transition-all duration-200 hover:scale-105 flex items-center gap-2"
                >
                  <FaClipboardList /> Apply Now
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDashboard;