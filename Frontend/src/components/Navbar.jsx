import React from 'react';
import { Link } from 'react-router-dom';
import LOGO from "../assets/LOGO.png";

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-black/80 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        
        {/* Left Side: Logo and Title */}
        <div className="flex items-center space-x-3">
          <img src={LOGO} alt="logo" className="w-14 h-14 object-contain" />
          <div className="leading-tight">
            <div className="text-xl font-bold">IESS</div>
            <div className="text-sm">College</div>
          </div>
        </div>

        {/* Right Side: Navigation Links */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-yellow-400">Home</Link>
          <Link to="/About" className="hover:text-yellow-400">About Us</Link>
          <Link to="/News" className="hover:text-yellow-400">News</Link>
          <Link to="/Lecturers" className="hover:text-yellow-400">Lecturers</Link>
          {/* <Link to="/login" className="hover:text-yellow-400">Login</Link> */}
          <Link to="/Apply" className="hover:text-yellow-400">Apply</Link>
           <Link to="/LMS" className="hover:text-yellow-400">LMS</Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
