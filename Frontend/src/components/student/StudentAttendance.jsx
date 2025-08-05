import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentAttendance = ({ token, studentId, attendance }) => {
  const [percentage, setPercentage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!studentId) return;
    const fetchPercentage = async () => {
      setLoading(true);
      try {
        const percRes = await axios.get(
          `http://localhost:5000/api/attendance/percentage/${studentId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPercentage(percRes.data.attendancePercentage);
      } catch (error) {
        setPercentage(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPercentage();
  }, [studentId, token]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Attendance Report</h2>
      {loading ? (
        <p className="text-gray-500">Loading attendance...</p>
      ) : (
        <>
          <div className="mb-4">
            <strong>Attendance Percentage:</strong>{" "}
            <span className="text-blue-700 font-bold">
              {percentage || "N/A"}
            </span>
          </div>
          {attendance.length === 0 ? (
            <p className="text-gray-500">No attendance records found.</p>
          ) : (
            <table className="w-full text-sm border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Course</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((a, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="p-2">
                      {new Date(a.date).toLocaleDateString()}
                    </td>
                    <td className="p-2">
                      {a.course?.title || a.course?.course?.title || "N/A"}
                    </td>
                    <td className="p-2">
                      <span
                        className={
                          a.status === "present"
                            ? "text-green-700 font-bold"
                            : a.status === "absent"
                            ? "text-red-700 font-bold"
                            : "text-yellow-700 font-bold"
                        }
                      >
                        {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default StudentAttendance;
