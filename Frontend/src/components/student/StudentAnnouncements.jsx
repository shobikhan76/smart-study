import React from "react";

const StudentAnnouncements = ({ announcements }) => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Announcements</h2>
    {announcements.length === 0 ? (
      <p className="text-gray-500">No announcements yet.</p>
    ) : (
      <ul className="space-y-3">
        {announcements.map((ann) => (
          <li key={ann._id} className="border-b pb-2">
            <strong>{ann.title}</strong>
            <p className="text-gray-600 text-sm">{ann.content}</p>
            <span className="text-xs text-gray-500">
              Posted on {new Date(ann.createdAt).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default StudentAnnouncements;
