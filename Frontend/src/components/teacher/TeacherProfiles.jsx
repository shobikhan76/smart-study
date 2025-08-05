import React from "react";

const TeacherProfiles = ({ teacher }) => {
  if (!teacher)
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-pulse text-gray-400 text-lg">Loading profile...</div>
      </div>
    );
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md p-8 max-w-md mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold">
          {teacher.user?.name?.charAt(0) || "T"}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-blue-800 mb-1">
            {teacher.user?.name}
          </h2>
          <span className="text-sm text-blue-600 font-medium">
            {teacher.designation || "Teacher"}
          </span>
        </div>
      </div>
      <div className="space-y-3 text-gray-700">
        <div>
          <span className="font-semibold text-blue-700">Email:</span>{" "}
          <span>{teacher.user?.email}</span>
        </div>
        <div>
          <span className="font-semibold text-blue-700">Department:</span>{" "}
          <span>{teacher.department}</span>
        </div>
        <div>
          <span className="font-semibold text-blue-700">Contact:</span>{" "}
          <span>{teacher.contact}</span>
        </div>
        {/* Add more fields as needed */}
      </div>
    </div>
  );
};

export default TeacherProfiles;
