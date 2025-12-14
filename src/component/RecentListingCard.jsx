import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const RecentListingCard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const [orderForm, setOrderForm] = useState({
    productName: "",
    buyerName: "",
    buyerEmail: "",
    price: 0,
    quantity: 1,
    address: "",
    phone: "",
    note: "",
  });

  useEffect(() => {
    fetch("https://pawmart-server-opal.vercel.app/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(Array.isArray(data) ? data : []);
      })
      .catch(() => setServices([]));
  }, []);

  // See Details
  const handleSeeDetails = (service) => {
    setSelectedService(service);
    setShowDetailsModal(true);
  };

  // Buy / Adopt
  const handleBuyNow = () => {
    if (!user) {
      Swal.fire("Please login first!", "", "warning");
      navigate("/login");
      return;
    }

    setOrderForm({
      productName: selectedService.name,
      buyerName: user.displayName || "",
      buyerEmail: user.email || "",
      price: selectedService.price,
      quantity: 1,
      address: "",
      phone: "",
      note: "",
    });

    setShowDetailsModal(false);
    setShowOrderModal(true);
  };

  // Order input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderForm({ ...orderForm, [name]: value });
  };

  // Submit Order
  const handleSubmitOrder = (e) => {
    e.preventDefault();

    const orderData = {
      ...orderForm,
      productId: selectedService._id,
      productType: "service",
      sellerEmail: selectedService.email || "",
      date: new Date().toISOString().split("T")[0],
    };

    fetch("https://pawmart-server-opal.vercel.app/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire("Order placed successfully!", "", "success");
        setShowOrderModal(false);
        setSelectedService(null);
      })
      .catch(() => {
        Swal.fire("Order failed!", "", "error");
      });
  };

  return (
    <div className="py-10 mt-18">
      <h2 className="text-3xl font-bold text-center mb-8">Our Latest Listings</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white shadow-lg rounded-xl p-4 hover:shadow-2xl transition">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-56 object-cover rounded-lg" />

            <h3 className="text-xl font-semibold mt-3">
              {service.name}
            </h3>

            <p className="text-gray-600">{service.category}</p>

            <p className="font-semibold mt-1">
              {service.price === 0
                ? "Free for Adoption"
                : `$${service.price}`}
            </p>

            <button
              onClick={() => handleSeeDetails(service)}
              className="mt-3 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
            >See Details</button>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setShowDetailsModal(false)}
              className="absolute top-3 right-3"
            >✕</button>

            <img
              src={selectedService.image}
              alt={selectedService.name}
              className="w-full h-64 object-cover rounded-lg mb-4" />

            <h2 className="text-2xl font-bold">
              {selectedService.name}
            </h2>

            <p className="text-gray-600">{selectedService.category}</p>

            <p className="font-semibold mt-1">
              {selectedService.price === 0
                ? "Free for Adoption"
                : `$${selectedService.price}`}
            </p>

            <p className="text-gray-700 mt-3">
              {selectedService.description}
            </p>

            <button
              onClick={handleBuyNow}
              className="mt-5 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
              {selectedService.price === 0 ? "Adopt Now" : "Buy Now"}
            </button>
          </div>
        </div>
      )}

      {/* Order Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setShowOrderModal(false)}
              className="absolute top-3 right-3"
            >✕</button>

            <h2 className="text-2xl font-bold text-center mb-4">
              Order Form
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
                name="quantity"
                type="number"
                min="1"
                value={orderForm.quantity}
                onChange={handleChange}
                className="input input-bordered w-full" />

              <input
                className="input input-bordered w-full"
                value={
                  selectedService.price === 0
                    ? "Free"
                    : `$${orderForm.price}`
                }
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
                placeholder="Additional Note"/>

              <button className="btn bg-purple-600 hover:bg-purple-700 text-white w-full">Confirm Order</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentListingCard;