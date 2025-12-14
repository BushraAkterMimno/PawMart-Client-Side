import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import MyLink from "../component/MyLink";

const VeterinaryMemberDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [member, setMember] = useState(null);

  useEffect(() => {
    fetch("/VeterinaryTeam.json")
      .then(res => res.json())
      .then(data => {
        const vet = data.find(v => v.id === parseInt(id));
        setMember(vet);
      });
  }, [id]);

  if (!member) return <p className="text-center py-20 min-h-screen">
    <span className="loading loading-spinner text-primary"></span>
    <span className="loading loading-spinner text-secondary"></span>
    <span className="loading loading-spinner text-accent"></span>
  </p>;

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute right-4 top-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-black transition"
      >⬅ Back</button>

      <div className="flex flex-col md:flex-row gap-10">
        
        <div className="shrink-0">
          <img 
            src={member.photo} 
            alt={member.name} 
            className="w-80 h-80 object-cover rounded-full border-4 border-gray-200" />
        </div>

        {/* Details */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-purple-900">{member.name}</h1>
          <p className="text-gray-600 text-lg mt-1">{member.specialty}</p>
          <div className="border-b-4 border-purple-600 w-16 my-4"></div>

          <p className="text-gray-700 mb-4">{member.bio}</p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">Experience:</h2>
          <p className="text-gray-700 mb-4">{member.experience} years in practice</p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">Information:</h2>
          <div className="flex-row gap-4 text-gray-700 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <FaPhone className="text-purple-600" />
              <span>+123 456 7890</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <FaEnvelope className="text-purple-600" />
              <span>info@vetclinic.com</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-purple-600" />
              <span>123 Pet Street, City</span>
            </div>
          </div>

          <div className="flex gap-4 text-gray-700 text-2xl mt-2">
            <MyLink to="https://facebook.com"><FaFacebookF className="hover:text-blue-600 text-black cursor-pointer" /></MyLink>
            <MyLink to="https://x.com"><FaTwitter className="hover:text-blue-400 text-black cursor-pointer" /></MyLink>
            <MyLink to="https://instagram.com"><FaInstagram className="hover:text-pink-500 text-black cursor-pointer" /></MyLink>
            <MyLink to="https://youtube.com"><FaYoutube className="hover:text-red-600 text-black cursor-pointer" /></MyLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VeterinaryMemberDetails;