import React from "react";

const StudentProfiles = ({ student }) => {
  if (!student) return <div>Loading profile...</div>;
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Student Profile</h2>
      <div className="mb-2">
        <strong>Name:</strong> {student.user?.name}
      </div>
      <div className="mb-2">
        <strong>Email:</strong> {student.user?.email}
      </div>
      <div className="mb-2">
        <strong>Registration Number:</strong> {student.registrationNumber}
      </div>
      <div className="mb-2">
        <strong>Department:</strong> {student.department}
      </div>
      <div className="mb-2">
        <strong>Semester:</strong> {student.semester}
      </div>
      <div className="mb-2">
        <strong>Contact:</strong> {student.contact}
      </div>
      <div className="mb-2">
        <strong>Address:</strong> {student.address}
      </div>
      {/* Add more fields as needed */}
    </div>
  );
};

export default StudentProfiles;
