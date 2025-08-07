import React, { useState } from "react";
import axios from "axios";
import {Link, useNavigate } from "react-router-dom";
import heroimage2 from "../assets/GIK.jpg";

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

      // Save token
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
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${heroimage2})` }}
    >
      <div className="absolute inset-0  flex items-center justify-center">
        <div className="w-full max-w-md bg-[#01112b] p-8 rounded-xl shadow-xl border border-white/20">
          <h2 className="text-3xl font-bold text-center text-white mb-6">LMS Login</h2>

          <form onSubmit={handleLogin} className="space-y-5 text-white">
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/30 placeholder-white/70 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/30 placeholder-white/70 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-md font-semibold"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-white/90">
            Forgot Password?{" "}
            <span className="underline cursor-pointer hover:text-blue-200">
              Reset
            </span>
          </p>
           <p className="text-sm text-white/90 text-center mt-4">
        <span>Not Registered </span>
            <Link
              to="/Apply"
              className="font-medium text-blue-200 hover:text-white underline transition"
            >
              Signup
            </Link>
          </p>
         
        </div>
      </div>
    </div>
  );
};

export default LMSLogin;