import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://pawmart-server-opal.vercel.app/listings/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setListing(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>
    <span className="loading loading-spinner text-primary"></span>
    <span className="loading loading-spinner text-secondary"></span>
    <span className="loading loading-spinner text-accent"></span>
  </div>;
  if (!listing) return <div>Listing not found!</div>;

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto mt-10 p-6">
        <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition duration-300">
          <img
            src={listing.image}
            alt={listing.name}
            className="w-full h-72 object-cover rounded-lg" />

          <h2 className="text-3xl font-bold mt-5">{listing.name}</h2>
          {listing.category && (
            <p className="text-gray-600 text-lg font-medium">{listing.category}</p>
          )}

          <p className="text-xl font-semibold text-gray-800 mt-2">
            {listing.price === 0 ? "Free for Adoption" : `$${listing.price}`}
          </p>

          {listing.location && (
            <p className="text-gray-500 text-sm mt-1">📍 {listing.location}</p>
          )}

          <p className="text-gray-700 mt-4 leading-relaxed">{listing.description}</p>

          <button className="mt-6 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
            Adopt / Order Now
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ListingDetails;