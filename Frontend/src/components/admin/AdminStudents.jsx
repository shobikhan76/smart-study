import React from "react";
import { FaUserGraduate, FaEnvelope, FaKey, FaIdCard, FaBuilding, FaCalendarAlt, FaPhone, FaMapMarkerAlt, FaBook, FaEdit, FaTrash, FaPlus, FaList, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";

const AdminStudents = ({
  students,
  studentForm,
  handleStudentFormChange,
  handleStudentSubmit,
  handleEditStudent,
  handleDeleteStudent,
  editingStudent,
  setEditingStudent,
  message,
}) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-600 text-white rounded-lg">
          {editingStudent ? <FaEdit /> : <FaUserGraduate />}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {editingStudent ? "Edit Student" : "Create New Student"}
          </h2>
          <p className="text-gray-600 text-sm">
            {editingStudent 
              ? "Update student information below." 
              : "Register a new student into the system."
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

      {/* Student Form */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 shadow-sm">
        <form onSubmit={handleStudentSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FaUserGraduate /> Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter student's full name"
                value={studentForm.name}
                onChange={handleStudentFormChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
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
                value={studentForm.email}
                onChange={handleStudentFormChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
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
                placeholder={editingStudent ? "Leave blank to keep current password" : "Create password"}
                value={studentForm.password}
                onChange={handleStudentFormChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                required={!editingStudent}
              />
            </div>

            {/* Registration Number */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FaIdCard /> Registration No.
              </label>
              <input
                type="text"
                name="registrationNumber"
                placeholder="e.g., UNEZA-2024-001"
                value={studentForm.registrationNumber}
                onChange={handleStudentFormChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
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
                value={studentForm.department}
                onChange={handleStudentFormChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                required
              />
            </div>

            {/* Semester */}
           
           

            {/* Contact */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FaPhone /> Contact
              </label>
              <input
                type="text"
                name="contact"
                placeholder="e.g., +62 812-3456-7890"
                value={studentForm.contact}
                onChange={handleStudentFormChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                required
              />
            </div>

            {/* Address */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FaMapMarkerAlt /> Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="e.g., Denpasar, Bali"
                value={studentForm.address}
                onChange={handleStudentFormChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <FaPlus /> {editingStudent ? "Update Student" : "Create Student"}
            </button>

            {editingStudent && (
              <button
                type="button"
                onClick={() => {
                  setEditingStudent(null);
                  setStudentForm({
                    name: "",
                    email: "",
                    password: "",
                    registrationNumber: "",
                    department: "",
                    // semester: "",
                    contact: "",
                    address: "",
                    courses: [],
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

      {/* All Students Table */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-600 text-white rounded-lg">
              <FaList />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">All Students</h3>
              <p className="text-gray-600 text-sm">Manage registered students and their details.</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-700"><FaUserGraduate /> Name</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700"><FaEnvelope /> Email</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700"><FaIdCard /> Reg No.</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700"><FaBuilding /> Dept</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700"><FaCalendarAlt /> Sem</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700"><FaPhone /> Contact</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700"><FaMapMarkerAlt /> Address</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700"><FaBook /> Courses</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-10 text-gray-500 italic">
                    No students registered yet. Start by creating a new student.
                  </td>
                </tr>
              ) : (
                students.map((s) => (
                  <tr key={s._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 font-medium text-gray-800">{s.user?.name || s.name || "N/A"}</td>
                    <td className="px-6 py-4 text-gray-600">{s.user?.email || s.email || "N/A"}</td>
                    <td className="px-6 py-4 text-gray-600 font-mono text-sm">{s.registrationNumber || "—"}</td>
                    <td className="px-6 py-4 text-gray-600">{s.department || "—"}</td>
                    {/* <td className="px-6 py-4 text-gray-600">{s.semester || "—"}</td> */}
                    <td className="px-6 py-4 text-gray-600">{s.contact || "—"}</td>
                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate" title={s.address}>
                      {s.address || "—"}
                    </td>
                    <td className="px-6 py-4">
                      {(s.courses || []).length === 0 ? (
                        <span className="text-gray-400 text-sm">None</span>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {s.courses.slice(0, 2).map((c) => (
                            <span
                              key={c._id || c}
                              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                            >
                              {typeof c === "object" ? c.title : c}
                            </span>
                          ))}
                          {s.courses.length > 2 && (
                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                              +{s.courses.length - 2} more
                            </span>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditStudent(s)}
                          className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition"
                          aria-label="Edit Student"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(s._id)}
                          className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition"
                          aria-label="Delete Student"
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

export default AdminStudents;