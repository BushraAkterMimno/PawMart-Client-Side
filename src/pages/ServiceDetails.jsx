import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://pawmart-server-opal.vercel.app/services`)
      .then((res) => res.json())
      .then((data) => {
        setService(data); 
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="flex items-center justify-center min-h-screen">
    <span className="loading loading-spinner text-primary"></span>
    <span className="loading loading-spinner text-secondary"></span>
    <span className="loading loading-spinner text-accent"></span>
  </div>;
  if (!service) return <div>Service not found!</div>;

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto mt-18 p-6">
        <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition duration-300">

          <img
            src={service.image}
            alt={service.title}
            className="w-full h-72 object-cover rounded-lg" />

          <h2 className="text-3xl font-bold mt-5">{service.title}</h2>

          {service.category && (
            <p className="text-gray-600 text-lg font-medium">{service.category}</p>
          )}

          <p className="text-xl font-semibold text-gray-800 mt-2">
            {service.price === 0 ? "Free Service" : `$${service.price}`}
          </p>

          {service.location && (
            <p className="text-gray-500 text-sm mt-1">📍 {service.location}</p>
          )}

          <p className="text-gray-700 mt-4 leading-relaxed">
            {service.description}
          </p>

          <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Book Service
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ServiceDetails;