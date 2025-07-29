import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero"; // ✅ You missed this import
import Educators from "../components/Educators";
import JoinSection from "../components/JoinSection";
import Footer from "../components/Footer";
import Pillars from "../components/Pillars";
import HeroImage from "../assets/GIK.jpg"; // ✅ Make sure the path is correct and image exists

const Lecturers = () => {
  return (
    <>
      <Navbar />
      <Hero
        heading="Lecturers"
        subheading="Meet our esteemed faculty members who are dedicated to providing quality education and mentorship."
        slides={[
          {
            id: 1,
            title: "Meet Our Esteemed Faculty",
            description:
              "Dedicated to providing quality education and mentorship.",
            image: HeroImage,
          },
        ]}
      />
      <Educators />
      <JoinSection />
      <Pillars />
      <Footer />
    </>
  );
};

export default Lecturers;
