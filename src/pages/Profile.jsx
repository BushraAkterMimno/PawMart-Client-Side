import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Profile = () => {
  const { user, loading, logoutUser, updateUserProfile } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: "",
    email: "",
    photoURL: "",
    phone: "",
    address: "",
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const navigate = useNavigate();

  // Load user & recent orders
  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/login");
      } else {
        setCurrentUser(user);
        setEditForm({
          displayName: user.displayName || "",
          email: user.email || "",
          photoURL: user.photoURL || "",
          phone: user.phone || "",
          address: user.address || "",
        });

        // Fetch recent orders
        fetch(`https://pawmart-server-opal.vercel.app/orders?email=${user.email}`)
          .then((res) => res.json())
          .then((data) => {
            if (Array.isArray(data)) {
              const lastFive = data.slice(-5).reverse();
              setRecentOrders(lastFive);
            }
          })
          .catch((err) => console.error(err));
      }
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(editForm.displayName, editForm.photoURL, editForm.phone, editForm.address);
      Swal.fire("Profile updated!", "", "success");
      setCurrentUser({ ...currentUser, ...editForm });
      setShowEditModal(false);
    } catch (err) {
      console.error(err);
      Swal.fire("Update failed!", "", "error");
    }
  };

  if (loading || !currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-black transition">⬅ Back</button>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
          <img
            src={currentUser.photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-purple-600 object-cover mb-4" />
          <h2 className="text-2xl font-bold">{currentUser.displayName || "No Name"}</h2>
          <p className="text-gray-500">{currentUser.email}</p>
          {currentUser.phone && <p className="text-gray-500">📞 {currentUser.phone}</p>}
          {currentUser.address && <p className="text-gray-500">🏠 {currentUser.address}</p>}
          <p className="text-gray-400 mt-2">Joined: {new Date(currentUser.createdAt || Date.now()).toLocaleDateString()}</p>

          <div className="flex flex-col gap-2 mt-4 w-full">
            <button
              onClick={() => setShowEditModal(true)}
              className="w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
            >Edit Profile</button>
            <button
              onClick={handleLogout}
              className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">Logout</button>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          {recentOrders.length === 0 ? (
            <p className="text-gray-500">No recent orders.</p>
          ) : (
            <ul className="space-y-3 max-h-[400px] overflow-y-auto">
              {recentOrders.map((order, idx) => (
                <li key={idx} className="border rounded-lg p-3 hover:shadow-md transition flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{order.productName}</p>
                    <p className="text-gray-500 text-sm">Qty: {order.quantity} | ${order.price}</p>
                    <p className="text-gray-400 text-xs">{new Date(order.date).toLocaleString()}</p>
                  </div>
                  <p className="text-gray-600">{order.address}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">✕</button>
            <h2 className="text-2xl font-bold text-center mb-4">Edit Profile</h2>

            <form onSubmit={handleUpdateProfile} className="space-y-3">
              <input
                type="text"
                name="displayName"
                value={editForm.displayName}
                onChange={handleEditChange}
                placeholder="Full Name"
                className="input input-bordered w-full"
                required />

              <input
                type="email"
                name="email"
                value={editForm.email}
                className="input input-bordered w-full bg-gray-200 cursor-not-allowed"
                disabled />

              <input
                type="text"
                name="photoURL"
                value={editForm.photoURL}
                onChange={handleEditChange}
                placeholder="Photo URL"
                className="input input-bordered w-full" />

              <input
                type="text"
                name="phone"
                value={editForm.phone}
                onChange={handleEditChange}
                placeholder="Phone"
                className="input input-bordered w-full" />

              <input
                type="text"
                name="address"
                value={editForm.address}
                onChange={handleEditChange}
                placeholder="Address"
                className="input input-bordered w-full" />

              <button className="btn bg-purple-600 hover:bg-purple-700 text-white w-full">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;