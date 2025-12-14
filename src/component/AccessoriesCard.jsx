import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AccessoriesCard = () => {
  const [accessories, setAccessories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/PetAccessories.json")
      .then((res) => res.json())
      .then((data) => setAccessories(data))
      .catch((err) => console.error("Failed to load accessories:", err));
  }, []);

  const handleSeeDetails = (id) => {
    navigate(`/accessory-details/${id}`); 
  };

  return (
    <div className="py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Pet Accessories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto">
        {accessories.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-xl p-4 hover:shadow-2xl transition duration-300">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-56 object-cover rounded-lg" />
            <h3 className="text-xl font-semibold mt-3">{item.name}</h3>
            <p className="text-gray-600">{item.category}</p>
            <p className="font-semibold text-gray-800 mt-1">${item.price}</p>
            <p className="text-gray-500 text-sm mt-1">{item.description}</p>
            <button
              onClick={() => handleSeeDetails(item.id)}
              className="mt-3 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
              See Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccessoriesCard;