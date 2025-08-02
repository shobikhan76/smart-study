import React, { useState } from "react";

const TeacherAttendance = ({
  courses,
  attendance,
  students,
  fetchStudentsInCourse,
  handleAttendanceSubmit,
}) => {
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Today by default
  const [courseAttendance, setCourseAttendance] = useState({}); // { studentId: "Present" | "Absent" }

  const handleCourseToggle = async (courseId) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null);
    } else {
      setExpandedCourse(courseId);
      // Load students if not already loaded
      if (!students[courseId]) {
        await fetchStudentsInCourse(courseId);
      }

      // Restore previously submitted or initialize as Present
      const saved = attendance[courseId] || {};
      const initialStatus = {};
      students[courseId]?.forEach((student) => {
        initialStatus[student._id] = saved[student._id]?.status || "Present";
      });
      setCourseAttendance(initialStatus);
    }
  };

  const handleStatusChange = (studentId, status) => {
    setCourseAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const records = Object.keys(courseAttendance).map((studentId) => ({
      studentId,
      status: courseAttendance[studentId],
      date,
    }));

    handleAttendanceSubmit(expandedCourse, records);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Mark Attendance
      </h2>

      {courses.length === 0 ? (
        <p className="text-gray-500">You are not assigned to any courses.</p>
      ) : (
        <div className="space-y-4">
          {courses.map((course) => (
            <div
              key={course._id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow transition-shadow"
            >
              {/* Course Header */}
              <div
                className="flex justify-between items-center px-6 py-4 bg-blue-50 cursor-pointer"
                onClick={() => handleCourseToggle(course._id)}
              >
                <div>
                  <h3 className="text-lg font-medium text-blue-700">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {course.code} • {course.department}
                  </p>
                </div>
                <span className="text-xl font-bold text-blue-500">
                  {expandedCourse === course._id ? "−" : "+"}
                </span>
              </div>

              {/* Attendance Form (Expanded) */}
              {expandedCourse === course._id && (
                <div className="bg-white px-6 py-4 border-t">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="border px-3 py-2 rounded w-40"
                        required
                      />
                    </div>

                    <h4 className="text-md font-medium text-gray-800 mb-3">
                      Students
                    </h4>
                    {students[course._id] && students[course._id].length > 0 ? (
                      <ul className="space-y-2 mb-4 max-h-96 overflow-y-auto">
                        {students[course._id].map((student) => (
                          <li
                            key={student._id}
                            className="flex justify-between items-center p-2 bg-gray-50 rounded"
                          >
                            <span className="text-sm font-medium text-gray-800">
                              {student.name}
                            </span>
                            <div className="flex gap-4">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name={`status-${student._id}`}
                                  value="Present"
                                  checked={
                                    courseAttendance[student._id] === "Present"
                                  }
                                  onChange={() =>
                                    handleStatusChange(student._id, "Present")
                                  }
                                  className="text-green-600"
                                />
                                <span className="ml-1 text-sm text-green-700">
                                  Present
                                </span>
                              </label>
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name={`status-${student._id}`}
                                  value="Absent"
                                  checked={
                                    courseAttendance[student._id] === "Absent"
                                  }
                                  onChange={() =>
                                    handleStatusChange(student._id, "Absent")
                                  }
                                  className="text-red-600"
                                />
                                <span className="ml-1 text-sm text-red-700">
                                  Absent
                                </span>
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-sm">
                        Loading students...
                      </p>
                    )}

                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                    >
                      Submit Attendance
                    </button>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherAttendance;
