import React, { useState } from "react";
import axios from "axios";

const TeacherAssignments = ({
  assignments,
  courses,
  assignmentForm,
  handleAssignmentChange,
  handleAssignmentSubmit,
  handleFileChange,
  token,
  fetchAssignments,
}) => {
  const [markInputs, setMarkInputs] = useState({});
  const [replyFiles, setReplyFiles] = useState({});

  const handleMarkChange = (id, value) => {
    setMarkInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleReplyFileChange = (id, e) => {
    setReplyFiles((prev) => ({ ...prev, [id]: e.target.files[0] }));
  };

  const handleMarkSubmit = async (id) => {
    const formData = new FormData();
    formData.append("marks", markInputs[id]);
    if (replyFiles[id]) formData.append("replyPdf", replyFiles[id]);
    await axios.post(
      `http://localhost:5000/api/assignments/${id}/mark`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setMarkInputs((prev) => ({ ...prev, [id]: "" }));
    setReplyFiles((prev) => ({ ...prev, [id]: null }));
    fetchAssignments();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Create Assignment</h2>
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
          type="date"
          name="dueDate"
          value={assignmentForm.dueDate}
          onChange={handleAssignmentChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="file"
          name="pdf"
          accept="application/pdf"
          onChange={handleFileChange}
          className="w-full border px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Post Assignment
        </button>
      </form>
      <h3 className="text-xl font-medium mb-2">Assignments</h3>
      <ul className="space-y-3">
        {assignments.map((a) => (
          <li key={a._id} className="border-b pb-2">
            <strong>{a.title}</strong> ({a.course?.title})
            <br />
            <span className="text-gray-600 text-sm">{a.description}</span>
            <br />
            <span className="text-xs text-gray-500">
              Due:{" "}
              {a.dueDate ? new Date(a.dueDate).toLocaleDateString() : "N/A"}
            </span>
            {a.fileUrl && (
              <div>
                <a
                  href={a.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Student PDF
                </a>
              </div>
            )}
            {a.marks !== undefined ? (
              <div className="mt-2 text-green-700 font-semibold">
                Marks: {a.marks} / 20
              </div>
            ) : (
              <form
                className="mt-2 flex gap-2 items-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleMarkSubmit(a._id);
                }}
              >
                <input
                  type="number"
                  min={0}
                  max={20}
                  step={1}
                  value={markInputs[a._id] || ""}
                  onChange={(e) => handleMarkChange(a._id, e.target.value)}
                  placeholder="Marks (out of 20)"
                  className="border px-2 py-1 rounded w-24"
                  required
                />
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => handleReplyFileChange(a._id, e)}
                  className="border px-2 py-1 rounded w-40"
                />
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                >
                  Mark & Reply
                </button>
              </form>
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
};

export default TeacherAssignments;
