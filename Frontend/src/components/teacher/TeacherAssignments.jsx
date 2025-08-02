import React from "react";

const TeacherAssignments = ({
  assignments,
  courses,
  assignmentForm,
  handleAssignmentChange,
  handleAssignmentSubmit,
}) => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Manage Assignments</h2>
    <form onSubmit={handleAssignmentSubmit} className="mb-6 space-y-4">
      <select
        name="courseId"
        value={assignmentForm.courseId}
        onChange={handleAssignmentChange}
        required
        className="w-full border px-4 py-2 rounded"
      >
        <option value="">Select Course</option>
        {courses.map((c) => (
          <option key={c._id} value={c._id}>
            {c.title}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="title"
        placeholder="Assignment Title"
        value={assignmentForm.title}
        onChange={handleAssignmentChange}
        required
        className="w-full border px-4 py-2 rounded"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={assignmentForm.description}
        onChange={handleAssignmentChange}
        required
        className="w-full border px-4 py-2 rounded"
      />
      <input
        type="date"
        name="dueDate"
        value={assignmentForm.dueDate}
        onChange={handleAssignmentChange}
        required
        className="w-full border px-4 py-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Post Assignment
      </button>
    </form>
    <h3 className="text-xl font-medium mb-2">Your Assignments</h3>
    <ul className="space-y-3">
      {assignments.map((a) => (
        <li key={a._id} className="border-b pb-2">
          <strong>{a.title}</strong> ({a.courseTitle})<br />
          <span className="text-gray-600 text-sm">{a.description}</span>
          <br />
          <span className="text-xs text-gray-500">
            Due: {new Date(a.dueDate).toLocaleDateString()}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default TeacherAssignments;
