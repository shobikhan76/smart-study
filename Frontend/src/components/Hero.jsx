import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import heroImage from "../assets/uneza-bg.jpg";
import gik from "../assets/GIK.jpg";
import gik2 from "../assets/gik2.jpg";
import gik3 from "../assets/giki3.jpg";
import { FaPlayCircle } from "react-icons/fa";

const Hero = ({
  slides = [
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
      title: "Explore Limitless Possibilities.",
      description:
        "Shape the future with excellence in research and real-world applications.",
      image: gik3,
    },
  ],
}) => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      loop={true}
      className="h-screen"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div
            className="relative h-screen w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/70 z-10"></div>

            {/* Bottom-Left Content with Border Line */}
            <div className="absolute bottom-12 left-12 z-20 max-w-xl text-white">
              <div className="border-l-4 border-red-600 pl-6">
                <h1 className="text-3xl sm:text-5xl font-bold mb-3">
                  {slide.title}
                </h1>
                <p className="text-md sm:text-lg mb-4">{slide.description}</p>
               <button className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 hover:text-white transition-all duration-300">
  <FaPlayCircle className="text-xl text-white" />
  Watch Tour
</button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Hero;
