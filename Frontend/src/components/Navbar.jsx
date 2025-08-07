import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LOGO from "../assets/LOGO.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-gradient-to-r from-[#01112b] to-[#022355] text-white shadow-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Flex Container */}
        <div className="flex items-center justify-between">

          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 group">
            <img
              src={LOGO}
              alt="IESS College Logo"
              className="w-14 h-14 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-300 bg-clip-text text-transparent">
                IESS
              </div>
              <div className="text-xs tracking-wide opacity-90">College of Excellence</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {["Home", "About", "News", "Lecturers", "Apply", "LMS"].map((item) => {
              const path = item === "Home" ? "/" : `/${item}`;
              const isActive = location.pathname === path;
              return (
                <Link
                  key={item}
                  to={path}
                  className={`group relative px-4 py-2 font-medium transition-all duration-300 capitalize
                    ${isActive 
                      ? "text-yellow-300" 
                      : "text-white hover:text-yellow-400 hover:scale-105"
                    }
                  `}
                >
                  {item}
                  {/* Underline Animation */}
                  <span 
                    className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-300 group-hover:w-full ${
                      isActive ? "w-full" : ""
                    }`} 
                  />
                </Link>
              );
            })}

            {/* Login Button */}
            <Link
              to="/LMS"
              className="ml-6 group relative border-amber-50 border-2 px-5 py-2 bg-gradient-to-r from-[#01112b] to-[#345e9d] hover:bg-gradient-to-r from-[#01112b] to-[#1e447d] text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 "
            >
              Login
              {/* Glow on hover */}
              <span className="absolute inset-0 rounded-2xl bg-blue-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-black/90 backdrop-blur-sm rounded-xl p-4 animate-fadeIn">
            <div className="flex flex-col space-y-3">
              {["Home", "About", "News", "Lecturers", "Apply", "LMS"].map((item) => {
                const path = item === "Home" ? "/" : `/${item}`;
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={item}
                    to={path}
                    onClick={toggleMenu}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 capitalize
                      ${isActive 
                        ? "bg-gradient-to-r from-red-500/30 to-orange-500/30 text-red-300 border border-yellow-500/40" 
                        : "text-gray-200 hover:bg-white/10 hover:text-red-300"
                      }
                    `}
                  >
                    {item}
                  </Link>
                );
              })}

              {/* Mobile Login Button */}
              <Link
                to="/LMS"
                onClick={toggleMenu}
                className="mt-2 text-center px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow hover:shadow-lg transition-all duration-300"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

{/* Add to your index.css or global CSS */}
<style jsx>{`
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
`}</style>