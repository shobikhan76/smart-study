import React from "react";

const AdminResults = ({ results, handleDeleteResult, message }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">All Results</h2>
    <table className="w-full border">
      <thead>
        <tr className="bg-blue-100">
          <th>Name</th>
          <th>Roll No</th>
          <th>Course</th>
          <th>Department</th>
          <th>Marks</th>
          <th>Grade</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {results.map((r) => (
          <tr key={r._id} className="border-t">
            <td>{r.name}</td>
            <td>{r.rollNumber}</td>
            <td>{r.course}</td>
            <td>{r.department}</td>
            <td>
              {r.obtainedMarks}/{r.totalMarks} ({r.percentage}%)
            </td>
            <td>{r.grade}</td>
            <td>
              <button
                className="text-red-600 hover:underline"
                onClick={() => handleDeleteResult(r._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {message && <div className="mb-4 text-green-600">{message}</div>}
  </div>
);

export default AdminResults;
