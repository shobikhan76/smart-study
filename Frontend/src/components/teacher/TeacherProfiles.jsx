import React from "react";

const TeacherProfiles = ({ teacher }) => {
  if (!teacher) return <div>Loading profile...</div>;
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Teacher Profile</h2>
      <div className="mb-2">
        <strong>Name:</strong> {teacher.user?.name}
      </div>
      <div className="mb-2">
        <strong>Email:</strong> {teacher.user?.email}
      </div>
      <div className="mb-2">
        <strong>Department:</strong> {teacher.department}
      </div>
      {/* Add more fields as needed */}
    </div>
  );
};

export default TeacherProfiles;
