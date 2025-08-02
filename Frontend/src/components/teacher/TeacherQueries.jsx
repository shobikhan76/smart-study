import React from "react";

const TeacherQueries = ({
  queries,
  replyForm,
  handleReplyChange,
  handleReplySubmit,
}) => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Student Queries</h2>
    {queries.length === 0 ? (
      <div>No queries yet.</div>
    ) : (
      <ul className="space-y-4">
        {queries.map((q) => (
          <li key={q._id} className="border-b pb-3">
            <div>
              <strong>From:</strong> {q.studentName} ({q.studentEmail})
            </div>
            <div className="mb-2">
              <strong>Query:</strong> {q.question}
            </div>
            <div>
              <strong>Reply:</strong>{" "}
              {q.reply ? (
                <span className="text-green-700">{q.reply}</span>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleReplySubmit(q._id);
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={replyForm[q._id] || ""}
                    onChange={(e) => handleReplyChange(q._id, e.target.value)}
                    placeholder="Type your reply"
                    className="border px-2 py-1 rounded flex-1"
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
    )}
  </div>
);

export default TeacherQueries;
