import React from "react";
import { FaCheckCircle, FaPaw, FaDog, FaDollarSign } from "react-icons/fa";
import AboutImage1 from "../assets/about (1).jpeg"; 
import AboutImage2 from "../assets/about (2).jpeg"; 

const AboutSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20 mt-12">
      <div className="md:flex md:items-center md:gap-10 mb-20">
        <div className="relative md:w-1/2 mb-8 md:mb-0">
          <img
            src={AboutImage1}
            alt="Happy Pets"
            className="rounded-xl shadow-lg w-full h-auto transform transition duration-700 hover:scale-105" />
          <img
            src={AboutImage2}
            alt="Pet Smile"
            className="absolute top-4/6 left-27/28 w-40 h-40 rounded-lg shadow-xl border-4 border-white transform -translate-x-1/2 -translate-y-1/2 transition duration-700 hover:rotate-6" />
        </div>

        
        <div className="md:w-1/2">
          <p className="text-purple-600 uppercase tracking-wider mb-2 text-sm">About Us 🐾</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">We'll Make Your Pets Really Happy</h2>
          <p className="text-gray-700 mb-6">
            We work with you to develop individualised care plans, including management of chronic diseases. We are committed to being the region's premier healthcare network providing patient-focused pet care.
          </p>

          
          <div className="flex-row gap-4 mx-10 mb-6">
            <div className="bg-purple-100 text-purple-800 font-bold px-4 py-6 rounded-lg shadow-lg flex items-center justify-center text-xl mb-4">
              15 <span className="text-sm ml-1">yr Experience</span>
            </div>
            <ul className="flex-1 flex flex-col gap-2">
              <li className="flex items-center gap-2 text-gray-700">
                <FaCheckCircle className="text-purple-600" /> Over 10 years of experience
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <FaCheckCircle className="text-purple-600" /> 20 talented vets ready to help you
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <FaCheckCircle className="text-purple-600" /> High-quality products only
              </li>
            </ul>
          </div>

          <button className="bg-purple-600 text-white ml-10 px-6 py-3 rounded-lg hover:bg-purple-700 transition">
            Read More →
          </button>
        </div>
      </div>

      
      <div className="text-center mb-10">
        <p className="text-purple-600 uppercase tracking-wider text-sm mb-2">Why We Are The Best 🐾</p>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">See How PawMart Can Help</h3>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-purple-50 p-6 rounded-xl shadow-lg transform transition duration-700 hover:scale-105">
          <FaPaw className="text-purple-600 text-3xl mb-4 animate-[spin_1.5s_ease-in-out_infinite]" />
          <h4 className="text-xl font-semibold mb-2">Health Guarantee</h4>
          <p className="text-gray-700 text-sm">Duis aute irure dolor in reprehenderit voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        </div>

        <div className="bg-purple-50 p-6 rounded-xl shadow-lg transform transition duration-700 hover:scale-105">
          <FaDog className="text-purple-600 text-3xl mb-4 animate-[walkLeftRight_2s_ease-in-out_infinite]" />
          <h4 className="text-xl font-semibold mb-2">Ethical Breeding</h4>
          <p className="text-gray-700 text-sm">Duis aute irure dolor in reprehenderit voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        </div>

        <div className="bg-purple-50 p-6 rounded-xl shadow-lg transform transition duration-700 hover:scale-105">
          <FaDollarSign className="text-purple-600 text-3xl mb-4 animate-[tiltTop_2s_ease-in-out_infinite]" />
          <h4 className="text-xl font-semibold mb-2">Transparent Policy</h4>
          <p className="text-gray-700 text-sm">
            Duis aute irure dolor in reprehenderit voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;