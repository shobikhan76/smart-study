import React from "react";

const AdminStudents = ({
  students,
  studentForm,
  handleStudentFormChange,
  handleStudentSubmit,
  handleEditStudent,
  handleDeleteStudent,
  editingStudent,
  setEditingStudent,
  message,
}) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">
      {editingStudent ? "Edit Student" : "Create Student"}
    </h2>
    <form className="mb-6 space-y-2" onSubmit={handleStudentSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={studentForm.name}
        onChange={handleStudentFormChange}
        className="w-full px-3 py-2 border rounded"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={studentForm.email}
        onChange={handleStudentFormChange}
        className="w-full px-3 py-2 border rounded"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={studentForm.password}
        onChange={handleStudentFormChange}
        className="w-full px-3 py-2 border rounded"
        required
      />
      <input
        type="text"
        name="registrationNumber"
        placeholder="Registration Number"
        value={studentForm.registrationNumber}
        onChange={handleStudentFormChange}
        className="w-full px-3 py-2 border rounded"
        required
      />
      <input
        type="text"
        name="department"
        placeholder="Department"
        value={studentForm.department}
        onChange={handleStudentFormChange}
        className="w-full px-3 py-2 border rounded"
        required
      />
      <input
        type="text"
        name="semester"
        placeholder="Semester"
        value={studentForm.semester}
        onChange={handleStudentFormChange}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="text"
        name="contact"
        placeholder="Contact"
        value={studentForm.contact}
        onChange={handleStudentFormChange}
        className="w-full px-3 py-2 border rounded"
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={studentForm.address}
        onChange={handleStudentFormChange}
        className="w-full px-3 py-2 border rounded"
        required
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        {editingStudent ? "Update Student" : "Create Student"}
      </button>
      {editingStudent && (
        <button
          type="button"
          className="ml-2 px-4 py-2 rounded border"
          onClick={() => {
            setEditingStudent(null);
            setStudentForm({
              name: "",
              email: "",
              password: "",
              registrationNumber: "",
              department: "",
              semester: "",
              contact: "",
              address: "",
              courses: [],
            });
          }}
        >
          Cancel
        </button>
      )}
    </form>
    <h2 className="text-lg font-semibold mb-2">All Students</h2>
    <table className="w-full border">
      <thead>
        <tr className="bg-blue-100">
          <th>Name</th>
          <th>Email</th>
          <th>Registration #</th>
          <th>Department</th>
          <th>Semester</th>
          <th>Contact</th>
          <th>Address</th>
          <th>Courses</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <tr key={s._id} className="border-t">
            <td>{s.user?.name || s.name || ""}</td>
            <td>{s.user?.email || s.email || ""}</td>
            <td>{s.registrationNumber || ""}</td>
            <td>{s.department || ""}</td>
            <td>{s.semester || ""}</td>
            <td>{s.contact || ""}</td>
            <td>{s.address || ""}</td>
            <td>
              {(s.courses || []).map((c) => (
                <span
                  key={c._id || c}
                  className="inline-block bg-gray-200 px-2 py-1 rounded mr-1"
                >
                  {c.title || c}
                </span>
              ))}
            </td>
            <td>
              <button
                className="text-blue-600 hover:underline mr-2"
                onClick={() => handleEditStudent(s)}
              >
                Edit
              </button>
              <button
                className="text-red-600 hover:underline"
                onClick={() => handleDeleteStudent(s._id)}
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

export default AdminStudents;
