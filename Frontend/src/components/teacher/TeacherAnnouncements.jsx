import React, { useState } from "react";
import {
  FaBullhorn,
  FaCalendarAlt,
  FaTrash,
  FaExclamationCircle,
} from "react-icons/fa";

const TeacherAnnouncements = ({
  announcements = [],
  announcementForm,
  handleAnnouncementChange,
  handleAnnouncementSubmit,
  handleDeleteAnnouncement,
  darkMode = false,
}) => {
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!announcementForm.title?.trim() || !announcementForm.content?.trim())
      return;
    handleAnnouncementSubmit(e);
  };

  const startDelete = (id) => {
    setConfirmDelete(id);
  };

  const cancelDelete = () => {
    setConfirmDelete(null);
  };

  const confirmDeleteAction = async () => {
    const id = confirmDelete;
    setDeletingId(id);
    await handleDeleteAnnouncement(id);
    setConfirmDelete(null);
    setDeletingId(null);
  };

  return (
    <div
      className={`max-w-3xl mx-auto transition-colors duration-300 ${
        darkMode ? "text-gray-100" : "text-gray-800"
      }`}
    >
      {/* Post Announcement Form */}
      <div
        className={`bg-gradient-to-br ${
          darkMode ? "from-blue-900 to-purple-900" : "from-blue-50 to-indigo-50"
        } p-8 rounded-2xl shadow-xl mb-8 border ${
          darkMode ? "border-blue-700" : "border-blue-100"
        }`}
      >
        <h2 className="text-3xl font-bold mb-6 flex items-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          <FaBullhorn className="mr-3" /> Post Announcement
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Enter announcement title"
              value={announcementForm.title}
              onChange={handleAnnouncementChange}
              required
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200
                ${
                  darkMode
                    ? "bg-gray-800 border-gray-600 focus:ring-blue-500 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 focus:ring-blue-300 text-gray-900 placeholder-gray-500"
                } shadow-sm`}
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-1">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              placeholder="Write your announcement here..."
              value={announcementForm.content}
              onChange={handleAnnouncementChange}
              required
              rows="5"
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200 resize-none
                ${
                  darkMode
                    ? "bg-gray-800 border-gray-600 focus:ring-blue-500 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 focus:ring-blue-300 text-gray-900 placeholder-gray-500"
                } shadow-sm`}
            />
          </div>

          <button
            type="submit"
            disabled={!announcementForm.title || !announcementForm.content}
            className={`w-full sm:w-auto px-8 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-105 disabled:opacity-60 disabled:hover:scale-100
              ${
                darkMode
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md"
              }`}
          >
            <FaBullhorn /> Post Announcement
          </button>
        </form>
      </div>

      {/* Recent Announcements */}
      <h3
        className={`text-2xl font-bold mb-6 flex items-center ${
          darkMode ? "text-blue-300" : "text-blue-700"
        }`}
      >
        <FaBullhorn className="mr-2" /> Recent Announcements
      </h3>

      {announcements.length === 0 ? (
        <div
          className={`text-center py-10 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <FaExclamationCircle className="mx-auto text-6xl opacity-30 mb-4" />
          <p className="text-lg">No announcements yet.</p>
          <p className="text-sm">Post one to inform your students!</p>
        </div>
      ) : (
        <ul className="space-y-5">
          {announcements.map((ann) => (
            <li
              key={ann._id}
              className={`group p-5 rounded-xl transition-all duration-200 border-l-4 ${
                darkMode
                  ? "bg-gray-800 border-blue-500 hover:bg-gray-750"
                  : "bg-white border-blue-500 hover:shadow-md"
              } shadow-sm`}
            >
              <div className="flex justify-between items-start mb-3">
                <strong
                  className={`text-lg font-semibold ${
                    darkMode ? "text-blue-300" : "text-blue-800"
                  }`}
                >
                  {ann.title}
                </strong>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    } flex items-center`}
                  >
                    <FaCalendarAlt className="mr-1" />
                    {formatDate(ann.createdAt)}
                  </span>
                  {confirmDelete === ann._id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={confirmDeleteAction}
                        disabled={deletingId === ann._id}
                        className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 rounded bg-red-100 dark:bg-red-900"
                      >
                        {deletingId === ann._id ? "Deleting..." : "Yes"}
                      </button>
                      <button
                        onClick={cancelDelete}
                        className="text-gray-500 hover:text-gray-700 text-sm px-3 py-1 rounded"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startDelete(ann._id)}
                      className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all duration-200 ml-2"
                      aria-label="Delete announcement"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              </div>
              <p
                className={`${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } leading-relaxed`}
              >
                {ann.content}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeacherAnnouncements;
