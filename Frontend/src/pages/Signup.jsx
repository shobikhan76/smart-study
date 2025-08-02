import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import heroimage2 from "../assets/GIK.jpg";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        password,
      });

      if (response.data.success) {
        navigate("/LMSLogin");
      }

      setMessage(response.data.message || "Registered successfully!");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{ backgroundImage: `url(${heroimage2})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-transparent"></div>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md p-8 rounded-2xl bg-white/20 backdrop-blur-xl shadow-2xl border border-white/30 text-white z-10"
      >
        <h2 className="text-3xl font-bold text-center mb-2 tracking-tight">
          Create an Account
        </h2>
        <p className="text-center text-white/80 text-sm mb-6">
          Join IESS Today
        </p>

        {message && (
          <div className="mb-5 text-center text-sm bg-red-600/90 text-white py-3 px-4 rounded-lg shadow-md">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white/30 transition-all duration-200"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white/30 transition-all duration-200"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white/30 transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <p className="text-sm text-white/90">
            Already have an account?{" "}
            <Link
              to="/LMSLogin"
              className="font-medium text-blue-200 hover:text-white underline transition"
            >
              Login
            </Link>
          </p>
          <p className="text-xs text-white/70">
            Or{" "}
            <Link
              to="/"
              className="text-blue-200 hover:text-white hover:underline transition"
            >
              return to Home
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
