import React from "react";
import { motion } from "framer-motion";
import gik2 from "../assets/gik2.jpg"; // Local image import

// Mock Event Data
const events = [
  {
    id: 1,
    title: "Research & Innovation Expo",
    location: "IEES   Convention Hall",
    time: "09:45 AM – End",
    price: "$15.00",
    imageUrl: gik2,
  },
  {
    id: 2,
    title: "Research & Innovation Expo",
    location: "IEES   Convention Hall",
    time: "09:45 AM – End",
    price: "$15.00",
    imageUrl: gik2,
  },
  {
    id: 3,
    title: "Alumni Talk Series",
    location: "IEES   Convention Hall",
    time: "11:45 AM – End",
    price: "$25.00",
    imageUrl: gik2,
  },
  {
    id: 4,
    title: "Internship & Job Placement",
    location: "IEES   Convention Hall",
    time: "10:45 AM – End",
    price: "$10.00",
    imageUrl: gik2,
  },
  {
    id: 5,
    title: "Research & Innovation Expo",
    location: "IEES   Convention Hall",
    time: "09:45 AM – End",
    price: "$15.00",
    imageUrl: gik2,
  },
  {
    id: 6,
    title: "Student Talent Showcase",
    location: "IEES   Convention Hall",
    time: "02:00 PM – End",
    price: "$12.00",
    imageUrl: gik2,
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.3, type: "spring", stiffness: 200 },
  },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Events = () => {
  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div
        className="flex justify-between items-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-gray-800">Upcoming Events.</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          See All Events
        </motion.button>
      </motion.div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <motion.div
            key={event.id}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            {/* Event Image */}
            <div className="relative w-full h-[200px]">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-200">
                <button className="bg-white text-red-500 px-4 py-2 rounded-lg">
                  Read Details
                </button>
              </div>
            </div>

            {/* Event Details */}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
              <p className="text-gray-600 mb-2">
                {event.location} • {event.time} • {event.price}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Events;
