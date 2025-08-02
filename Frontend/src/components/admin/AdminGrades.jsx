import React from "react";
import { FaChartBar, FaUserGraduate, FaBook, FaStar, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";

const AdminGrades = ({ grades, message }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-600 text-white rounded-lg">
          <FaChartBar />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Student Grades</h2>
          <p className="text-gray-600 text-sm">View and manage academic performance records.</p>
        </div>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div className={`text-center py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
          message.includes("success") || message.includes("updated") || message.includes("assigned")
            ? "bg-green-100 text-green-800 border border-green-200"
            : "bg-red-100 text-red-800 border border-red-200"
        }`}>
          {message.includes("success") || message.includes("updated") || message.includes("assigned") ? (
            <FaCheckCircle />
          ) : (
            <FaExclamationCircle />
          )}
          {message}
        </div>
      )}

      {/* Grades Table */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-600 text-white rounded-lg">
              <FaChartBar />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">All Grades</h3>
              <p className="text-gray-600 text-sm">Comprehensive view of student academic performance.</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  <div className="flex items-center gap-1">
                    <FaUserGraduate /> Student
                  </div>
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  <div className="flex items-center gap-1">
                    <FaBook /> Course
                  </div>
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  <div className="flex items-center gap-1">
                    <FaStar /> Grade
                  </div>
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {grades.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-10 text-gray-500 italic">
                    No grades available yet. Grades will appear here once entered by instructors.
                  </td>
                </tr>
              ) : (
                grades.map((g) => (
                  <tr key={g._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-2">
                      <FaUserGraduate className="text-gray-400" />
                      {g.student || "Unknown Student"}
                    </td>
                    <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                      <FaBook className="text-gray-400" />
                      {g.course || "Unnamed Course"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        ["A", "A-", "B+", "B"].includes(g.grade)
                          ? "bg-green-100 text-green-800"
                          : ["C+", "C", "D"].includes(g.grade)
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}>
                        {g.grade || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate" title={g.remarks}>
                      {g.remarks || "—"}
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

export default AdminGrades;