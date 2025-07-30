import React from "react";

const AdminApplications = ({
  applications,
  editingApplication,
  applicationForm,
  handleEditApplication,
  handleApplicationFormChange,
  handleApplicationUpdate,
  handleDeleteApplication,
  setEditingApplication,
  message,
}) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">All Applications</h2>
    {editingApplication && (
      <div className="mb-6 bg-blue-50 p-4 rounded">
        <h3 className="font-bold mb-2">Edit Application</h3>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-2"
          onSubmit={handleApplicationUpdate}
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={applicationForm.name}
            onChange={handleApplicationFormChange}
            className="px-3 py-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={applicationForm.email}
            required
          />
          <input
            type="text"
            name="fatherName"
            placeholder="Father Name"
            value={applicationForm.fatherName}
            onChange={handleApplicationFormChange}
            className="px-3 py-2 border rounded"
            required
          />
          <input
            type="date"
            name="dateOfBirth"
            placeholder="Date of Birth"
            value={applicationForm.dateOfBirth}
            onChange={handleApplicationFormChange}
            className="px-3 py-2 border rounded"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={applicationForm.city}
            onChange={handleApplicationFormChange}
            className="px-3 py-2 border rounded"
            required
          />
          <input
            type="text"
            name="previousSchool"
            placeholder="Previous School"
            value={applicationForm.previousSchool}
            onChange={handleApplicationFormChange}
            className="px-3 py-2 border rounded"
            required
          />
          <input
            type="text"
            name="board"
            placeholder="Board"
            value={applicationForm.board}
            onChange={handleApplicationFormChange}
            className="px-3 py-2 border rounded"
            required
          />
          <input
            type="number"
            name="marks"
            placeholder="Marks"
            value={applicationForm.marks}
            onChange={handleApplicationFormChange}
            className="px-3 py-2 border rounded"
            required
          />
          <input
            type="number"
            name="passingYear"
            placeholder="Passing Year"
            value={applicationForm.passingYear}
            onChange={handleApplicationFormChange}
            className="px-3 py-2 border rounded"
            required
          />
          <select
            name="status"
            value={applicationForm.status}
            onChange={handleApplicationFormChange}
            className="px-3 py-2 border rounded"
            required
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <input
            type="text"
            name="message"
            placeholder="Message"
            value={applicationForm.message}
            onChange={handleApplicationFormChange}
            className="px-3 py-2 border rounded"
          />
          <div className="col-span-2 flex gap-2 mt-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Update
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded border"
              onClick={() => {
                setEditingApplication(null);
                setApplicationForm({
                  name: "",
                  email: "",
                  department: "",
                  fatherName: "",
                  dateOfBirth: "",
                  city: "",
                  previousSchool: "",
                  board: "",
                  marks: "",
                  passingYear: "",
                  status: "pending",
                  message: "",
                });
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    )}
    <div className="overflow-x-auto">
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-blue-100">
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Father Name</th>
            <th>DOB</th>
            <th>City</th>
            <th>Prev School</th>
            <th>Board</th>
            <th>Marks</th>
            <th>Passing Year</th>
            <th>Status</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((a) => (
            <tr key={a._id} className="border-t">
              <td>{a.name}</td>
              <td>{a.email}</td>
              <td>{a.department}</td>
              <td>{a.fatherName}</td>
              <td>{a.dateOfBirth ? a.dateOfBirth.substring(0, 10) : ""}</td>
              <td>{a.city}</td>
              <td>{a.previousSchool}</td>
              <td>{a.board}</td>
              <td>{a.marks}</td>
              <td>{a.passingYear}</td>
              <td>{a.status}</td>
              <td>{a.message}</td>
              <td>
                <button
                  className="text-blue-600 hover:underline mr-2"
                  onClick={() => handleEditApplication(a)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDeleteApplication(a._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {applications.length === 0 && (
            <tr>
              <td colSpan={13} className="text-center text-gray-400 py-2">
                No applications found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    {message && <div className="mb-4 text-green-600">{message}</div>}
  </div>
);

export default AdminApplications;
