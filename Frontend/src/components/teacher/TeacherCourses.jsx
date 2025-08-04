import React, { useState } from "react";

const gradeOptions = ["A+", "A", "B", "C", "D", "F"];

const TeacherCourses = ({
  courses,
  students,
  fetchStudentsInCourse,
  handleGradeSubmit,
}) => {
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [showGradeForm, setShowGradeForm] = useState({}); // { [studentId]: true/false }
  const [gradeInput, setGradeInput] = useState({});
  const [remarksInput, setRemarksInput] = useState({});
  const [finalGradeAssignment, setFinalGradeAssignment] =
    useState("Final Grade");

  const handleCourseClick = async (courseId) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null);
      setShowGradeForm({});
      setGradeInput({});
    } else {
      setExpandedCourse(courseId);
      if (!students[courseId]) {
        await fetchStudentsInCourse(courseId);
      }
      setShowGradeForm({});
      setGradeInput({});
    }
  };

  const handleShowGradeForm = (studentId) => {
    setShowGradeForm((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
    setGradeInput((prev) => ({
      ...prev,
      [studentId]: "",
    }));
  };

  const handleGradeInputChange = (studentId, value) => {
    setGradeInput((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  const handleRemarksInputChange = (studentId, value) => {
    setRemarksInput((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  const handleGradeFormSubmit = (e, courseId, studentId) => {
    e.preventDefault();
    if (gradeInput[studentId] !== "") {
      handleGradeSubmit(
        courseId,
        studentId,
        "Final Grade", // assignment (optional, not used in backend)
        gradeInput[studentId],
        remarksInput[studentId] || ""
      );
      setShowGradeForm((prev) => ({
        ...prev,
        [studentId]: false,
      }));
      setGradeInput((prev) => ({
        ...prev,
        [studentId]: "",
      }));
      setRemarksInput((prev) => ({
        ...prev,
        [studentId]: "",
      }));
      alert("Final grade submitted!");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Your Assigned Courses
      </h2>

      {courses.length === 0 ? (
        <p className="text-gray-500">
          You are not assigned to any courses yet.
        </p>
      ) : (
        <div className="space-y-4">
          {courses.map((offered) => (
            <div
              key={offered._id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow transition-shadow"
            >
              {/* Course Header */}
              <div
                className="flex justify-between items-center px-6 py-4 bg-blue-50 cursor-pointer"
                onClick={() => handleCourseClick(offered._id)}
              >
                <div>
                  <h3 className="text-lg font-medium text-blue-700">
                    {offered.course?.title || "Untitled Course"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Code:{" "}
                    <span className="font-mono">{offered.course?.code}</span> |{" "}
                    Department: {offered.course?.department}
                  </p>
                  <p className="text-xs text-gray-500">
                    Semester: {offered.semester} | Year: {offered.year}
                  </p>
                </div>
                <span className="text-xl font-bold text-blue-500">
                  {expandedCourse === offered._id ? "−" : "+"}
                </span>
              </div>

              {/* Students List and Final Grade Button */}
              {expandedCourse === offered._id && (
                <div className="bg-white px-6 py-4 border-t">
                  <h4 className="text-md font-medium text-gray-800 mb-3">
                    Students Enrolled
                  </h4>
                  {students[offered._id] && students[offered._id].length > 0 ? (
                    <ul className="space-y-2">
                      {students[offered._id].map((student) => (
                        <li
                          key={student._id}
                          className="flex flex-col gap-2 text-sm text-gray-700 border-b pb-2 last:border-b-0"
                        >
                          <div className="flex items-center justify-between">
                            <span>
                              {student.user?.name || student.name} (
                              {student.user?.email || student.email})
                            </span>
                            <button
                              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 ml-4"
                              onClick={() => handleShowGradeForm(student._id)}
                              type="button"
                            >
                              Final Grade
                            </button>
                          </div>
                          {showGradeForm[student._id] && (
                            <form
                              className="mt-2 flex gap-2 items-center"
                              onSubmit={(e) =>
                                handleGradeFormSubmit(
                                  e,
                                  offered._id,
                                  student._id
                                )
                              }
                            >
                              <select
                                value={gradeInput[student._id] || ""}
                                onChange={(e) =>
                                  handleGradeInputChange(
                                    student._id,
                                    e.target.value
                                  )
                                }
                                className="border px-2 py-1 rounded w-24"
                                required
                              >
                                <option value="">Select Grade</option>
                                {gradeOptions.map((g) => (
                                  <option key={g} value={g}>
                                    {g}
                                  </option>
                                ))}
                              </select>
                              <input
                                type="text"
                                placeholder="Remarks (optional)"
                                value={remarksInput[student._id] || ""}
                                onChange={(e) =>
                                  handleRemarksInputChange(
                                    student._id,
                                    e.target.value
                                  )
                                }
                                className="border px-2 py-1 rounded w-32"
                              />
                              <button
                                type="submit"
                                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                                onClick={() => handleShowGradeForm(student._id)}
                              >
                                Cancel
                              </button>
                            </form>
                          )}
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
