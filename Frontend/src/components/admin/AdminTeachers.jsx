import React from "react";

const AdminTeachers = ({
  teachers,
  teacherForm,
  handleTeacherFormChange,
  handleTeacherSubmit,
  handleEditTeacher,
  handleDeleteTeacher,
  editingTeacher,
  setEditingTeacher,
  message,
}) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">
      {editingTeacher ? "Edit Teacher" : "Create Teacher"}
    </h2>
    <form className="mb-6 space-y-2" onSubmit={handleTeacherSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={teacherForm.name}
        onChange={handleTeacherFormChange}
        className="w-full px-3 py-2 border rounded"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={teacherForm.email}
        onChange={handleTeacherFormChange}
        className="w-full px-3 py-2 border rounded"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={teacherForm.password}
        onChange={handleTeacherFormChange}
        className="w-full px-3 py-2 border rounded"
        required
      />
      <input
        type="text"
        name="designation"
        placeholder="Designation"
        value={teacherForm.designation}
        onChange={handleTeacherFormChange}
        className="w-full px-3 py-2 border rounded"
        required
      />
      <input
        type="text"
        name="department"
        placeholder="Department"
        value={teacherForm.department}
        onChange={handleTeacherFormChange}
        className="w-full px-3 py-2 border rounded"
        required
      />
      <input
        type="text"
        name="contact"
        placeholder="Contact"
        value={teacherForm.contact}
        onChange={handleTeacherFormChange}
        className="w-full px-3 py-2 border rounded"
        required
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        {editingTeacher ? "Update Teacher" : "Create Teacher"}
      </button>
      {editingTeacher && (
        <button
          type="button"
          className="ml-2 px-4 py-2 rounded border"
          onClick={() => {
            setEditingTeacher(null);
            setTeacherForm({
              user: "",
              designation: "",
              department: "",
              contact: "",
            });
          }}
        >
          Cancel
        </button>
      )}
    </form>
    <h2 className="text-lg font-semibold mb-2">All Teachers</h2>
    <table className="w-full border">
      <thead>
        <tr className="bg-blue-100">
          <th>User</th>
          <th>Designation</th>
          <th>Department</th>
          <th>Contact</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {teachers.map((t) => (
          <tr key={t._id} className="border-t">
            <td>{t.user?.name || t.user || ""}</td>
            <td>{t.designation}</td>
            <td>{t.department}</td>
            <td>{t.contact}</td>
            <td>
              <button
                className="text-blue-600 hover:underline mr-2"
                onClick={() => handleEditTeacher(t)}
              >
                Edit
              </button>
              <button
                className="text-red-600 hover:underline"
                onClick={() => handleDeleteTeacher(t._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {message && <div className="mb-4 text-green-600">{message}</div>}
  </div>
);

export default AdminTeachers;
