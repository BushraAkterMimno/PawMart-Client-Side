import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import jsPDF from "jspdf";
import "jspdf-autotable";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://pawmart-server-opal.vercel.app/orders?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          console.error("Expected an array but got:", data);
          setOrders([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setOrders([]);
        setLoading(false);
      });
  }, [user]);

  const handleDownloadPDF = () => {
    if (!orders || orders.length === 0) {
      alert("No orders to download.");
      return;
    }

    const doc = new jsPDF();
    doc.text("My Orders Report", 14, 20);

    const tableColumn = ["Product Name", "Quantity", "Price", "Address", "Date"];
    const tableRows = [];

    orders.forEach((order) => {
      const row = [
        order.productName || "-",
        order.quantity || "-",
        order.price || "-",
        order.address || "-",
        order.date || "-",
      ];
      tableRows.push(row);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save("my-orders.pdf");
  };

  if (loading) return <div className="text-center py-10 min-h-screen">
    <span className="loading loading-spinner text-primary"></span>
    <span className="loading loading-spinner text-secondary"></span>
    <span className="loading loading-spinner text-accent"></span>
  </div>;

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-6 mt-18">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">My Orders</h2>
          <button
            onClick={handleDownloadPDF}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">Download Report</button>
        </div>

        {orders.length === 0 ? (
          <p className="text-gray-600">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Product Name</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Address</th>
                  <th className="px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order._id || index} className="text-center border-b">
                    <td className="px-4 py-2">{order.productName || "-"}</td>
                    <td className="px-4 py-2">{order.quantity || "-"}</td>
                    <td className="px-4 py-2">{order.price || "-"}</td>
                    <td className="px-4 py-2">{order.address || "-"}</td>
                    <td className="px-4 py-2">
                      {order.date
                        ? new Date(order.date).toLocaleString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true, 
                          })
                        : "-"}
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

export default MyOrders;