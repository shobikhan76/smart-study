import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CampusNews from '../components/CampusNews'
import Hero from "../components/Hero";
import heroImage from "../assets/uneza-bg.jpg";
import gik from "../assets/GIK.jpg";
import gik2 from "../assets/gik2.jpg";
import gik3 from "../assets/giki3.jpg";
const News = () => {
  return (
        <>
            <Navbar/>
             <Hero
        slides={[
          {
            id: 1,
            title: "The Latest News from Our Campus",
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

            <CampusNews/>
            <Footer/>
        
        </>
 
)
}

export default News