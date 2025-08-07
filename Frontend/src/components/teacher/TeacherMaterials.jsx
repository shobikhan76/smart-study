import React from "react";
import {
  FaFileAlt,
  FaBook,
  FaUpload,
  FaDownload,
  FaRegFilePdf,
  FaClock,
  FaInfoCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

const TeacherMaterials = ({
  courses = [],
  materials = [],
  uploadForm,
  setUploadForm,
  handleFileChange,
  handleUploadSubmit,
}) => {
  const [dragActive, setDragActive] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef(null);

  // Fix: Use 'course' as the field name for backend compatibility
  const handleCourseChange = (e) => {
    setUploadForm({ ...uploadForm, course: e.target.value });
  };

  // Fix: Always set uploadForm.file on file input change
  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadForm({ ...uploadForm, file: e.target.files[0] });
    }
  };

  // Fix: Drag-and-drop also sets uploadForm.file
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadForm({ ...uploadForm, file: e.dataTransfer.files[0] });
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e) => {
    setIsUploading(true);
    setUploadProgress(0);
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + 10;
      });
    }, 200);

    handleUploadSubmit(e);

    setTimeout(() => {
      setUploadProgress(100);
      setIsUploading(false);
    }, 2000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
            <FaFileAlt className="text-2xl text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Learning Materials
            </h1>
            <p className="text-gray-600">
              Upload and manage course materials for your students
            </p>
          </div>
        </div>
      </div>

      {/* Upload Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8"
      >
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FaUpload /> Upload New Material
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6"
          encType="multipart/form-data"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Course Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FaBook className="inline mr-2 text-purple-600" /> Select Course
              </label>
              <select
                name="course"
                value={uploadForm.course || ""}
                onChange={(e) =>
                  setUploadForm({ ...uploadForm, course: e.target.value })
                }
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white text-gray-700"
              >
                <option value="">Choose a course</option>
                {courses.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.course?.title || c.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Material Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter material title"
                value={uploadForm.title || ""}
                onChange={(e) =>
                  setUploadForm({ ...uploadForm, title: e.target.value })
                }
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200"
              />
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <FaRegFilePdf className="inline mr-2 text-red-600" /> PDF File
            </label>

            <div
              className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl transition-colors duration-200 cursor-pointer
                ${
                  dragActive
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-300 hover:border-gray-400"
                }
                ${isUploading ? "opacity-60 cursor-not-allowed" : ""}`}
              onDragEnter={(e) => {
                setDragActive(true);
                e.preventDefault();
              }}
              onDragLeave={(e) => {
                setDragActive(false);
                e.preventDefault();
              }}
              onDragOver={(e) => {
                setDragActive(true);
                e.preventDefault();
              }}
              onDrop={handleDrop}
              onClick={onButtonClick}
              tabIndex={0}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="application/pdf"
                onChange={handleChange}
                disabled={isUploading}
              />

              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FaRegFilePdf className="text-4xl text-gray-400 mb-3" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  PDF files only (MAX. 10MB)
                </p>
              </div>
            </div>

            {/* File name display */}
            {uploadForm.file && (
              <div className="mt-3 flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <FaRegFilePdf className="text-red-600" />
                  <span className="text-sm font-medium text-gray-700 truncate flex-1">
                    {uploadForm.file.name}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {Math.round(uploadForm.file.size / 1024)} KB
                </span>
              </div>
            )}

            {/* Upload Progress */}
            {isUploading && (
              <div className="mt-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={
                !uploadForm.course ||
                !uploadForm.title ||
                !uploadForm.file ||
                isUploading
              }
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg transform transition-all duration-200 hover:scale-105 flex items-center gap-2"
            >
              <FaUpload /> {isUploading ? "Uploading..." : "Upload Material"}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Materials List */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaFileAlt /> My Uploaded Materials
          </h3>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
            {materials.length}{" "}
            {materials.length === 1 ? "material" : "materials"}
          </span>
        </div>

        {materials.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100"
          >
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FaFileAlt className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No materials uploaded
            </h3>
            <p className="text-gray-500 mb-6">
              Upload your first learning material to get started
            </p>
            <div className="flex justify-center">
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">
                  💡 Tip: Use the upload form above
                </p>
              </div>
            </div>
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
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
                          <span>{m.course?.title || "Unknown Course"}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <FaClock className="text-gray-500" />
                          <span>Uploaded on {formatDate(m.createdAt)}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <FaInfoCircle className="text-gray-500" />
                          <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                            PDF
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <a
                        href={m.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 font-semibold shadow-lg transform transition-all duration-200 hover:scale-105"
                      >
                        <FaDownload /> Download PDF
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherMaterials;
