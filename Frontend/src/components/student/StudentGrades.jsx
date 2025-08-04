import React from "react";

const StudentGrades = ({ grades, courses }) => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">My Grades</h2>
    {grades.length === 0 ? (
      <p className="text-gray-500">No grades available yet.</p>
    ) : (
      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Course</th>
            <th className="p-2 text-left">Code</th>
            <th className="p-2 text-left">Grade</th>
            <th className="p-2 text-left">Remarks</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((g, idx) => {
            // Try to get course info from grade, fallback to offered course
            let courseTitle = g.course?.title;
            let courseCode = g.course?.code;
            if (!courseTitle || !courseCode) {
              const offered = courses.find(
                (c) =>
                  c.course?._id === g.course?._id ||
                  c.course === g.course ||
                  c._id === g.course?._id ||
                  c.course?._id === g.course ||
                  c._id === g.course
              );
              courseTitle =
                courseTitle ||
                offered?.course?.title ||
                offered?.title ||
                "N/A";
              courseCode =
                courseCode || offered?.course?.code || offered?.code || "N/A";
            }
            return (
              <tr key={idx} className="border-b">
                <td className="p-2">{courseTitle}</td>
                <td className="p-2">{courseCode}</td>
                <td className="p-2">{g.grade}</td>
                <td className="p-2">{g.remarks || "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )}
  </div>
);

export default StudentGrades;
