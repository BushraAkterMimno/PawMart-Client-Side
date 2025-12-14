import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import pets from "../../public/petAdopt.json";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [pet, setPet] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const [orderForm, setOrderForm] = useState({
    productName: "",
    buyerName: "",
    buyerEmail: "",
    price: "Free",
    address: "",
    phone: "",
    note: "",
  });

  useEffect(() => {
    const found = pets.find((item) => item.id === Number(id));
    setPet(found);
  }, [id]);

  if (!pet) {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Loading pet details...
      </div>
    );
  }

  // Adopt click
  const handleAdoptNow = () => {
    if (!user) {
      Swal.fire("Please login first!", "", "warning");
      navigate("/login");
      return;
    }

    setOrderForm({
      productName: pet.name,
      buyerName: user.displayName || "",
      buyerEmail: user.email || "",
      price: "Free",
      address: "",
      phone: "",
      note: "",
    });

    setShowOrderModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderForm({ ...orderForm, [name]: value });
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();

    const orderData = {
      ...orderForm,
      productId: pet.id,
      productType: "pet-adoption",
      category: pet.category,
      location: pet.location,
      date: new Date(),
    };

    fetch("https://pawmart-server-opal.vercel.app/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire("Adoption request sent!", "", "success");
        setShowOrderModal(false);
      })
      .catch(() => {
        Swal.fire("Failed to submit request!", "", "error");
      });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute right-4 top-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-black transition"
      >⬅ Back</button>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img
            src={pet.image}
            alt={pet.name}
            className="w-full h-[420px] object-cover" />
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">{pet.name}</h1>

          <p className="text-gray-600 mb-2 text-lg">
            <span className="font-semibold">Category:</span> {pet.category}
          </p>

          <p className="text-gray-600 mb-2 text-lg">
            <span className="font-semibold">Location:</span> {pet.location}
          </p>

          <p className="text-gray-600 mb-5 text-lg">
            <span className="font-semibold">Price:</span> Free for Adoption
          </p>

          <p className="text-gray-800 leading-relaxed mb-6">
            {pet.description}
          </p>

          <button
            onClick={handleAdoptNow}
            className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-purple-700 transition">
            Adopt Now
          </button>
        </div>
      </div>

      <div className="mt-12 bg-gray-100 p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">
          More About {pet.name}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {pet.moreInfo ||
            "This pet is looking for a loving home. They are friendly, calm, and perfect for families."}
        </p>
      </div>

      {/* Order / Adoption Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setShowOrderModal(false)}
              className="absolute top-3 right-3">✕</button>

            <h2 className="text-2xl font-bold text-center mb-4">
              Adoption Form
            </h2>

            <form onSubmit={handleSubmitOrder} className="space-y-3">
              <input
                className="input input-bordered w-full"
                value={orderForm.productName}
                readOnly />

              <input
                name="buyerName"
                value={orderForm.buyerName}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Your Name"
                required />

              <input
                name="buyerEmail"
                value={orderForm.buyerEmail}
                onChange={handleChange}
                className="input input-bordered w-full"
                required />

              <input
                className="input input-bordered w-full"
                value="Free for Adoption"
                readOnly />

              <input
                name="address"
                value={orderForm.address}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Address"
                required />

              <input
                name="phone"
                value={orderForm.phone}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Phone"
                required />

              <textarea
                name="note"
                value={orderForm.note}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
                placeholder="Why do you want to adopt?" />

              <button className="btn bg-purple-600 hover:bg-purple-700 text-white w-full"> Order</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetDetails;