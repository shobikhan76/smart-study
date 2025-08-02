import React from "react";
import { FaUser, FaEnvelope, FaKey, FaUsers, FaChalkboardTeacher, FaGraduationCap, FaEdit, FaTrash, FaPlus, FaList, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
const AdminUsers = ({
  users,
  userForm,
  handleUserFormChange,
  handleUserSubmit,
  handleEditUser,
  handleDeleteUser,
  editingUser,
  setEditingUser,
  message,
}) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-600 text-white rounded-lg">
          {editingUser ? <FaEdit /> : <FaUsers />}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {editingUser ? "Edit User" : "Create New User"}
          </h2>
          <p className="text-gray-600 text-sm">
            {editingUser 
              ? "Update user account details below." 
              : "Register a new user into the system."
            }
          </p>
        </div>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div className={`text-center py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
          message.includes("success") || message.includes("updated") || message.includes("created")
            ? "bg-green-100 text-green-800 border border-green-200"
            : "bg-red-100 text-red-800 border border-red-200"
        }`}>
          {message.includes("success") || message.includes("updated") || message.includes("created") ? (
            <FaCheckCircle />
          ) : (
            <FaExclamationCircle />
          )}
          {message}
        </div>
      )}

      {/* User Form */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100 shadow-sm">
        <form onSubmit={handleUserSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FaUser /> Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                value={userForm.name}
                onChange={handleUserFormChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
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
                value={userForm.email}
                onChange={handleUserFormChange}
                disabled={!!editingUser}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                placeholder={editingUser ? "Leave blank to keep current password" : "Create password"}
                value={userForm.password}
                onChange={handleUserFormChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
                required={!editingUser}
              />
            </div>

            {/* Role */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FaUsers /> Role
              </label>
              <select
                name="role"
                value={userForm.role}
                onChange={handleUserFormChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
                required
              >
                <option value="student">
                  <FaGraduationCap /> Student
                </option>
                <option value="teacher">
                  <FaChalkboardTeacher /> Teacher
                </option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <FaPlus /> {editingUser ? "Update User" : "Create User"}
            </button>

            {editingUser && (
              <button
                type="button"
                onClick={() => {
                  setEditingUser(null);
                  setUserForm({ name: "", email: "", password: "", role: "student" });
                }}
                className="flex items-center gap-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-6 py-2 rounded-lg transition"
              >
                <FaTimes /> Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* All Users Table */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-600 text-white rounded-lg">
              <FaList />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">All Users</h3>
              <p className="text-gray-600 text-sm">Manage all registered users and their roles.</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-700"><FaUser /> Name</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700"><FaEnvelope /> Email</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700"><FaUsers /> Role</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700"><FaBook /> Courses</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-500 italic">
                    No users registered yet. Start by creating a new user.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 font-medium text-gray-800">{u.name || "Unknown"}</td>
                    <td className="px-6 py-4 text-gray-600">{u.email || "—"}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        u.role === 'student'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {u.role === 'student' ? <FaGraduationCap /> : <FaChalkboardTeacher />}
                        {u.role === 'student' ? 'Student' : 'Teacher'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {(u.courses || []).length === 0 ? (
                        <span className="text-gray-400 text-sm">None</span>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {u.courses.slice(0, 2).map((c) => (
                            <span
                              key={c._id}
                              className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full"
                            >
                              {c.title || c.code || "Unnamed"}
                            </span>
                          ))}
                          {u.courses.length > 2 && (
                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                              +{u.courses.length - 2} more
                            </span>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditUser(u)}
                          className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition"
                          aria-label="Edit User"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u._id)}
                          className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition"
                          aria-label="Delete User"
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

export default AdminUsers;