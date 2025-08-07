import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegFilePdf, FaBook, FaDownload, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

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

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-green-500 to-blue-600 p-3 rounded-xl shadow-lg">
            <FaRegFilePdf className="text-2xl text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Course Materials</h1>
            <p className="text-gray-600">
              Download and view materials shared by your teachers
            </p>
          </div>
        </div>
      </div>
      {materials.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200"
        >
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FaRegFilePdf className="text-4xl text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Materials Available
          </h3>
          <p className="text-gray-500">
            Materials shared by your teachers will appear here.
          </p>
        </motion.div>
      ) : (
        <div className="grid gap-6">
          {materials.map((m) => (
            <motion.div
              key={m._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gradient-to-r from-red-500 to-orange-500 p-2 rounded-lg">
                      <FaRegFilePdf className="text-2xl text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800">
                      {m.title}
                    </h4>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <FaBook className="text-blue-500" />
                      <span>
                        {m._courseInfo?.title ||
                          m.course?.title ||
                          "Unknown Course"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaClock className="text-gray-500" />
                      <span>Uploaded on {formatDate(m.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <a
                    href={m.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-blue-700 font-semibold shadow-lg transform transition-all duration-200 hover:scale-105"
                  >
                    <FaDownload /> Download PDF
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentMaterials;
