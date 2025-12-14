import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { IoShareSocialSharp } from "react-icons/io5";
import MyLink from "./MyLink";

const ContactSection = () => {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto mt-14">
      <div className="text-center mb-12">
        <p className="text-purple-600 uppercase tracking-widest text-sm mb-2 animate-pulse">Contact Us</p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">We're Here to Help 🐾</h2>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">Have questions or need support? Reach out to us anytime — we would love to hear from you!</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
          <form className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Message</label>
              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
            </div>

            <button className="w-full bg-purple-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-purple-700 transition">
              Send Message
            </button>
          </form>
        </div>

        
        <div className="space-y-6">
          <div className="flex items-center gap-4 bg-purple-50 p-5 rounded-xl shadow-md hover:scale-105 transition">
            <FaPhoneAlt className="text-purple-600 text-3xl animate-bounce" />
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-gray-700 text-sm">+880 123 456 789</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-purple-50 p-5 rounded-xl shadow-md hover:scale-105 transition">
            <FaEnvelope className="text-purple-600 text-3xl animate-wiggle" />
            <div>
              <h3 className="text-lg font-semibold">Email</h3>
              <p className="text-gray-700 text-sm">support@pawmart.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-purple-50 p-5 rounded-xl shadow-md hover:scale-105 transition">
            <FaMapMarkerAlt className="text-purple-600 text-3xl animate-pulse" />
            <div>
              <h3 className="text-lg font-semibold">Location</h3>
              <p className="text-gray-700 text-sm">Dhaka, Bangladesh</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-purple-50 p-5 rounded-xl shadow-md hover:scale-105 transition">
            <IoShareSocialSharp className="text-purple-600 text-3xl  animate-[tiltTop_2s_ease-in-out_infinite]" />
            <div>
              <h3 className="text-lg font-semibold">Social Media</h3>
              <p className="text-gray-700 text-xl flex gap-3 my-2">
                <MyLink to="https://facebook.com" className="hover:text-blue-600 transition">
              <FaFacebookF />
            </MyLink>

            <MyLink to="https://x.com" className="hover:text-black transition">
              <FaXTwitter />
            </MyLink>

            <MyLink to="https://instagram.com" className="hover:text-pink-500 transition">
              <FaInstagram />
            </MyLink>

            <MyLink to="https://linkedin.com" className="hover:text-blue-800 transition">
              <FaLinkedinIn />
            </MyLink>
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;