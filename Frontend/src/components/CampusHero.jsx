import React from "react";
import { motion } from "framer-motion";

const CampusHero = () => {
  const backgroundUrl = new URL("../assets/gik2.jpg", import.meta.url).href;

  return (
    <section
      className="relative w-full h-screen bg-center bg-cover flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-20 z-10"></div>

      <motion.div
        className="relative z-20 text-center px-4 md:px-8 max-w-4xl text-white"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          A World of Ideas, One Campus
          <br />
          Big Dreams Start on Uneza University
        </h1>

        <p className="text-lg md:text-xl mb-8">
          Discover a vibrant, inclusive, and inspiring place to learn, grow, and
          connect. At Uneza University, campus life goes beyond the
          classroom—it’s where futures are built, friendships are formed, and
          dreams take flight. Join us and be part of something extraordinary.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-600 hover:bg-red-700 transition text-white font-semibold py-3 px-6 rounded-lg shadow-lg"
        >
          Join Uneza Today →
        </motion.button>
      </motion.div>
    </section>
  );
};

export default CampusHero;
