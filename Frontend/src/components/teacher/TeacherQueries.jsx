import React from "react";

const TeacherQueries = ({
  queries,
  replyForm,
  handleReplyChange,
  handleReplySubmit,
}) => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Student Queries</h2>
    <ul className="space-y-4">
      {queries.map((q) => (
        <li key={q._id} className="border-b pb-3">
          <div>
            <strong>{q.course?.title || "Course"}</strong>
            <div className="text-sm text-gray-700 mb-1">
              <span className="font-medium">Student:</span>{" "}
              {q.student?.user?.name || "Unknown"}
            </div>
            <div className="mb-2">{q.question}</div>
            {q.reply ? (
              <div className="text-green-700 mb-2">
                <strong>Reply:</strong> {q.reply}
              </div>
            ) : (
              <form
                className="flex gap-2 items-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleReplySubmit(q._id);
                }}
              >
                <input
                  type="text"
                  placeholder="Type reply..."
                  value={replyForm[q._id] || ""}
                  onChange={(e) => handleReplyChange(q._id, e.target.value)}
                  className="border px-2 py-1 rounded w-64"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                >
                  Send
                </button>
              </form>
            )}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default TeacherQueries;
