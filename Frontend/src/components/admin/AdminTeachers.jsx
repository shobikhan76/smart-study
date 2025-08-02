import React from "react";
import {
  FaChalkboardTeacher,
  FaUser,
  FaEnvelope,
  FaKey,
  FaBriefcase,
  FaBuilding,
  FaPhone,
  FaEdit,
  FaTrash,
  FaPlus,
  FaList,
  FaExclamationCircle,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";

const AdminTeachers = ({
  teachers,
  teacherForm,
  handleTeacherFormChange,
  handleTeacherSubmit,
  handleEditTeacher,
  handleDeleteTeacher,
  editingTeacher,
  setEditingTeacher,
  setTeacherForm,
  message,
}) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-red-600 text-white rounded-lg">
          {editingTeacher ? <FaEdit /> : <FaChalkboardTeacher />}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {editingTeacher ? "Edit Teacher" : "Add New Teacher"}
          </h2>
          <p className="text-gray-600 text-sm">
            {editingTeacher
              ? "Update teacher details below."
              : "Register a new faculty member into the system."}
          </p>
        </div>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div
          className={`text-center py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
            message.includes("success") ||
            message.includes("updated") ||
            message.includes("created")
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {message.includes("success") ||
          message.includes("updated") ||
          message.includes("created") ? (
            <FaCheckCircle />
          ) : (
            <FaExclamationCircle />
          )}
          {message}
        </div>
      )}

      {/* Teacher Form */}
      <div className="bg-gradient-to-br from-red-50 to-purple-50 p-6 rounded-2xl border border-red-100 shadow-sm">
        <form onSubmit={handleTeacherSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FaUser /> Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter teacher's full name"
                value={teacherForm.name}
                onChange={handleTeacherFormChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FaEnvelope /> Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={teacherForm.email}
                onChange={handleTeacherFormChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FaKey /> Password
              </label>
              <input
                type="password"
                name="password"
                placeholder={
                  editingTeacher
                    ? "Leave blank to keep current password"
                    : "Create password"
                }
                value={teacherForm.password}
                onChange={handleTeacherFormChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                required={!editingTeacher}
              />
            </div>

            {/* Designation */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FaBriefcase /> Designation
              </label>
              <input
                type="text"
                name="designation"
                placeholder="e.g., Assistant Professor"
                value={teacherForm.designation}
                onChange={handleTeacherFormChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                required
              />
            </div>

            {/* Department */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FaBuilding /> Department
              </label>
              <input
                type="text"
                name="department"
                placeholder="e.g., Computer Science"
                value={teacherForm.department}
                onChange={handleTeacherFormChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                required
              />
            </div>

            {/* Contact */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FaPhone /> Contact
              </label>
              <input
                type="text"
                name="contact"
                placeholder="e.g., +62 812-3456-7890"
                value={teacherForm.contact}
                onChange={handleTeacherFormChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-900 hover:from-red-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <FaPlus /> {editingTeacher ? "Update Teacher" : "Create Teacher"}
            </button>

            {editingTeacher && (
              <button
                type="button"
                onClick={() => {
                  setEditingTeacher(null);
                  setTeacherForm({
                    name: "",
                    email: "",
                    password: "",
                    designation: "",
                    department: "",
                    contact: "",
                  });
                }}
                className="flex items-center gap-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-6 py-2 rounded-lg transition"
              >
                <FaTimes /> Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Teachers Table */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-800 text-white rounded-lg">
              <FaList />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">All Teachers</h3>
              <p className="text-gray-600 text-sm">
                Manage faculty members and their profiles.
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 w-20 text-left font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <FaUser /> <span>Name</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <FaEnvelope /> <span>Email</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <FaBriefcase /> <span>Designation</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <FaBuilding /> <span>Dept</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <FaPhone /> <span>Contact</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {teachers.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10 text-gray-500 italic"
                  >
                    No teachers registered yet. Start by adding a new faculty member.
                  </td>
                </tr>
              ) : (
                teachers.map((t) => (
                  <tr
                    key={t._id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {t.user?.name || "Unknown"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {t.user?.email || "—"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                        {t.designation || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {t.department || "—"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {t.contact || "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditTeacher(t)}
                          className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition"
                          aria-label="Edit Teacher"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteTeacher(t._id)}
                          className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition"
                          aria-label="Delete Teacher"
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

export default AdminTeachers;
