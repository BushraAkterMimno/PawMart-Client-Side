import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pets from "../../public/petAdopt.json"; 

const PetCategory = () => {
  const [randomPets, setRandomPets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const shuffled = [...pets].sort(() => 0.5 - Math.random());
    setRandomPets(shuffled.slice(0, 6));
  }, []);

  const handleSeeDetails = (id) => {
    navigate(`/pets/${id}`); 
  };

  return (
    <div className="py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Pets (Adoption)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto">
        {randomPets.map((pet) => (
          <div
            key={pet.id}
            className="bg-white shadow-lg rounded-xl p-4 hover:shadow-2xl transition duration-300">
            <img
              src={pet.image}
              alt={pet.name}
              className="w-full h-56 object-cover rounded-lg" />
            <h3 className="text-xl font-semibold mt-3">{pet.name}</h3>
            <p className="text-gray-600">{pet.category}</p>
            <p className="font-semibold text-gray-800 mt-1">
              {pet.price === 0 ? "Free for Adoption" : `$${pet.price}`}
            </p>
            <p className="text-sm text-gray-500">📍 {pet.location}</p>
            <button
                onClick={() => navigate(`/pet-details/${pet.id}`)}
                className="mt-3 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">See Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetCategory;