const TeacherAnnouncements = ({
  announcements,
  announcementForm,
  handleAnnouncementChange,
  handleAnnouncementSubmit,
  handleDeleteAnnouncement,
}) => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Post Announcement</h2>
    <form onSubmit={handleAnnouncementSubmit} className="mb-6 space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={announcementForm.title}
        onChange={handleAnnouncementChange}
        required
        className="w-full border px-4 py-2 rounded"
      />
      <textarea
        name="content"
        placeholder="Write an announcement..."
        value={announcementForm.content}
        onChange={handleAnnouncementChange}
        required
        className="w-full border px-4 py-2 rounded h-32"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Post Announcement
      </button>
    </form>

    <h3 className="text-xl font-medium mb-2">Recent Announcements</h3>
    <ul className="space-y-3">
      {announcements.map((ann) => (
        <li key={ann._id} className="border-b pb-2 flex justify-between">
          <div>
            <strong>{ann.title}</strong>
            <p className="text-gray-600 text-sm">{ann.content}</p>
            <span className="text-xs text-gray-500">
              Posted on {new Date(ann.createdAt).toLocaleDateString()}
            </span>
          </div>
          <button
            onClick={() => handleDeleteAnnouncement(ann._id)}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
);
export default TeacherAnnouncements;
