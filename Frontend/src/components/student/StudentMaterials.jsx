import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentMaterials = ({ token, courses }) => {
  const [materials, setMaterials] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    if (selectedCourse) {
      fetchMaterials(selectedCourse);
    }
  }, [selectedCourse, token]);

  const fetchMaterials = async (courseId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/materials/course/${courseId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMaterials(res.data);
    } catch {
      setMaterials([]);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Course Materials</h2>
      <select
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}
        className="border px-4 py-2 rounded mb-4"
      >
        <option value="">Select Course</option>
        {courses.map((c) => (
          <option key={c._id} value={c._id}>
            {c.course?.title || c.title}
          </option>
        ))}
      </select>
      {materials.length === 0 ? (
        <p className="text-gray-500">No materials available.</p>
      ) : (
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
                Uploaded by: {m.teacher?.user?.name || "Teacher"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentMaterials;
