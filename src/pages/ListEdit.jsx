import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import axios from "axios";

const ListEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    category: "Pets",
    price: 0,
    location: "",
    description: "",
    image: "",
    date: "",
    email: user?.email || "",
  });

  // Load existing data
  useEffect(() => {
    if (!user) return;
    axios
      .get(`https://pawmart-server-opal.vercel.app/services/${id}`)
      .then((res) => {
        if (res.data) {
          setFormData({
            name: res.data.name || "",
            category: res.data.category || "Pets",
            price: res.data.price || 0,
            location: res.data.location || "",
            description: res.data.description || "",
            image: res.data.image || "",
            date: res.data.date ? res.data.date.split("T")[0] : "", 
            email: res.data.email || user.email,
          });
        }
      })
      .catch((err) => console.error(err));
  }, [id, user]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      setFormData((prev) => ({
        ...prev,
        category: value,
        price: value === "Pets" ? 0 : prev.price,
      }));
    } else if (name === "price") {
      setFormData((prev) => ({
        ...prev,
        price: prev.category === "Pets" ? 0 : value,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://pawmart-server-opal.vercel.app/services/${id}`, formData)
      .then((res) => {
        alert("Product Updated Successfully!");
        navigate("/my-listings"); 
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-18">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Product / Pet</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-gray-700 mb-1">Product / Pet Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="input input-bordered w-full"
              required />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="select select-bordered w-full"
              required>
              <option>Pets</option>
              <option>Food</option>
              <option>Accessories</option>
              <option>Care Products</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder={
                formData.category === "Pets"
                  ? "Price is 0 for pets"
                  : "Enter price"
              }
              className="input input-bordered w-full"
              required
              readOnly={formData.category === "Pets"} />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
              className="input input-bordered w-full"
              required />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="textarea textarea-bordered w-full"
              rows={4}
              required />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="input input-bordered w-full"
              required />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Pick Up Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input input-bordered w-full"
              required />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              className="input input-bordered w-full bg-gray-100"
              readOnly />
          </div>

          <div>
            <button
              type="submit"
              className="btn bg-purple-600 hover:bg-purple-700 w-full text-white">
              Update Product / Pet
            </button>
          </div>

        </form>
      </div>

      <Footer />
    </>
  );
};

export default ListEdit;