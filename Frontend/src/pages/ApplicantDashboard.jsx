import React, { useEffect, useState } from "react";
import axios from "axios";

const Sidebar = ({ selected, setSelected, hasApplication }) => (
  <div className="w-64 bg-blue-800 text-white min-h-screen p-6 flex flex-col gap-4">
    <h2 className="text-2xl font-bold mb-8">Applicant Menu</h2>
    <button
      className={`text-left px-4 py-2 rounded ${selected === "apply" ? "bg-blue-600" : "hover:bg-blue-700"}`}
      onClick={() => setSelected("apply")}
      disabled={hasApplication}
    >
      Apply for Admission
    </button>
    <button
      className={`text-left px-4 py-2 rounded ${selected === "manage" ? "bg-blue-600" : "hover:bg-blue-700"}`}
      onClick={() => setSelected("manage")}
      disabled={!hasApplication}
    >
      Manage Application
    </button>
  </div>
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

  // Fetch application status on mount
  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/applications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data) setApplication(res.data);
      } catch (err) {
        setApplication(null);
      } finally {
        setLoading(false);
      }
    };
    fetchApplication();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit application
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
      setMessage("Application submitted successfully!");
      setSelected("manage");
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Failed to submit application."
      );
    }
  };

  // Update application
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
      setMessage("Application updated successfully!");
      setEditMode(false);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Failed to update application."
      );
    }
  };

  // Delete application
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
      setMessage("Application deleted.");
      setSelected("apply");
      setForm({
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
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Failed to delete application."
      );
    }
  };

  // Fill form with application data for editing
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
        <div className="text-lg">Loading...</div>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        selected={selected}
        setSelected={setSelected}
        hasApplication={!!application}
      />
      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
          <h1 className="text-2xl font-bold mb-4 text-blue-700">
            Applicant Dashboard
          </h1>
          {message && (
            <div className="mb-4 text-center text-green-600 font-semibold">
              {message}
            </div>
          )}

          {/* Apply Form */}
          {selected === "apply" && !application && (
            <form
              className="space-y-4 mt-4"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Apply for Admission
              </h2>
              <div>
                <label className="block text-gray-600 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Department</label>
                <input
                  type="text"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Father Name</label>
                <input
                  type="text"
                  name="fatherName"
                  value={form.fatherName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={form.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">
                  Previous School
                </label>
                <input
                  type="text"
                  name="previousSchool"
                  value={form.previousSchool}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Board</label>
                <input
                  type="text"
                  name="board"
                  value={form.board}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Marks</label>
                <input
                  type="number"
                  name="marks"
                  value={form.marks}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Passing Year</label>
                <input
                  type="number"
                  name="passingYear"
                  value={form.passingYear}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Submit Application
              </button>
            </form>
          )}

          {/* Manage Application */}
          {selected === "manage" && application && (
            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                Your Application Status:{" "}
                <span
                  className={
                    application.status === "pending"
                      ? "text-yellow-600"
                      : application.status === "approved"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {application.status}
                </span>
              </h2>
              {!editMode ? (
                <div>
                  <div className="mt-4 space-y-2">
                    <div>
                      <span className="font-medium">Department:</span>{" "}
                      {application.department}
                    </div>
                    <div>
                      <span className="font-medium">Father Name:</span>{" "}
                      {application.fatherName}
                    </div>
                    <div>
                      <span className="font-medium">Date of Birth:</span>{" "}
                      {new Date(application.dateOfBirth).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-medium">City:</span> {application.city}
                    </div>
                    <div>
                      <span className="font-medium">Previous School:</span>{" "}
                      {application.previousSchool}
                    </div>
                    <div>
                      <span className="font-medium">Board:</span> {application.board}
                    </div>
                    <div>
                      <span className="font-medium">Marks:</span> {application.marks}
                    </div>
                    <div>
                      <span className="font-medium">Passing Year:</span>{" "}
                      {application.passingYear}
                    </div>
                    {application.message && (
                      <div>
                        <span className="font-medium">Admin Message:</span>{" "}
                        {application.message}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                      onClick={startEdit}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <form className="space-y-4 mt-4" onSubmit={handleUpdate}>
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    Edit Application
                  </h2>
                  <div>
                    <label className="block text-gray-600 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">Department</label>
                    <input
                      type="text"
                      name="department"
                      value={form.department}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">Father Name</label>
                    <input
                      type="text"
                      name="fatherName"
                      value={form.fatherName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={form.dateOfBirth}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">
                      Previous School
                    </label>
                    <input
                      type="text"
                      name="previousSchool"
                      value={form.previousSchool}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">Board</label>
                    <input
                      type="text"
                      name="board"
                      value={form.board}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">Marks</label>
                    <input
                      type="number"
                      name="marks"
                      value={form.marks}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">Passing Year</label>
                    <input
                      type="number"
                      name="passingYear"
                      value={form.passingYear}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicantDashboard;