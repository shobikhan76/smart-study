import React from "react";

const StudentQueries = ({
  queries,
  courses,
  queryForm,
  handleQueryChange,
  handleQuerySubmit,
}) => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Ask a Question</h2>
    <form onSubmit={handleQuerySubmit} className="mb-6 space-y-4">
      <select
        name="courseId"
        value={queryForm.courseId}
        onChange={handleQueryChange}
        required
        className="w-full border px-4 py-2 rounded"
      >
        <option value="">Select Course</option>
        {courses.map((c) => (
          <option key={c._id} value={c._id}>
            {c.course?.title || "Untitled"}
          </option>
        ))}
      </select>
      <textarea
        name="question"
        placeholder="Type your question..."
        value={queryForm.question}
        onChange={handleQueryChange}
        required
        className="w-full border px-4 py-2 rounded h-24"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Send Query
      </button>
    </form>

    <h3 className="text-xl font-medium mb-2">My Queries</h3>
    <ul className="space-y-3">
      {queries.map((q) => (
        <li key={q._id} className="border-b pb-2">
          <div>
            <strong>Course:</strong>{" "}
            {courses.find((c) => c._id === q.courseId)?.course?.title || "N/A"}
          </div>
          <div>
            <strong>Question:</strong> {q.question}
          </div>
          <div>
            <strong>Reply:</strong>{" "}
            {q.reply ? (
              <span className="text-green-700">{q.reply}</span>
            ) : (
              <span className="text-gray-500">No reply yet</span>
            )}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default StudentQueries;
