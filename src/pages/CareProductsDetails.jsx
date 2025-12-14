import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

const CareProductsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
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

  // Load product
  useEffect(() => {
    fetch("/PetCareProducts.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.id === Number(id));
        setProduct(found);
      });
  }, [id]);

  // Buy Now
  const handleBuyNow = () => {
    if (!user) {
      Swal.fire("Please login first!", "", "warning");
      navigate("/login");
      return;
    }

    setOrderForm({
      productName: product.name,
      buyerName: user.displayName || "",
      buyerEmail: user.email || "",
      quantity: 1,
      price: product.price,
      address: "",
      phone: "",
      note: "",
    });

    setIsModalOpen(true);
  };

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderForm({ ...orderForm, [name]: value });
  };

  // Submit order
  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      ...orderForm,
      productId: product.id,
      productType: "care-product",
      date: new Date(),
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

  if (!product) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 relative">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="absolute right-4 top-4 bg-gray-800 text-white px-4 py-2 rounded-lg"
      >⬅ Back</button>

      <div className="grid md:grid-cols-2 gap-10">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[420px] object-cover rounded-xl" />

        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p><b>Category:</b> {product.category}</p>
          <p><b>Brand:</b> {product.brand || "N/A"}</p>
          <p className="text-xl mt-2"><b>Price:</b> ${product.price}</p>

          <p className="mt-4">{product.description}</p>

          <button
            onClick={handleBuyNow}
            className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg"
          >Buy Now</button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-3 text-xl"
            >✕</button>

            <h2 className="text-2xl font-bold mb-4 text-center">Order</h2>

            <form 
            onSubmit={handleSubmit} 
            className="space-y-3">
              <input 
              className="input input-bordered w-full" 
              value={orderForm.productName} 
              readOnly />

              <input 
              name="buyerName" 
              value={orderForm.buyerName} 
              onChange={handleChange} 
              className="input input-bordered w-full" 
              placeholder="Buyer Name" 
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
              value={orderForm.price} 
              readOnly 
              className="input input-bordered w-full" />

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
              placeholder="Additional note" />

              <button className="btn bg-purple-600 hover:bg-purple-700 text-white w-full">Confirm Order</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareProductsDetails;