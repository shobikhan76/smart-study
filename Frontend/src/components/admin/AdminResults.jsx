import React from "react";
import { FaChartBar, FaUser, FaIdCard, FaBook, FaBuilding, FaCheck, FaTimes, FaTrash, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";

const AdminResults = ({ results, handleDeleteResult, message }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-600 text-white rounded-lg">
          <FaChartBar />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Student Results</h2>
          <p className="text-gray-600 text-sm">View and manage academic results and performance records.</p>
        </div>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div className={`text-center py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
          message.includes("success") || message.includes("deleted") || message.includes("updated")
            ? "bg-green-100 text-green-800 border border-green-200"
            : "bg-red-100 text-red-800 border border-red-200"
        }`}>
          {message.includes("success") || message.includes("deleted") || message.includes("updated") ? (
            <FaCheckCircle />
          ) : (
            <FaExclamationCircle />
          )}
          {message}
        </div>
      )}

      {/* Results Table */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-600 text-white rounded-lg">
              <FaChartBar />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">All Results</h3>
              <p className="text-gray-600 text-sm">Comprehensive view of student academic outcomes.</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  <div className="flex items-center gap-1">
                    <FaUser /> Name
                  </div>
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  <div className="flex items-center gap-1">
                    <FaIdCard /> Roll No
                  </div>
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  <div className="flex items-center gap-1">
                    <FaBook /> Course
                  </div>
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  <div className="flex items-center gap-1">
                    <FaBuilding /> Department
                  </div>
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Marks</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Grade</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {results.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-gray-500 italic">
                    No results available yet. Results will appear here once published.
                  </td>
                </tr>
              ) : (
                results.map((r) => (
                  <tr key={r._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-2">
                      <FaUser className="text-gray-400" />
                      {r.name || "Unknown"}
                    </td>
                    <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                      <FaIdCard className="text-gray-400" />
                      {r.rollNumber || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                      <FaBook className="text-gray-400" />
                      {r.course || "Unnamed"}
                    </td>
                    <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                      <FaBuilding className="text-gray-400" />
                      {r.department || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      <div className="flex flex-col">
                        <span>
                          <strong>{r.obtainedMarks || 0}</strong> / {r.totalMarks || 100}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({r.percentage ? `${r.percentage}%` : "N/A"})
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        ["A", "A-", "B+", "B"].includes(r.grade)
                          ? "bg-green-100 text-green-800"
                          : ["C+", "C", "D"].includes(r.grade)
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}>
                        {r.grade || "F"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDeleteResult(r._id)}
                        className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition"
                        aria-label="Delete Result"
                      >
                        <FaTrash />
                      </button>
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

export default AdminResults;