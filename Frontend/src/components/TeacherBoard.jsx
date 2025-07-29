import React from "react";
import { motion } from "framer-motion";
import { FaLock, FaChalkboardTeacher, FaFileUpload, FaBullhorn } from "react-icons/fa";

// Feature Data
const features = [
  {
    title: "Secure Login Dashboard",
    description: "Access your personalized, secure teacher portal with role-based authentication.",
    icon: <FaLock className="text-white text-2xl" />,
  },
  {
    title: "Manage Attendance & Grades",
    description: "Easily track and update student attendance and academic performance in real time.",
    icon: <FaChalkboardTeacher className="text-white text-2xl" />,
  },
  {
    title: "Upload Assignments",
    description: "Seamlessly upload tasks with Multer and Cloudinary integration for rich media support.",
    icon: <FaFileUpload className="text-white text-2xl" />,
  },
  {
    title: "Post Announcements",
    description: "Keep students informed by posting real-time announcements and updates.",
    icon: <FaBullhorn className="text-white text-2xl" />,
  },
];

// Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const TeacherDashboard = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
            Empowering <span className="text-red-600">Teachers</span> with Tools
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Designed for efficiency, security, and ease of use — your digital classroom companion.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group"
            >
              {/* Icon Container */}
              <div className="p-5 bg-gradient-to-br from-red-500 to-red-700 group-hover:from-red-600 group-hover:to-red-800 transition-colors duration-300 rounded-2xl mx-6 mt-6 w-fit">
                {feature.icon}
              </div>

              {/* Content */}
              <div className="p-6 pt-4">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeacherDashboard;