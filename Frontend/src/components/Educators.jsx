import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaTimes } from "react-icons/fa";
// import  from "../assets/kkkkk.png"; // ✅ Ensure this path is correct
import KK from "../assets/kkkkk.jpg"; // ✅ Ensure this path is correct

const educators = [
  {
    name: "Prof. Dr. Henry Kimani",
    title: "Department of Mathematics",
    image: KK,
    showOverlay: true,
  },
  {
    name: "Prof. Linda Mwansa",
    title: "Faculty of Psychology",
    image: KK,
    showOverlay: true,
  },
  {
    name: "Dr. Anita Mensah",
    title: "Faculty of Law",
    image: KK,
    showOverlay: true,
  },
  {
    name: "Dr. Samuel Tadesse",
    title: "Department of Chemistry",
    image: KK,
    showOverlay: true,
  },
  {
    name: "Prof. Linda Mwansa",
    title: "Faculty of Psychology",
    image: KK,
    showOverlay: true,
  },
  {
    name: "Dr. Anita Mensah",
    title: "Faculty of Law",
    image: KK,
    showOverlay: true,
  },
  {
    name: "Dr. Samuel Tadesse",
    title: "Department of Chemistry",
    image: KK,
    showOverlay: true,
  },
  {
    name: "Dr. Samuel Tadesse",
    title: "Department of Chemistry",
    image: KK,
    showOverlay: true,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Educators = () => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
     <motion.h2
  className="text-4xl md:text-5xl font-bold text-center text-slate-800 mb-12 leading-tight"
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  Our Educators Behind the <span className="text-red-600">Success.</span>
</motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {educators.map((educator, index) => (
          <motion.div
            key={index}
            className="relative group"
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <img
              src={educator.image}
              alt={educator.name}
              className="w-full h-72 object-cover rounded-lg shadow-md"
            />

            {educator.showOverlay && (
              <div className="absolute inset-0 bg-red-600 bg-opacity-100 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-80 transition-opacity duration-300 rounded-lg">
                <FaFacebookF className="text-white text-xl cursor-pointer hover:scale-110 transition-transform" />
                <FaTimes className="text-white text-xl cursor-pointer hover:scale-110 transition-transform" />
                <FaInstagram className="text-white text-xl cursor-pointer hover:scale-110 transition-transform" />
              </div>
            )}

            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold text-slate-800">{educator.name}</h3>
              <p className="text-sm text-gray-500">{educator.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Educators;
