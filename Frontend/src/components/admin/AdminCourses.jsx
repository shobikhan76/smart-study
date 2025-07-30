import React from "react";

const AdminCourses = ({
  courses,
  courseForm,
  handleCourseChange,
  handleCourseSubmit,
  courseAssignForm,
  handleCourseAssignChange,
  handleAssignToCourse,
  users,
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
    <h2 className="text-lg font-semibold mb-2">
      Assign Students/Teachers to Course
    </h2>
    <form className="mb-6 space-y-2" onSubmit={handleAssignToCourse}>
      <select
        name="courseId"
        value={courseAssignForm.courseId}
        onChange={handleCourseAssignChange}
        className="w-full px-3 py-2 border rounded"
        required
      >
        <option value="">Select Course</option>
        {courses.map((c) => (
          <option key={c._id} value={c._id}>
            {c.title} ({c.code})
          </option>
        ))}
      </select>
      <select
        name="students"
        multiple
        value={courseAssignForm.students}
        onChange={handleCourseAssignChange}
        className="w-full px-3 py-2 border rounded"
      >
        {users
          .filter((u) => u.role === "student")
          .map((u) => (
            <option key={u._id} value={u._id}>
              {u.name} ({u.email})
            </option>
          ))}
      </select>
      <select
        name="teachers"
        multiple
        value={courseAssignForm.teachers}
        onChange={handleCourseAssignChange}
        className="w-full px-3 py-2 border rounded"
      >
        {users
          .filter((u) => u.role === "teacher")
          .map((u) => (
            <option key={u._id} value={u._id}>
              {u.name} ({u.email})
            </option>
          ))}
      </select>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Assign
      </button>
    </form>
    <h2 className="text-lg font-semibold mb-2">All Courses</h2>
    <ul>
      {courses.map((c) => (
        <li key={c._id} className="mb-2 border-b pb-2">
          <span className="font-bold">{c.title}</span> ({c.code}) -{" "}
          {c.department}
          <div>
            <span className="text-xs text-gray-600">Teachers: </span>
            {(c.teachers || []).map((t) => (
              <span
                key={t._id}
                className="inline-block bg-blue-100 px-2 py-1 rounded mr-1"
              >
                {t.name || t}
              </span>
            ))}
            <span className="text-xs text-gray-600 ml-2">Students: </span>
            {(c.students || []).map((s) => (
              <span
                key={s._id}
                className="inline-block bg-green-100 px-2 py-1 rounded mr-1"
              >
                {s.name || s}
              </span>
            ))}
          </div>
        </li>
      ))}
    </ul>
    {message && <div className="mb-4 text-green-600">{message}</div>}
  </div>
);

export default AdminCourses;
