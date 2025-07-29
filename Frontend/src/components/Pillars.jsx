import React from "react";
import { motion } from "framer-motion";
import {
  FcFactory,
  FcMindMap,
  FcBiotech,
  FcBusinessman,
  FcGraduationCap,
  FcEngineering,
} from "react-icons/fc";

const faculties = [
  {
    title: "Faculty of Arts & Humanities",
    description:
      "Dedicated to critical thinking, languages, history, and cultural studies for societal understanding.",
    icon: FcMindMap,
  },
  {
    title: "Faculty of Science",
    description:
      "Advancing scientific knowledge through research in physics, biology, chemistry, and more.",
    icon: FcBiotech,
  },
  {
    title: "Faculty of Law",
    description:
      "Promoting justice, legal education, and civic awareness through rigorous legal training.",
    icon: FcBusinessman,
  },
  {
    title: "Faculty of Health Sciences",
    description:
      "Empowering future healthcare leaders in medicine, public health, and wellness innovation.",
    icon: FcGraduationCap,
  },
  {
    title: "Faculty of Architecture",
    description:
      "Inspiring creativity in architectural design, sustainability, and spatial innovation.",
    icon: FcFactory,
  },
  {
    title: "Faculty of Engineering",
    description:
      "Driving innovation in mechanical, civil, electrical, and software engineering disciplines.",
    icon: FcEngineering,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const Pillars = () => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-slate-800 mb-12">
        The <span className="text-[#981e32]">Pillars</span> of Our University
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {faculties.map((faculty, index) => {
          const Icon = faculty.icon;
          return (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-[#981e32]"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <div className="mb-4 text-[#981e32]">
                <Icon size={40} />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                {faculty.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {faculty.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Pillars;
