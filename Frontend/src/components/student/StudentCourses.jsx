import React, { useState } from "react";

const StudentCourses = ({ courses }) => {
  const [expandedCourse, setExpandedCourse] = useState(null);

  const handleCourseClick = (courseId) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Courses</h2>
      {courses.length === 0 ? (
        <p className="text-gray-500">No courses assigned yet.</p>
      ) : (
        <ul className="space-y-3">
          {courses.map((offered) => (
            <li
              key={offered._id}
              className="border rounded p-4 cursor-pointer bg-white hover:shadow-md transition-shadow"
              onClick={() => handleCourseClick(offered._id)}
            >
              {/* Course Title */}
              <div className="font-bold text-lg text-gray-800">
                {offered.course?.title || "Unnamed Course"}
              </div>

              {/* Course Info */}
              <div className="text-sm text-gray-600 mt-1">
                Code:{" "}
                <span className="font-medium">
                  {offered.course?.code || "N/A"}
                </span>{" "}
                | Department:{" "}
                <span className="font-medium">
                  {offered.course?.department || "N/A"}
                </span>
              </div>

              {/* Semester & Year */}
              <div className="text-xs text-gray-500 mt-1">
                Semester:{" "}
                <span className="font-medium">{offered.semester}</span> | Year:{" "}
                <span className="font-medium">{offered.year}</span>
              </div>

              {/* Expanded Details */}
              {expandedCourse === offered._id && (
                <div className="mt-3 pt-3 border-t border-gray-200 text-sm">
                  {/* Teachers */}
                  <div>
                    <strong>Teachers:</strong>{" "}
                    {offered.teachers && offered.teachers.length > 0 ? (
                      offered.teachers
                        .map((t) => t.user?.name || t.name || "Unknown")
                        .join(", ")
                    ) : (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </div>

                  {/* Other Students */}
                  <div className="mt-2">
                    <strong>Other Students:</strong>{" "}
                    {offered.students && offered.students.length > 0 ? (
                      offered.students
                        .filter((s) => s._id !== offered.enrolledStudent?._id) // Exclude current student
                        .map((s) => s.user?.name || s.name || "Unknown")
                        .join(", ")
                    ) : (
                      <span className="text-gray-500">No other students</span>
                    )}
                  </div>

                  {/* Optional: Add Grades Section Later */}
                  {/* 
                  <div className="mt-2">
                    <strong>Grades:</strong>
                    <div className="text-gray-600">No grades yet.</div>
                  </div>
                  */}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentCourses;
