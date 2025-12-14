import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

const AccessoriesDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [item, setItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [orderForm, setOrderForm] = useState({
    productName: "",
    buyerName: "",
    buyerEmail: "",
    quantity: 1,
    price: 0,
    address: "",
    phone: "",
    note: "",
  });

  // Load accessory details
  useEffect(() => {
    fetch("/PetAccessories.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((acc) => acc.id === Number(id));
        setItem(found);
      });
  }, [id]);

  // Buy Now button
  const handleBuyNow = () => {
    if (!user) {
      Swal.fire("Please login first!", "", "warning");
      navigate("/login");
      return;
    }

    setOrderForm({
      productName: item.name,
      buyerName: user.displayName || "",
      buyerEmail: user.email || "",
      quantity: 1,
      price: item.price,
      address: "",
      phone: "",
      note: "",
    });

    setIsModalOpen(true);
  };

  // Form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderForm({ ...orderForm, [name]: value });
  };

  // Submit order
  const handleOrderSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      ...orderForm,
      productId: item.id,
      date: new Date().toISOString(),
    };

    fetch("https://pawmart-server-opal.vercel.app/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire("Order placed successfully!", "", "success");
        setIsModalOpen(false);
      })
      .catch(() => {
        Swal.fire("Order failed!", "", "error");
      });
  };

  // Loading state
  if (!item) {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        <span className="loading loading-spinner text-primary"></span>
        <span className="loading loading-spinner text-secondary"></span>
        <span className="loading loading-spinner text-accent"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute right-4 top-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-black transition">⬅ Back</button>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-[420px] object-cover" />
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">{item.name}</h1>
          <p className="text-gray-600 mb-2 text-lg">
            <span className="font-semibold">Category:</span> {item.category}
          </p>
          <p className="text-gray-600 mb-2 text-lg">
            <span className="font-semibold">Brand:</span>{" "}
            {item.brand || "N/A"}
          </p>
          <p className="text-gray-600 mb-5 text-lg">
            <span className="font-semibold">Price:</span> ${item.price}
          </p>
          <p className="text-gray-800 leading-relaxed mb-6">
            {item.description}
          </p>

          <button
            onClick={handleBuyNow}
            className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-purple-700 transition"
          >Buy Now</button>
        </div>
      </div>

      <div className="mt-12 bg-gray-100 p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">
          More About {item.name}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {item.moreInfo ||
            "This accessory ensures high-quality comfort and durability for your pets."}
        </p>
      </div>

      {/* ORDER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-3 text-xl font-bold">✕</button>

            <h2 className="text-2xl font-bold mb-4 text-center">Order</h2>

            <form
              onSubmit={handleOrderSubmit}
              className="space-y-3">
              <input
                type="text"
                name="productName"
                value={orderForm.productName}
                readOnly
                className="input input-bordered w-full" />

              <input
                type="text"
                name="buyerName"
                value={orderForm.buyerName}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Buyer Name"
                required />

              <input
                type="email"
                name="buyerEmail"
                value={orderForm.buyerEmail}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Buyer Email"
                required />

              <input
                type="number"
                name="quantity"
                value={orderForm.quantity}
                min="1"
                onChange={handleChange}
                className="input input-bordered w-full" />

              <input
                type="number"
                name="price"
                value={orderForm.price}
                readOnly
                className="input input-bordered w-full" />

              <input
                type="text"
                name="address"
                value={orderForm.address}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Address"
                required />

              <input
                type="text"
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
                placeholder="Additional Note" />

              <button
                type="submit"
                className="btn bg-purple-600 hover:bg-purple-700 text-white w-full">Confirm Order</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessoriesDetails;