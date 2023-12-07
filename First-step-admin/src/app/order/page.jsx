"use client";
import { useState, useEffect } from "react";
import BASE_URL from "@/lib/baseUrl";
import Swal from 'sweetalert2';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${BASE_URL}/order`);
        const data = await response.json();
        setOrders(data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    const fetchOrderStatus = async () => {
      try {
        const response = await fetch(`${BASE_URL}/order-status`);
        const data = await response.json();
        setOrderStatus(data.data);
      } catch (error) {
        console.error("Error fetching order status:", error);
      }
    };

    fetchOrders();
    fetchOrderStatus();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await fetch(`${BASE_URL}/order-status/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const response = await fetch(`${BASE_URL}/order`);
      const data = await response.json();
      setOrders(data.data);

      const orderStatusResponse = await fetch(`${BASE_URL}/order-status`);
      const orderStatusData = await orderStatusResponse.json();
      setOrderStatus(orderStatusData.data);

      // Menampilkan notifikasi SweetAlert setelah berhasil mengubah status
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Order status updated successfully!',
      });
    } catch (error) {
      console.error("Error updating order status:", error);

      // Menampilkan notifikasi SweetAlert jika terjadi kesalahan
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update order status. Please try again.',
      });
    }
  };

  const handleSelectChange = async (orderId, event) => {
    const newStatus = event.target.value;
    try {
      await handleStatusUpdate(orderId, newStatus);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="flex flex-col items-center py-5 h-screen">
      <div className="w-3/4">
        <h1 className="text-4xl font-bold text-center mb-10 text-orange-600">Order List</h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-orange-900">
            <thead>
              <tr className="bg-orange-900 text-white">
                <th className="py-2 px-4 border"># ID</th>
                <th className="py-2 px-4 border">Cart ID</th>
                <th className="py-2 px-4 border">Address</th>
                <th className="py-2 px-4 border">Payment Method ID</th>
                <th className="py-2 px-4 border">Total Price</th>
                <th className="py-2 px-4 border">Action</th>
                <th className="py-2 px-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="py-2 px-4 border">{order.id}</td>
                  <td className="py-2 px-4 border">{order.cart_id}</td>
                  <td className="py-2 px-4 border">{order.address.address}</td>
                  <td className="py-2 px-4 border">{order.payment[0].payment_method_id}</td>
                  <td className="py-2 px-4 border">{order.payment[0].total_price}</td>
                  <td className="py-2 px-4 border">
                    <select
                      className="rounded px-2 py-1 bg-gray-200"
                      value={order.order_status[0].status}
                      onChange={(e) => handleSelectChange(order.id, e)}
                    >
                      <option value="Waiting Payment">Waiting Payment</option>
                      <option value="Process">Process</option>
                      <option value="Waiting Courier">Waiting Courier</option>
                      <option value="Arrived">Arrived</option>
                    </select>
                  </td>
                  <th className="py-2 px-4 border">{order.order_status[0].status}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );  
};

export default OrderPage;
