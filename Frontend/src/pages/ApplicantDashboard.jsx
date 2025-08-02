import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserGraduate, FaClipboardList, FaEdit, FaTrash, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

const Sidebar = ({ selected, setSelected, hasApplication }) => (
  <div className="w-64 bg-blue-900 text-white min-h-screen p-6 flex flex-col gap-4">
    <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
      <FaUserGraduate /> Applicant Menu
    </h2>
    <button
      className={`text-left px-4 py-2 rounded flex items-center gap-2 ${selected === "apply" ? "bg-blue-700" : "hover:bg-blue-800"}`}
      onClick={() => setSelected("apply")}
      disabled={hasApplication}
    >
      <FaClipboardList /> Apply for Admission
    </button>
    <button
      className={`text-left px-4 py-2 rounded flex items-center gap-2 ${selected === "manage" ? "bg-blue-700" : "hover:bg-blue-800"}`}
      onClick={() => setSelected("manage")}
      disabled={!hasApplication}
    >
      <FaEdit /> Manage Application
    </button>
  </div>
);

const StatusIcon = ({ status }) => {
  if (status === "approved") return <FaCheckCircle className="text-green-600 inline-block mr-2" />;
  if (status === "rejected") return <FaTimesCircle className="text-red-600 inline-block mr-2" />;
  return <FaClock className="text-yellow-600 inline-block mr-2" />;
};

const Field = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

const MessageBox = ({ message }) => (
  message ? <div className="mb-4 p-3 bg-green-100 text-green-800 rounded shadow text-sm">{message}</div> : null
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
      setMessage("Application submitted successfully!");
      setSelected("manage");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to submit application.");
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
      setMessage("Application updated successfully!");
      setEditMode(false);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to update application.");
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
      setMessage("Application deleted.");
      setSelected("apply");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to delete application.");
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

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar selected={selected} setSelected={setSelected} hasApplication={!!application} />
      <div className="flex-1 p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-semibold text-blue-800 mb-6">Applicant Dashboard</h1>
          <MessageBox message={message} />

          {selected === "apply" && !application && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold">Apply for Admission</h2>
              {Object.keys(form).map((key) => (
                <Field
                  key={key}
                  label={key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  type={key === "dateOfBirth" ? "date" : key === "marks" || key === "passingYear" ? "number" : "text"}
                />
              ))}
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                Submit Application
              </button>
            </form>
          )}

          {selected === "manage" && application && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Application Status</h2>
              <div className="mb-4 text-gray-700">
                <StatusIcon status={application.status} />
                <span className="font-medium">{application.status.toUpperCase()}</span>
              </div>

              {!editMode ? (
                <div className="space-y-2">
                  {Object.entries(application).map(([key, val]) =>
                    ["_id", "__v", "status", "message"].includes(key) ? null : (
                      <div key={key}>
                        <span className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}:</span> {val}
                      </div>
                    )
                  )}
                  {application.message && (
                    <div className="text-sm text-gray-600 italic">Admin Message: {application.message}</div>
                  )}
                  <div className="flex gap-4 mt-6">
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center gap-2"
                      onClick={startEdit}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center gap-2"
                      onClick={handleDelete}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleUpdate} className="space-y-4">
                  {Object.keys(form).map((key) => (
                    <Field
                      key={key}
                      label={key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                      name={key}
                      value={form[key]}
                      onChange={handleChange}
                      type={key === "dateOfBirth" ? "date" : key === "marks" || key === "passingYear" ? "number" : "text"}
                    />
                  ))}
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Save Changes
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
