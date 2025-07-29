import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import heroImage from "../assets/uneza-bg.jpg";
import gik from "../assets/GIK.jpg";
import gik2 from "../assets/gik2.jpg";
import gik3 from "../assets/giki3.jpg";
import CampusNews from "../components/CampusNews";
import WhyUneza from "../components/WhyIees";
import WhyIees from "../components/WhyIees";
import Events from "../components/Events";
import Scholarships from "../components/Scholarships";
import CampusHero from "../components/CampusHero";
import Footer from "../components/Footer";
import StatsSection from "../components/StatsSection";
import Dashboard from "../components/Dashboard";
import TeacherDashboard from "../components/TeacherBoard";
import StudentDashboard from "../components/StudentDashboard";
const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero
        slides={[
          {
            id: 1,
            title: "Bridging Knowledge with Real‑World Impact.",
            description:
              "Unlock your potential with world-class education, innovative research, and a vibrant community.",
            image: heroImage,
          },
          {
            id: 2,
            title: "Empowering Future Innovators.",
            description:
              "Join a culture of innovation and leadership to shape tomorrow.",
            image: gik,
          },
          {
            id: 3,
            title: "Discover. Learn. Achieve.",
            description:
              "Where dreams meet opportunity through cutting-edge academics.",
            image: gik2,
          },
          {
            id: 4,
            title: "Discover. Learn. Achieve.",
            description:
              "Where dreams meet opportunity through cutting-edge academics.",
            image: gik3,
          },
        ]}
      />
      <CampusNews />
      <WhyIees />
      <Events />
      <Scholarships />
      <CampusHero />
      <Dashboard />
      <StatsSection />
      <StudentDashboard/>
      <TeacherDashboard/>
      <Footer />
    </div>
  );
};

export default Home;
