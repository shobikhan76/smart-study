import React, { useState } from "react";

const StudentAssignments = ({
  assignments,
  courses,
  assignmentForm,
  handleAssignmentChange,
  handleAssignmentSubmit,
  handleFileChange,
}) => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Submit Assignment</h2>
    <form
      onSubmit={handleAssignmentSubmit}
      className="mb-6 space-y-4"
      encType="multipart/form-data"
    >
      <select
        name="course"
        value={assignmentForm.course}
        onChange={handleAssignmentChange}
        required
        className="w-full border px-4 py-2 rounded"
      >
        <option value="">Select Course</option>
        {courses.map((c) => (
          <option key={c._id} value={c._id}>
            {c.course?.title || c.title}
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
        type="file"
        name="pdf"
        accept="application/pdf"
        onChange={handleFileChange}
        required
        className="w-full border px-4 py-2 rounded"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Submit Assignment
      </button>
    </form>
    <h3 className="text-xl font-medium mb-2">My Assignments</h3>
    <ul className="space-y-3">
      {assignments.map((a) => (
        <li key={a._id} className="border-b pb-2">
          <strong>{a.title}</strong> ({a.course?.title})<br />
          <span className="text-gray-600 text-sm">{a.description}</span>
          <br />
          <span className="text-xs text-gray-500">
            Due: {a.dueDate ? new Date(a.dueDate).toLocaleDateString() : "N/A"}
          </span>
          {a.fileUrl && (
            <div>
              <a
                href={a.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Download PDF
              </a>
            </div>
          )}
          {a.marks !== undefined && (
            <div className="mt-2 text-green-700 font-semibold">
              Marks: {a.marks} / 20
            </div>
          )}
          {a.replyFileUrl && (
            <div>
              <a
                href={a.replyFileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 underline"
              >
                Teacher Reply PDF
              </a>
            </div>
          )}
        </li>
      ))}
    </ul>
  </div>
);

export default StudentAssignments;
