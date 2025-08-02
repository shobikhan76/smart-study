import React, { useState } from "react";

const TeacherGrades = ({
  courses,
  grades,
  students,
  fetchStudentsInCourse,
  handleGradeSubmit,
}) => {
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [assignment, setAssignment] = useState("Midterm Exam"); // Default assignment
  const [courseGrades, setCourseGrades] = useState({}); // { studentId: grade }

  const handleCourseToggle = async (courseId) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null);
    } else {
      setExpandedCourse(courseId);
      // Load students if not already loaded
      if (!students[courseId]) {
        await fetchStudentsInCourse(courseId);
      }

      // Pre-fill grades if they exist for current assignment
      const studentGrades = {};
      const courseGradeData = grades[courseId] || [];

      students[courseId]?.forEach((student) => {
        const studentGradeEntry = courseGradeData.find(
          (g) => g.studentId === student._id && g.assignment === assignment
        );
        studentGrades[student._id] = studentGradeEntry
          ? String(studentGradeEntry.grade)
          : "";
      });

      setCourseGrades(studentGrades);
    }
  };

  const handleAssignmentChange = (e) => {
    const newAssignment = e.target.value;
    setAssignment(newAssignment);

    // Update grades form if we switch assignment
    if (expandedCourse && students[expandedCourse]) {
      const studentGrades = {};
      const courseGradeData = grades[expandedCourse] || [];

      students[expandedCourse].forEach((student) => {
        const studentGradeEntry = courseGradeData.find(
          (g) => g.studentId === student._id && g.assignment === newAssignment
        );
        studentGrades[student._id] = studentGradeEntry
          ? String(studentGradeEntry.grade)
          : "";
      });

      setCourseGrades(studentGrades);
    }
  };

  const handleGradeChange = (studentId, value) => {
    setCourseGrades((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const records = Object.keys(courseGrades)
      .filter((studentId) => courseGrades[studentId] !== "") // Only submit non-empty
      .map((studentId) => ({
        courseId: expandedCourse,
        studentId,
        assignment,
        grade: parseFloat(courseGrades[studentId]),
      }));

    if (records.length === 0) {
      alert("No valid grades to submit.");
      return;
    }

    // Submit each record (or batch them if backend supports array)
    records.forEach((record) => {
      handleGradeSubmit(
        record.courseId,
        record.studentId,
        record.assignment,
        record.grade
      );
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Enter Student Grades
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

              {/* Grades Form (Expanded) */}
              {expandedCourse === course._id && (
                <div className="bg-white px-6 py-4 border-t">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Assignment / Exam
                      </label>
                      <input
                        type="text"
                        value={assignment}
                        onChange={handleAssignmentChange}
                        placeholder="e.g., Final Exam, Quiz 2"
                        className="border px-3 py-2 rounded w-full md:w-64"
                        required
                      />
                    </div>

                    <h4 className="text-md font-medium text-gray-800 mb-3">
                      Student Grades
                    </h4>
                    {students[course._id] && students[course._id].length > 0 ? (
                      <ul className="space-y-2 mb-4 max-h-96 overflow-y-auto">
                        {students[course._id].map((student) => {
                          // Find existing grade for this student + assignment
                          const existingGrade = (grades[course._id] || []).find(
                            (g) =>
                              g.studentId === student._id &&
                              g.assignment === assignment
                          );
                          return (
                            <li
                              key={student._id}
                              className="flex justify-between items-center p-2 bg-gray-50 rounded"
                            >
                              <span className="text-sm font-medium text-gray-800">
                                {student.name}
                              </span>
                              <div className="flex items-center gap-3">
                                <input
                                  type="number"
                                  step="0.1"
                                  min="0"
                                  max="100"
                                  placeholder="Grade"
                                  value={courseGrades[student._id] || ""}
                                  onChange={(e) =>
                                    handleGradeChange(
                                      student._id,
                                      e.target.value
                                    )
                                  }
                                  className="border px-2 py-1 rounded w-20 text-center"
                                />
                                {existingGrade && (
                                  <span className="text-xs text-gray-500">
                                    (Prev: {existingGrade.grade})
                                  </span>
                                )}
                              </div>
                            </li>
                          );
                        })}
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
                      Save Grades
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

export default TeacherGrades;
