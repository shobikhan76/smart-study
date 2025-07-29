import React from "react";
import GroupImage from "../assets/GIK.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

// Custom Tick Icon
const tickIcon = (
  <svg
    className="w-5 h-5 text-green-600 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

// List Data
const listLeft = [
  "PKM Awards",
  "Scientific Papers",
  "Debate Awards",
  "Network Security Awards",
  "Sports & Fitness",
];

const listRight = [
  "Best University 2024",
  "Best Facilities Campus",
  "Cleanest Campus",
  "Best Staff & Lecturers",
  "Student Life",
];

const JoinSection = () => {
  return (
    <section className="w-full px-6 py-20 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-16">
        
        {/* Left Content */}
        <motion.div
          className="md:w-1/2 space-y-8"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-5 leading-tight tracking-tight">
              Let’s Join and{" "}
              <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                Prove It.
              </span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              Be part of something bigger. Join IEES     University and show the world what you’re capable of. 
              Your journey starts here—let’s make it count!
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 gap-5 text-gray-800">
            <ul className="space-y-3">
              {listLeft.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-2 text-sm md:text-base font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  {tickIcon}
                  {item}
                </motion.li>
              ))}
            </ul>
            <ul className="space-y-3">
              {listRight.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-2 text-sm md:text-base font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  {tickIcon}
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          <hr className="my-6 border-gray-200" />

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row gap-6 text-gray-800">
            {/* Phone */}
            <div className="flex items-center gap-4 group transition-transform duration-200 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 text-white rounded-full flex items-center justify-center text-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Contact Us</p>
                <p className="font-bold text-gray-800">+(62) 80-567-899</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 group transition-transform duration-200 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 text-white rounded-full flex items-center justify-center text-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email Us</p>
                <p className="font-bold text-gray-800">support@uneza.com</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="md:w-1/2 w-full flex justify-center md:justify-end"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="relative group">
            <motion.img
              src={GroupImage}
              alt="Students Group at IEES     University"
              className="rounded-3xl shadow-2xl w-full h-auto object-cover max-h-[500px] transition-transform duration-500"
              whileHover={{ scale: 1.05 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinSection;