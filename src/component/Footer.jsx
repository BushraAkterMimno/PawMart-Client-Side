import React from "react";
import FooterImg from "../assets/logo.png";
import MyLink from "./MyLink";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <img src={FooterImg} alt="Footer Logo" className="w-28 mb-4" />
          <p className="text-gray-400 leading-relaxed">
            PawMart — Your trusted partner for pet adoption, accessories, and professional vet care.
          </p>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-4 relative after:absolute after:w-10 after:h-0.5 after:bg-purple-500 after:-bottom-1 after:left-0">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li><MyLink to="/" className="hover:text-white duration-150">Home</MyLink></li>
            <li><MyLink to="/pet-adopt" className="hover:text-white duration-150">Pet Adopt</MyLink></li>
            <li><MyLink to="/pet-accessories" className="hover:text-white duration-150">Pet Accessories</MyLink></li>
            <li><MyLink to="/veterinary-team" className="hover:text-white duration-150">Veterinary Team</MyLink></li>
            <li><MyLink to="/add-service" className="hover:text-white duration-150">Add Services</MyLink></li>
            <li><MyLink to="/my-listings" className="hover:text-white duration-150">My Listings</MyLink></li>
            <li><MyLink to="/my-orders" className="hover:text-white duration-150">My Orders</MyLink></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-4 relative after:absolute after:w-10 after:h-0.5 after:bg-purple-500 after:-bottom-1 after:left-0">
            Company
          </h3>
          <ul className="space-y-2">
            <li><MyLink to="/about" className="hover:text-white duration-150">About Us</MyLink></li>
            <li><MyLink to="/contacts" className="hover:text-white duration-150">Contact</MyLink></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-4 relative after:absolute after:w-10 after:h-0.5 after:bg-purple-500 after:-bottom-1 after:left-0">
            Follow Us
          </h3>

          <div className="flex gap-4 text-2xl">
            <MyLink to="https://facebook.com" className="text-white hover:text-blue-500 duration-200">
              <FaFacebookF />
            </MyLink>

            <MyLink to="https://x.com" className="text-white hover:text-black duration-200">
              <FaXTwitter />
            </MyLink>

            <MyLink to="https://instagram.com" className="text-white hover:text-pink-500 duration-200">
              <FaInstagram />
            </MyLink>

            <MyLink to="https://linkedin.com" className="text-white hover:text-blue-600 duration-200">
              <FaLinkedinIn />
            </MyLink>

            <MyLink to="mailto:pawmart@gmail.com" className="hover:text-blue-400 duration-200">
              <MdOutlineMail />
            </MyLink>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500">
        © {new Date().getFullYear()} PawMart — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;