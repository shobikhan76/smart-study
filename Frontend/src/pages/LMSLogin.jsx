import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LMSLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/api/users/login", {
      email,
      password,
    });

    const role = res.data.user?.role;

    // Save token if needed for authenticated requests
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }

    if (role === "admin") navigate("/admin-dashboard");
    else if (role === "teacher") navigate("/teacher-dashboard");
    else if (role === "student") navigate("/student-dashboard");
    else if (role === "applicant") navigate("/applicant-dashboard");
    else alert("Role not recognized");
  } catch (err) {
    console.error(err);
    alert("Login failed. Check credentials.");
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">LMS Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LMSLogin;
