import React from "react";

const AdminUsers = ({
  users,
  userForm,
  handleUserFormChange,
  handleUserSubmit,
  handleEditUser,
  handleDeleteUser,
  editingUser,
  setEditingUser,
  message,
}) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">
      {editingUser ? "Edit User" : "Create User"}
    </h2>
    <form className="mb-6 space-y-2" onSubmit={handleUserSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={userForm.name}
        onChange={handleUserFormChange}
        className="w-full px-3 py-2 border rounded"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={userForm.email}
        onChange={handleUserFormChange}
        className="w-full px-3 py-2 border rounded"
        required
        disabled={!!editingUser}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={userForm.password}
        onChange={handleUserFormChange}
        className="w-full px-3 py-2 border rounded"
        required={!editingUser}
      />
      <select
        name="role"
        value={userForm.role}
        onChange={handleUserFormChange}
        className="w-full px-3 py-2 border rounded"
        required
      >
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        {editingUser ? "Update" : "Create"}
      </button>
      {editingUser && (
        <button
          type="button"
          className="ml-2 px-4 py-2 rounded border"
          onClick={() => {
            setEditingUser(null);
            setUserForm({ name: "", email: "", password: "", role: "student" });
          }}
        >
          Cancel
        </button>
      )}
    </form>
    <h2 className="text-lg font-semibold mb-2">All Users</h2>
    <table className="w-full border">
      <thead>
        <tr className="bg-blue-100">
          <th className="p-2">Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Courses</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u._id} className="border-t">
            <td className="p-2">{u.name}</td>
            <td>{u.email}</td>
            <td>{u.role}</td>
            <td>
              {(u.courses || []).map((c) => (
                <span
                  key={c._id}
                  className="inline-block bg-gray-200 px-2 py-1 rounded mr-1"
                >
                  {c.title || c.code}
                </span>
              ))}
            </td>
            <td>
              <button
                className="text-blue-600 hover:underline mr-2"
                onClick={() => handleEditUser(u)}
              >
                Edit
              </button>
              <button
                className="text-red-600 hover:underline"
                onClick={() => handleDeleteUser(u._id)}
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

export default AdminUsers;
