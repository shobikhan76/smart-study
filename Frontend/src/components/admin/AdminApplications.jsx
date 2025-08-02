import React from "react";
import { FaEdit, FaTrash, FaUserGraduate, FaEnvelope, FaCalendarAlt, FaCity, FaSchool, FaBook, FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaSave, FaTimes, FaSearch } from "react-icons/fa";

const AdminApplications = ({
  applications,
  editingApplication,
  applicationForm,
  handleEditApplication,
  handleApplicationFormChange,
  handleApplicationUpdate,
  handleDeleteApplication,
  setEditingApplication,
  message,
}) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-600 text-white rounded-lg">
          <FaUserGraduate />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Admission Applications</h2>
          <p className="text-gray-600 text-sm">Review and manage student admission requests.</p>
        </div>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div className={`p-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
          message.includes("success") || message.includes("updated") || message.includes("assigned")
            ? "bg-green-100 text-green-800 border border-green-200"
            : "bg-red-100 text-red-800 border border-red-200"
        }`}>
          {message.includes("success") || message.includes("updated") || message.includes("assigned") ? (
            <FaCheckCircle />
          ) : (
            <FaExclamationTriangle />
          )}
          {message}
        </div>
      )}

      {/* Edit Application Form */}
      {editingApplication && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-blue-600 text-white rounded-lg">
              <FaEdit />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Edit Application</h3>
          </div>

          <form onSubmit={handleApplicationUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Personal Info */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FaUserGraduate /> Full Name
              </label>
              <input
                type="text"
                name="name"
                value={applicationForm.name}
                onChange={handleApplicationFormChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FaEnvelope /> Email
              </label>
              <input
                type="email"
                name="email"
                value={applicationForm.email}
                onChange={handleApplicationFormChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FaUserGraduate /> Father's Name
              </label>
              <input
                type="text"
                name="fatherName"
                value={applicationForm.fatherName}
                onChange={handleApplicationFormChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FaCalendarAlt /> Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={applicationForm.dateOfBirth}
                onChange={handleApplicationFormChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FaCity /> City
              </label>
              <input
                type="text"
                name="city"
                value={applicationForm.city}
                onChange={handleApplicationFormChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FaSchool /> Previous School
              </label>
              <input
                type="text"
                name="previousSchool"
                value={applicationForm.previousSchool}
                onChange={handleApplicationFormChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FaBook /> Board
              </label>
              <input
                type="text"
                name="board"
                value={applicationForm.board}
                onChange={handleApplicationFormChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FaBook /> Marks
              </label>
              <input
                type="number"
                name="marks"
                value={applicationForm.marks}
                onChange={handleApplicationFormChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FaBook /> Passing Year
              </label>
              <input
                type="number"
                name="passingYear"
                value={applicationForm.passingYear}
                onChange={handleApplicationFormChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FaExclamationTriangle /> Status
              </label>
              <select
                name="status"
                value={applicationForm.status}
                onChange={handleApplicationFormChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                required
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FaEdit /> Message
              </label>
              <input
                type="text"
                name="message"
                placeholder="Optional message to applicant"
                value={applicationForm.message}
                onChange={handleApplicationFormChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              />
            </div>

            {/* Action Buttons */}
            <div className="md:col-span-2 flex gap-3 mt-6 justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-2 rounded-lg shadow-sm hover:shadow transition-all"
              >
                <FaSave /> Update Application
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingApplication(null);
                }}
                className="flex items-center gap-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-6 py-2 rounded-lg transition"
              >
                <FaTimes /> Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Applications Table */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-600 text-white rounded-lg">
              <FaSearch />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">All Applications</h3>
              <p className="text-gray-600 text-sm">Manage pending, approved, and rejected admissions.</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Name</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Email</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Department</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Father</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">DOB</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">City</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">School</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Board</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Marks</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Year</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Message</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan="13" className="text-center py-8 text-gray-500 italic">
                    No applications found. Students will appear here when they apply.
                  </td>
                </tr>
              ) : (
                applications.map((a) => (
                  <tr key={a._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 font-medium text-gray-800">{a.name}</td>
                    <td className="px-6 py-4 text-gray-600">{a.email}</td>
                    <td className="px-6 py-4 text-gray-600">{a.department}</td>
                    <td className="px-6 py-4 text-gray-600">{a.fatherName}</td>
                    <td className="px-6 py-4 text-gray-600">{a.dateOfBirth ? a.dateOfBirth.substring(0, 10) : "-"}</td>
                    <td className="px-6 py-4 text-gray-600">{a.city}</td>
                    <td className="px-6 py-4 text-gray-600">{a.previousSchool}</td>
                    <td className="px-6 py-4 text-gray-600">{a.board}</td>
                    <td className="px-6 py-4 text-gray-600">{a.marks}</td>
                    <td className="px-6 py-4 text-gray-600">{a.passingYear}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        a.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : a.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate" title={a.message}>
                      {a.message || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditApplication(a)}
                          className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition"
                          aria-label="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteApplication(a._id)}
                          className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition"
                          aria-label="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminApplications;