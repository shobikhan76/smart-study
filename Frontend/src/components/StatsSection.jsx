import React from "react";
import { motion } from "framer-motion";

// Animation variants for each stat card
const statVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      type: "spring",
      stiffness: 100,
    },
  }),
};

const stats = [
  {
    number: "10K+",
    label: "Students",
  },
  {
    number: "500+",
    label: "Workshops",
  },
  {
    number: "250+",
    label: "Events",
  },
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={statVariants}
              className="bg-white shadow-md p-8 rounded-lg"
            >
              <h2 className="text-4xl font-extrabold text-red-500">{stat.number}</h2>
              <p className="text-gray-700 mt-2 text-lg font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
