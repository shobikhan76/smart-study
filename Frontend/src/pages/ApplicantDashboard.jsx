import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

// Sidebar Component with Framer Motion
const Sidebar = ({ selected, setSelected, hasApplication }) => (
  <motion.div
    initial={{ x: -100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.4 }}
    className="w-64 bg-blue-800 text-white min-h-screen p-6 flex flex-col gap-4 shadow-md"
  >
    <h2 className="text-2xl font-bold mb-8">Applicant Menu</h2>
    <button
      className={`text-left px-4 py-2 rounded transition-all duration-200 ${
        selected === "apply" ? "bg-blue-600" : "hover:bg-blue-700"
      }`}
      onClick={() => setSelected("apply")}
      disabled={hasApplication}
    >
      Apply for Admission
    </button>
    <button
      className={`text-left px-4 py-2 rounded transition-all duration-200 ${
        selected === "manage" ? "bg-blue-600" : "hover:bg-blue-700"
      }`}
      onClick={() => setSelected("manage")}
      disabled={!hasApplication}
    >
      Manage Application
    </button>
  </motion.div>
);

const FadeInContainer = ({ children, keyProp }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={keyProp}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

const ApplicantDashboard = () => {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "", department: "", fatherName: "", dateOfBirth: "", city: "",
    previousSchool: "", board: "", marks: "", passingYear: ""
  });
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState("apply");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/applications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data) setApplication(res.data);
      } catch {
        setApplication(null);
      } finally {
        setLoading(false);
      }
    };
    fetchApplication();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/applications",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplication(res.data.application);
      setMessage("🎉 Application submitted successfully!");
      setSelected("manage");
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Failed to submit application.");
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
      setMessage(err.response?.data?.message || "❌ Failed to update application.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your application?")) return;
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/applications/${application._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplication(null);
      setMessage("🗑️ Application deleted.");
      setSelected("apply");
      setForm({
        name: "", department: "", fatherName: "", dateOfBirth: "", city: "",
        previousSchool: "", board: "", marks: "", passingYear: ""
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Failed to delete application.");
    }
  };

  const startEdit = () => {
    setForm({
      name: application.name || "",
      department: application.department || "",
      fatherName: application.fatherName || "",
      dateOfBirth: application.dateOfBirth ? application.dateOfBirth.slice(0, 10) : "",
      city: application.city || "",
      previousSchool: application.previousSchool || "",
      board: application.board || "",
      marks: application.marks || "",
      passingYear: application.passingYear || "",
    });
    setEditMode(true);
    setMessage("");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.4 }}>
          <div className="text-lg text-gray-600">Loading...</div>
        </motion.div>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar selected={selected} setSelected={setSelected} hasApplication={!!application} />
      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 border">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold mb-6 text-blue-700"
          >
            🎓 Applicant Dashboard
          </motion.h1>

          {message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 text-center text-green-600 font-medium"
            >
              {message}
            </motion.div>
          )}

          {/* Conditional Rendering with Animation */}
          <FadeInContainer keyProp={selected + editMode}>
            {selected === "apply" && !application && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Admission Form</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Department</label>
                      <input
                        type="text"
                        name="department"
                        value={form.department}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Father's Name</label>
                      <input
                        type="text"
                        name="fatherName"
                        value={form.fatherName}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={form.dateOfBirth}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">City</label>
                      <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Previous School</label>
                      <input
                        type="text"
                        name="previousSchool"
                        value={form.previousSchool}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Board</label>
                      <input
                        type="text"
                        name="board"
                        value={form.board}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Marks (%)</label>
                      <input
                        type="number"
                        name="marks"
                        value={form.marks}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Passing Year</label>
                      <input
                        type="text"
                        name="passingYear"
                        value={form.passingYear}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-4">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-all duration-200"
                    >
                      Submit Application
                    </button>
                  </div>
                </form>
              </div>
            )}

            {selected === "manage" && application && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Manage Application</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-sm font-medium text-gray-700">Name</span>
                      <span className="mt-1 block text-gray-900">{application.name}</span>
                    </div>
                    <div>
                      <span className="block text-sm font-medium text-gray-700">Department</span>
                      <span className="mt-1 block text-gray-900">{application.department}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-sm font-medium text-gray-700">Father's Name</span>
                      <span className="mt-1 block text-gray-900">{application.fatherName}</span>
                    </div>
                    <div>
                      <span className="block text-sm font-medium text-gray-700">Date of Birth</span>
                      <span className="mt-1 block text-gray-900">{new Date(application.dateOfBirth).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-sm font-medium text-gray-700">City</span>
                      <span className="mt-1 block text-gray-900">{application.city}</span>
                    </div>
                    <div>
                      <span className="block text-sm font-medium text-gray-700">Previous School</span>
                      <span className="mt-1 block text-gray-900">{application.previousSchool}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-sm font-medium text-gray-700">Board</span>
                      <span className="mt-1 block text-gray-900">{application.board}</span>
                    </div>
                    <div>
                      <span className="block text-sm font-medium text-gray-700">Marks (%)</span>
                      <span className="mt-1 block text-gray-900">{application.marks}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-sm font-medium text-gray-700">Passing Year</span>
                      <span className="mt-1 block text-gray-900">{application.passingYear}</span>
                    </div>
                  </div>
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={startEdit}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600 transition-all duration-200"
                    >
                      Edit Application
                    </button>
                    <button
                      onClick={handleDelete}
                      className="px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 transition-all duration-200"
                    >
                      Delete Application
                    </button>
                  </div>
                </div>

                {editMode && (
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-4">Edit Application</h4>
                    <form onSubmit={handleUpdate} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Name</label>
                          <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Department</label>
                          <input
                            type="text"
                            name="department"
                            value={form.department}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Father's Name</label>
                          <input
                            type="text"
                            name="fatherName"
                            value={form.fatherName}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                          <input
                            type="date"
                            name="dateOfBirth"
                            value={form.dateOfBirth}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">City</label>
                          <input
                            type="text"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Previous School</label>
                          <input
                            type="text"
                            name="previousSchool"
                            value={form.previousSchool}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Board</label>
                          <input
                            type="text"
                            name="board"
                            value={form.board}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Marks (%)</label>
                          <input
                            type="number"
                            name="marks"
                            value={form.marks}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Passing Year</label>
                          <input
                            type="text"
                            name="passingYear"
                            value={form.passingYear}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-4">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-all duration-200"
                        >
                          Update Application
                        </button>
                        <button
                          onClick={() => setEditMode(false)}
                          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow-md hover:bg-gray-400 transition-all duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}
          </FadeInContainer>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDashboard;
