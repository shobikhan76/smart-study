import React, { useState } from "react";

const TeacherCourses = ({ courses, students, fetchStudentsInCourse }) => {
  const [expandedCourse, setExpandedCourse] = useState(null);

  const handleCourseClick = async (courseId) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null);
    } else {
      setExpandedCourse(courseId);
      if (!students[courseId]) {
        await fetchStudentsInCourse(courseId);
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Your Assigned Courses
      </h2>

      {courses.length === 0 ? (
        <p className="text-gray-500">You are not assigned to any courses yet.</p>
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
                onClick={() => handleCourseClick(course._id)}
              >
                <div>
                  <h3 className="text-lg font-medium text-blue-700">
                    {course.course?.title || "Untitled Course"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Code: <span className="font-mono">{course.course?.code}</span> |{" "}
                    Department: {course.course?.department}
                  </p>
                  <p className="text-xs text-gray-500">
                    Semester: {course.semester} | Year: {course.year}
                  </p>
                </div>
                <span className="text-xl font-bold text-blue-500">
                  {expandedCourse === course._id ? "−" : "+"}
                </span>
              </div>

              {/* Students List */}
              {expandedCourse === course._id && (
                <div className="bg-white px-6 py-4 border-t">
                  <h4 className="text-md font-medium text-gray-800 mb-3">
                    Students Enrolled
                  </h4>
                  {students[course._id] && students[course._id].length > 0 ? (
                    <ul className="space-y-2">
                      {students[course._id].map((student) => (
                        <li
                          key={student._id}
                          className="text-sm text-gray-700 border-b pb-1 last:border-b-0"
                        >
                          {student.user?.name || student.name} (
                          {student.user?.email || student.email})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No students enrolled or loading...
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherCourses;
