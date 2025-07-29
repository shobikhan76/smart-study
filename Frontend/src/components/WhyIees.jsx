import React from 'react';
import { motion } from 'framer-motion';
import { FaBookOpen, FaBriefcase, FaUsers, FaUserGraduate, FaSearchPlus, FaArrowRight } from 'react-icons/fa';

import universityImage from '../assets/GIK.jpg'; // Replace with your actual image

const features = [
  {
    icon: <FaBookOpen />,
    title: 'Quality Education & Skill Development',
    filled: true
  },
  {
    icon: <FaBriefcase />,
    title: 'Career Opportunities & Higher Earning Potential'
  },
  {
    icon: <FaUsers />,
    title: 'Networking & Connections'
  },
  {
    icon: <FaUserGraduate />,
    title: 'Personal Growth & Independence'
  },
  {
    icon: <FaSearchPlus />,
    title: 'Access to Research & Innovation'
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom,
      duration: 0.6,
      ease: 'easeOut'
    }
  })
};

const WhyIees = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
      {/* Image */}

      
      <motion.div
        className="overflow-hidden rounded-lg shadow-md"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <img
          src={universityImage}
          alt="IEES  University"
          className="w-full h-full object-cover rounded-lg"
        />
      </motion.div>

      {/* Text and Features */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={0.2}
        className="space-y-6"
      >
        <h1 className='text-4xl text-red-700'><b>Why IEES ?</b></h1>
        <p className="text-gray-600 leading-relaxed">

          At IEES , education isn’t just about learning — it’s about transforming lives.
        </p>

        <div className="space-y-4">
          {features.map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-4 border-b pb-3"
              variants={fadeUp}
              custom={0.3 + i * 0.1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div
                className={`text-xl p-2 rounded-full ${
                  item.filled ? 'bg-red-700 text-white' : 'bg-white border text-red-700'
                }`}
              >
                {item.icon}
              </div>
              <h4 className="text-[17px] font-medium text-gray-800">{item.title}</h4>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="pt-4"
          variants={fadeUp}
          custom={0.9}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <a
            href="#"
            className="bg-red-700 text-white px-6 py-3 rounded-md inline-flex items-center gap-2 hover:bg-red-800 transition"
          >
            Learn More <FaArrowRight />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WhyIees;
