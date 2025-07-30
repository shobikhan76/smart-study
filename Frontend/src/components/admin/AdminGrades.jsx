import React from "react";

const AdminGrades = ({ grades, message }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">All Grades</h2>
    <table className="w-full border">
      <thead>
        <tr className="bg-blue-100">
          <th>Student</th>
          <th>Course</th>
          <th>Grade</th>
          <th>Remarks</th>
        </tr>
      </thead>
      <tbody>
        {grades.map((g) => (
          <tr key={g._id} className="border-t">
            <td>{g.student}</td>
            <td>{g.course}</td>
            <td>{g.grade}</td>
            <td>{g.remarks}</td>
          </tr>
        ))}
      </tbody>
    </table>
    {message && <div className="mb-4 text-green-600">{message}</div>}
  </div>
);

export default AdminGrades;
