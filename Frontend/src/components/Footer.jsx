import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-gradient-to-b from-[#a82034] to-[#8c1a2b] text-white px-6 md:px-12 py-16"
    >
      {/* Top Section */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 mb-12">
        {/* Logo & Contact */}
        <div className="space-y-5">
          <img src="/logo.png" alt="IEES College Logo" className="w-28" />
          <h2 className="text-2xl font-bold">IEES College</h2>
          <p className="text-sm text-white/90 leading-relaxed">
            Empowering minds, shaping the future through excellence in education and innovation.
          </p>
          <div className="mt-4 space-y-2 text-sm text-white/85">
            <p className="flex items-center gap-2">
              <span>📍</span> Jl. P.B Sudirman, Denpasar, Bali
            </p>
            <p className="flex items-center gap-2">
              <span>✉</span> support@uneza.com
            </p>
          </div>
        </div>

        {/* Social Media */}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold">Stay Connected</h3>
          <p className="text-sm text-white/85 mb-4">Follow us on social media</p>
          <div className="flex gap-4">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                aria-label={Icon.name}
                className="w-11 h-11 rounded-full border-2 border-white flex items-center justify-center text-lg hover:bg-white hover:text-[#a82034] transition-all duration-300"
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-2 space-y-5">
          <h3 className="text-lg font-semibold">Subscribe to Our Newsletter</h3>
          <p className="text-sm text-white/85 max-w-md">
            Stay updated with the latest news, events, and announcements from UnIEES College </p>
          <form className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent outline-none flex-1 placeholder-white/70 text-white"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="bg-white text-[#a82034] px-5 py-2 rounded-md font-semibold text-sm ml-2 hover:bg-gray-100 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <hr className="border-white/30 mb-10" />

      {/* Bottom Links Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-8 text-sm">
        {[
          {
            title: "About",
            links: [
              "Academics",
              "Campus Administrations",
              "Campus Safety",
              "Office of the Chancellor",
              "Facility Services",
              "Human Resources",
            ],
          },
          {
            title: "Education",
            links: [
              "Academic Departments",
              "Undergraduate Programs",
              "Graduate Programs",
              "Institutes & Centers",
              "Academic Policy",
              "Academic Calendar",
              "Publications",
            ],
          },
          {
            title: "Admission",
            links: [
              "Undergraduate Admission",
              "Graduate Admission",
              "International Affairs",
              "Special Students",
              "Financial Aid",
              "Prospective Students",
              "Student Life",
            ],
          },
          {
            title: "Research",
            links: [
              "Research Overview",
              "eLink Research",
              "Development Center",
              "Research Center",
              "Laboratory Center",
              "Information Technology",
              "Library",
            ],
          },
          {
            title: "Campus Life",
            links: [
              "Campus Locations",
              "Class Timetables",
              "Faculties & Schools",
              "Staff & Members",
              "Campus Events",
            ],
          },
        ].map((column, i) => (
          <div key={i}>
            <h4 className="font-bold mb-3 tracking-wide">{column.title}</h4>
            <ul className="space-y-2">
              {column.links.map((link, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="text-white/85 hover:text-white hover:underline transition duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/20 text-center text-sm text-white/70">
        &copy; {new Date().getFullYear()} IEES College. All rights reserved. | Designed with ❤️ for excellence.
      </div>
    </motion.footer>
  );
};

export default Footer;
