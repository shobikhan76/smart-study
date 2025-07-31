import React from "react";

const AdminCourses = ({
  courses,
  courseForm,
  handleCourseChange,
  handleCourseSubmit,
  handleEditCourse,
  handleDeleteCourse,
  message,
}) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Create Course</h2>
    <form className="mb-6 space-y-2" onSubmit={handleCourseSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Course Title"
        value={courseForm.title}
        onChange={handleCourseChange}
        className="w-full px-3 py-2 border rounded"
        required
      />
      <input
        type="text"
        name="code"
        placeholder="Course Code"
        value={courseForm.code}
        onChange={handleCourseChange}
        className="w-full px-3 py-2 border rounded"
        required
      />
      <input
        type="text"
        name="department"
        placeholder="Department"
        value={courseForm.department}
        onChange={handleCourseChange}
        className="w-full px-3 py-2 border rounded"
        required
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Create
      </button>
    </form>
    <h2 className="text-lg font-semibold mb-2">All Courses</h2>
    <ul>
      {courses.map((c) => (
        <li
          key={c._id}
          className="mb-2 border-b pb-2 flex justify-between items-center"
        >
          <div>
            <span className="font-bold">{c.title}</span> ({c.code}) -{" "}
            {c.department}
          </div>
          <div className="flex gap-2">
            <button
              className="text-blue-600 hover:underline"
              onClick={() => {
                if (typeof handleEditCourse === "function") {
                  handleEditCourse(c);
                } else {
                  alert("Edit handler not provided");
                }
              }}
            >
              Edit
            </button>
            <button
              className="text-red-600 hover:underline"
              onClick={() => {
                if (typeof handleDeleteCourse === "function") {
                  handleDeleteCourse(c._id);
                } else {
                  alert("Delete handler not provided");
                }
              }}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
    {message && <div className="mb-4 text-green-600">{message}</div>}
  </div>
);

export default AdminCourses;
