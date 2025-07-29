import React from "react";
import { motion } from "framer-motion";
import image1 from "../assets/GIK.jpg"; // Replace with actual image paths
import image2 from "../assets/GIK.jpg";
import image3 from "../assets/GIK.jpg";

const scholarships = [
  {
    id: 1,
    title: "Uneza Excellence Scholarship",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis…",
    image: image1,
  },
  {
    id: 2,
    title: "President’s Scholar Award",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis…",
    image: image2,
  },
  {
    id: 3,
    title: "Rising Together Scholarship",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis…",
    image: image3,
  },
];

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const Scholarships = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-gray-800"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Scholarship <span className="text-red-500">Programs.</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {scholarships.map((item, index) => (
          <motion.div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6 text-left">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <a
                href="#"
                className="text-red-600 font-medium inline-flex items-center hover:underline transition"
              >
                Learn More <span className="ml-2">➔</span>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Scholarships;
