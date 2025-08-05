const TeacherMaterials = ({
  courses,
  materials,
  uploadForm,
  setUploadForm,
  handleFileChange,
  handleUploadSubmit,
}) => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Upload Course Material</h2>
    <form
      onSubmit={handleUploadSubmit}
      className="mb-6 space-y-4"
      encType="multipart/form-data"
    >
      <select
        name="course"
        value={uploadForm.course}
        onChange={(e) =>
          setUploadForm({ ...uploadForm, course: e.target.value })
        }
        required
        className="w-full border px-4 py-2 rounded"
      >
        <option value="">Select Course</option>
        {courses.map((c) => (
          <option key={c._id} value={c._id}>
            {c.course?.title || c.title}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="title"
        placeholder="Material Title"
        value={uploadForm.title}
        onChange={(e) =>
          setUploadForm({ ...uploadForm, title: e.target.value })
        }
        required
        className="w-full border px-4 py-2 rounded"
      />
      <input
        type="file"
        name="file"
        accept="application/pdf"
        onChange={handleFileChange}
        required
        className="w-full border px-4 py-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Upload Material
      </button>
    </form>
    <h3 className="text-xl font-medium mb-2">My Uploaded Materials</h3>
    <ul className="space-y-3">
      {materials.map((m) => (
        <li key={m._id} className="border-b pb-2">
          <strong>{m.title}</strong>
          <br />
          <a
            href={m.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Download PDF
          </a>
          <br />
          <span className="text-xs text-gray-500">
            Course: {m.course?.title}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default TeacherMaterials;
