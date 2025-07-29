import React from "react";
import { motion } from "framer-motion";
import { FaBookOpen, FaUserGraduate, FaSignInAlt, FaChartBar, FaComments } from "react-icons/fa";

// Feature Data (unchanged)
const studentFeatures = [
  {
    title: "View Courses, Events & Announcements",
    description: "Stay up-to-date with the latest academic activities, events, and campus news in real time.",
    icon: <FaBookOpen className="text-white text-2xl" />,
  },
  {
    title: "Apply for Admission",
    description: "Easily apply online with Formik-powered forms and secure MongoDB backend integration.",
    icon: <FaUserGraduate className="text-white text-2xl" />,
  },
  {
    title: "Login / Signup (JWT)",
    description: "Secure authentication using JWT for safe and seamless access to your academic profile.",
    icon: <FaSignInAlt className="text-white text-2xl" />,
  },
  {
    title: "Access Grades & Timetable",
    description: "Track your academic performance and view your daily class schedule anytime, anywhere.",
    icon: <FaChartBar className="text-white text-2xl" />,
  },
  {
    title: "Chat with Teachers",
    description: "Get academic support through direct messaging with lecturers and academic advisors.",
    icon: <FaComments className="text-white text-2xl" />,
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

const StudentDashboard = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-rose-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
            Everything Students <span className="text-rose-900">Need</span>
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            A complete digital experience designed for learning, growth, and connection.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {studentFeatures.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover={{ y: -10, boxShadow: "0 25px 30px -10px rgba(0, 0, 0, 0.12)" }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group"
            >
              {/* Icon Container */}
              <div className="p-5 bg-gradient-to-br from-rose-700 to-red-900 group-hover:from-rose-800 group-hover:to-red-950 transition-all duration-300 rounded-2xl mx-6 mt-6 w-fit">
                {feature.icon}
              </div>

              {/* Content */}
              <div className="p-6 pt-4">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-rose-900 transition-colors duration-200">
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

export default StudentDashboard;