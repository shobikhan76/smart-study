import React from "react";

const AdminAnnouncements = ({
  announcements,
  announcementForm,
  handleAnnouncementChange,
  handleAnnouncementSubmit,
  handleDeleteAnnouncement,
  message,
}) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Post Announcement</h2>
    <form className="mb-6 space-y-2" onSubmit={handleAnnouncementSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={announcementForm.title}
        onChange={handleAnnouncementChange}
        className="w-full px-3 py-2 border rounded"
        required
      />
      <textarea
        name="content"
        placeholder="Content"
        value={announcementForm.content}
        onChange={handleAnnouncementChange}
        className="w-full px-3 py-2 border rounded"
        required
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Post
      </button>
    </form>
    <h2 className="text-lg font-semibold mb-2">All Announcements</h2>
    <ul>
      {announcements.map((a) => (
        <li
          key={a._id}
          className="mb-3 border-b pb-2 flex justify-between items-center"
        >
          <div>
            <span className="font-bold">{a.title}</span>: {a.content}
            <span className="ml-2 text-xs text-gray-500">
              ({a.postedBy?.name || "Admin"})
            </span>
          </div>
          <button
            className="text-red-600 hover:underline"
            onClick={() => handleDeleteAnnouncement(a._id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
    {message && <div className="mb-4 text-green-600">{message}</div>}
  </div>
);

export default AdminAnnouncements;
