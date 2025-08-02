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
      <button className=" bg-gradient-to-r from-red-800 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
        Create
      </button>
    </form>
    <h2 className="text-lg font-semibold mb-2">All Courses</h2>
    <ul className=" border-2 rounded-lg p-4">
      {courses.map((c) => (
        <li key={c._id} className=" flex justify-between items-center border m-1 rounded-xl p-3">
          <div>
            <span className="font-bold">{c.title}</span> ({c.code}) - {c.department}
          </div>
          <div className="flex gap-2   ">
            <button
              className=" bg-gradient-to-r from-blue-800 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => handleEditCourse(c)}
            >
              Edit
            </button>
            <button
              className=" bg-gradient-to-r from-red-800 bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => handleDeleteCourse(c._id)}
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
