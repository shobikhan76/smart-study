import React from "react";
import { FaBell, FaPaperPlane, FaTrash, FaExclamationCircle } from "react-icons/fa";

const AdminAnnouncements = ({
  announcements,
  announcementForm,
  handleAnnouncementChange,
  handleAnnouncementSubmit,
  handleDeleteAnnouncement,
  message,
}) => {
  return (
    <div className="space-y-8">
      {/* Post Announcement Section */}
      <div className="bg-gradient-to-br from-red-310 to-red-50 p-6 rounded-2xl border border-blue-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-red-600 text-white rounded-lg">
            <FaBell className="text-lg" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-red-800">Post Announcement</h2>
            <p className="text-gray-600 text-sm">Share important updates with students and staff.</p>
          </div>
        </div>

        <form onSubmit={handleAnnouncementSubmit} className="space-y-4">
          {/* Title Input */}
          <div className="space-y-1">
            <label htmlFor="title" className="text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter announcement title"
              value={announcementForm.title}
              onChange={handleAnnouncementChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-shadow bg-white"
              required
            />
          </div>

          {/* Content Textarea */}
          <div className="space-y-1">
            <label htmlFor="content" className="text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              placeholder="Write your announcement here..."
              value={announcementForm.content}
              onChange={handleAnnouncementChange}
              rows="4"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-shadow bg-white resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2 flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <FaPaperPlane /> Post Announcement
          </button>
        </form>
      </div>

      {/* All Announcements Section */}
      <div className="bg-gradient-to-r from-red-10 to-red-150 rounded-2xl shadow-md border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-red-10 to-red-100 ">
          <div className="flex items-center gap-3 ">
            <div className="p-2 bg-red-600 text-white rounded-lg">
              <FaBell className="text-sm" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">All Announcements</h2>
              <p className="text-gray-600 text-sm">Manage and delete existing announcements.</p>
            </div>
          </div>
        </div>

        <ul className="divide-y divide-gray-100">
          {announcements.length === 0 ? (
            <li className="p-6 text-center text-gray-500 italic">
              No announcements yet. Start by posting one!
            </li>
          ) : (
            announcements.map((a) => (
              <li
                key={a._id}
                className="p-5 hover:bg-gray-50 transition-colors duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-sm sm:text-base">{a.title}</h3>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">{a.content}</p>
                  <span className="text-xs text-gray-500 mt-2 block">
                    Posted by: <span className="font-medium">{a.postedBy?.name || "Admin"}</span>
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteAnnouncement(a._id)}
                  className="self-start sm:self-center mt-2 sm:mt-0 w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-1"
                >
                  <FaTrash className="text-sm" /> Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div
          className={`text-center py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
            message.includes("success") || message.includes("posted") || message.includes("updated") || message.includes("created")
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          <FaExclamationCircle />
          {message}
        </div>
      )}
    </div>
  );
};

export default AdminAnnouncements;