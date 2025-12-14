import React from "react";
import PetHeroImg1 from "../assets/petHero1.jpeg";
import PetHeroImg2 from "../assets/petHero2.jpeg";
import PetHeroImg3 from "../assets/petHero3.jpg";

const PawMartSections = () => {
  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Why Adopt from <span className="text-purple-600">PawMart?</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Every year thousands of pets wait for a loving home. At PawMart, we help you
            find rescued, abandoned, and loving pets who just need one chance to be your best friend.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">🐾 Give a Second Chance</h3>
              <p className="text-gray-600">Adopting saves lives and gives abandoned pets a renewed hope.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">💖 Loving, Trained Pets</h3>
              <p className="text-gray-600">Many pets in shelters are already trained and ready for a new home.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">🏡 Adoption Support</h3>
              <p className="text-gray-600">We guide new pet parents with care tips, training and more.</p>
            </div>
          </div>
        </div>
      </section>

     
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
            Meet Our <span className="text-purple-600">Pet Heroes</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
              <img
                src={PetHeroImg3}
                className="w-full h-60 object-cover rounded-lg mb-4"
                alt="Pet Hero" />
              <h3 className="text-xl font-semibold text-gray-800">Sarah & Milo</h3>
              <p className="text-gray-600 mt-2">Milo was rescued from a roadside — now living a happy life!</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
              <img
                src={PetHeroImg2}
                className="w-full h-60 object-cover rounded-lg mb-4"
                alt="Pet Hero" />
              <h3 className="text-xl font-semibold text-gray-800">Rafi & Bruno</h3>
              <p className="text-gray-600 mt-2">Bruno was adopted from PawMart — now he’s the family’s favorite!</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
              <img
                src={PetHeroImg1}
                className="w-full h-60 object-cover rounded-lg mb-4"
                alt="Pet Hero" />
              <h3 className="text-xl font-semibold text-gray-800">Anika & Snow</h3>
              <p className="text-gray-600 mt-2">Snow was abandoned as a puppy — now growing up strong & loved.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PawMartSections;