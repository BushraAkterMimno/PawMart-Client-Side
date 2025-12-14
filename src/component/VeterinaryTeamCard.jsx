import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VeterinaryTeamCard = () => {
  const [team, setTeam] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/VeterinaryTeam.json")
      .then(res => res.json())
      .then(data => setTeam(data));
  }, []);

  const handleClick = (id) => {
    navigate(`/veterinary-member/${id}`);
  };

  return (
    <div className="py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Our Veterinary Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto">
        {team.map((vet) => (
          <div 
            key={vet.id} 
            className="bg-white shadow-lg rounded-xl p-4 hover:shadow-2xl transition cursor-pointer"
            onClick={() => handleClick(vet.id)}>
            <img 
              src={vet.photo} 
              alt={vet.name} 
              className="w-full h-56 object-cover rounded-lg" />
            <h3 className="text-xl font-semibold mt-3">{vet.name}</h3>
            <p className="text-gray-600">{vet.specialty}</p>
            <p className="text-gray-500 mt-1">{vet.experience} years experience</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VeterinaryTeamCard;