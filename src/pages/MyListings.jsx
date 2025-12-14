import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import Swal from "sweetalert2";

const MyListings = () => {
  const { user, loading } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  // Fetch listings for this user
  useEffect(() => {
    if (user?.email) {
      fetch(`https://pawmart-server-opal.vercel.app/services?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setListings(Array.isArray(data) ? data : []))
        .catch((err) => {
          console.error(err);
          setListings([]);
        });
    }
  }, [user]);

  // Delete listing
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This listing will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://pawmart-server-opal.vercel.app/services/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            setListings(listings.filter((item) => item._id !== id));
            Swal.fire("Deleted!", "Your listing has been deleted.", "success");
          })
          .catch((err) => console.log(err));
      }
    });
  };

  // Edit placeholder
  const handleEdit = (id) => {
    navigate(`/edit-service/${id}`);
  };

  if (loading || !user) return <div className="flex items-center justify-center min-h-screen">
    <span className="loading loading-spinner text-primary"></span>
    <span className="loading loading-spinner text-secondary"></span>
    <span className="loading loading-spinner text-accent"></span>
  </div>;

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 mt-18">
        <h2 className="text-3xl font-bold mb-6">My Listings</h2>

        {listings.length === 0 ? (
          <p className="text-gray-600">No listings found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Location</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing) => (
                  <tr key={listing._id} className="text-center border-b">
                    <td className="px-4 py-2">
                      <img
                        src={listing.image}
                        alt={listing.name}
                        className="w-20 h-20 object-cover rounded" />
                    </td>
                    <td className="px-4 py-2">{listing.name}</td>
                    <td className="px-4 py-2">{listing.category}</td>
                    <td className="px-4 py-2">
                      {listing.price === 0
                        ? "Free for Adoption"
                        : `$${listing.price}`}
                    </td>
                    <td className="px-4 py-2">{listing.location}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => navigate(`/my-listings/${listing._id}`)}
                        className="bg-purple-600 text-white px-3 py-1 my-1 rounded hover:bg-purple-700 transition"
                      >Edit</button>
                      <button
                        onClick={() => handleDelete(listing._id)}
                        className="bg-red-600 text-white px-3 py-1 my-1 rounded hover:bg-red-700 transition"
                      >Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyListings;