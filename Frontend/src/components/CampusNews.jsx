import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

import mainImage from '../assets/uneza-bg.jpg';
import news1 from '../assets/GIK.jpg';
import news2 from '../assets/gik2.jpg';
import news3 from '../assets/giki3.jpg';

// Shared fadeUp animation
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

const undergraduate = [
  'Business & Management',
  'Computer Science',
  'Medicine and Health',
  'Civil Engineering',
  'Science & Environment',
  'Sociology & Anthropology',
  'Law Department',
  'Agricultural Technology',
  'Social and Political Science',
  'Pharmacy & Pharmacology',
  'International Relations'
];

const postgraduate = [
  'MPH in Master of Public Health',
  'MEng in Renewable Energy',
  'MSc in Artificial Intelligence',
  'MSc in Data Science',
  'PhD in Computer Science',
  'PhD in Biomedical Research',
  'PhD in Education & Leadership'
];

const CampusPage = () => {
  return (
    <div>

      {/* ======= Campus News Section ======= */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <motion.div
          className="flex justify-between items-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-4xl  font-serif font-semibold text-gray-900">
            Campus News<span className="text-red-600">.</span>
          </h2>
          <a href="#" className="text-red-700 font-medium hover:underline flex items-center gap-1">
            See All News <FaArrowRight />
          </a>
        </motion.div>

        {/* Main News */}
        <div className="grid md:grid-cols-2 gap-10 mb-10">
          <motion.div
            className="overflow-hidden rounded-md"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0.2}
          >
            <img src={mainImage} alt="Main News" className="w-full h-[400px] object-cover rounded-md" />
          </motion.div>

          <motion.div
            className="flex flex-col justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0.3}
          >
            <span className="text-sm font-semibold text-white bg-red-600 px-3 py-1 rounded-full w-max mb-4">
              Innovation
            </span>
            <h3 className="text-3xl font-bold text-gray-800 leading-snug mb-4">
              IEES University Research Team Unveils Breakthrough Renewable Energy
            </h3>
            <p className="text-gray-600 mb-4">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit...
            </p>
            <a href="#" className="text-red-700 font-medium flex items-center gap-1 hover:underline">
              Read More <FaArrowRight />
            </a>
          </motion.div>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {[news1, news2, news3].map((img, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.2 + index * 0.2}
            >
              <img src={img} alt={`News ${index + 1}`} className="w-full h-48 object-cover rounded-md mb-4" />
              <h4 className="text-xl font-semibold mb-2 text-gray-800">
                {[
                  "How Our Alumni Are Changing the World",
                  "How to Craft a Resume That Stands Out",
                  "How to Make the Most of Campus Life"
                ][index]}
              </h4>
              <p className="text-sm text-gray-600">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur...
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ======= Programs Section ======= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.h2
          className="text-4xl font-serif font-bold text-gray-900 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          Academics & Programs<span className="text-red-600">.</span>
        </motion.h2>

        {/* Undergraduate */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.1}
        >
          <div className="flex items-center gap-3 mb-6">
            <span role="img" aria-label="graduation-cap" className="text-2xl">🎓</span>
            <h3 className="text-2xl font-semibold text-gray-800">Undergraduate Programs</h3>
          </div>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-y-4 text-gray-700 text-[17px]">
            {undergraduate.map((program, i) => (
              <motion.div
                key={i}
                className="border-b border-gray-200 pb-2"
                custom={0.15 + i * 0.05}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                {program}
              </motion.div>
            ))}
          </div>
          <motion.div
            className="mt-4 text-right"
            custom={0.4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <a href="#" className="text-red-700 font-medium inline-flex items-center gap-1 hover:underline">
              See All Programs <FaArrowRight />
            </a>
          </motion.div>
        </motion.div>

        {/* Postgraduate */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.2}
        >
          <div className="flex items-center gap-3 mb-6">
            <span role="img" aria-label="books" className="text-2xl">📚</span>
            <h3 className="text-2xl font-semibold text-gray-800">Postgraduate & Professional Programs</h3>
          </div>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-y-4 text-gray-700 text-[17px]">
            {postgraduate.map((program, i) => (
              <motion.div
                key={i}
                className="border-b border-gray-200 pb-2"
                custom={0.25 + i * 0.05}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                {program}
              </motion.div>
            ))}
          </div>
          <motion.div
            className="mt-4 text-right"
            custom={0.5}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <a href="#" className="text-red-700 font-medium inline-flex items-center gap-1 hover:underline">
              See All Programs <FaArrowRight />
            </a>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
};

export default CampusPage;
