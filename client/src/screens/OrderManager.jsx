import React, { useState } from "react";
import "./OrderManager.css";

function OrderManager() {
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    customerName: "",
    product: "",
    quantity: 1,
    status: "Pending",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      ...formData,
      date: new Date().toLocaleDateString(),
      id: Date.now(),
    };

    if (editingIndex !== null) {
      const updated = [...orders];
      updated[editingIndex] = newOrder;
      setOrders(updated);
      setEditingIndex(null);
    } else {
      setOrders([...orders, newOrder]);
    }

    setFormData({
      customerName: "",
      product: "",
      quantity: 1,
      status: "Pending",
    });
  };

  const handleEdit = (index) => {
    setFormData(orders[index]);
    setEditingIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      const updated = orders.filter((_, i) => i !== index);
      setOrders(updated);
      if (editingIndex === index) {
        setEditingIndex(null);
      }
    }
  };

  const handleStatusChange = (index, newStatus) => {
    const updated = [...orders];
    updated[index].status = newStatus;
    setOrders(updated);
  };

  return (
    <div className="order-manager">
      <h1>📦 Order Management</h1>

      <form className="form d-none" onSubmit={handleSubmit}>
        <h2>{editingIndex !== null ? "Edit Order" : "Add New Order"}</h2>

        <label>Customer Name</label>
        <input name="customerName" value={formData.customerName} onChange={handleChange} required />

        <label>Product</label>
        <input name="product" value={formData.product} onChange={handleChange} required />

        <label>Quantity</label>
        <input type="number" name="quantity" min="1" value={formData.quantity} onChange={handleChange} required />

        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option>Pending</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>

        <button type="submit">{editingIndex !== null ? "Update Order" : "Add Order"}</button>
      </form>

      <h2 style={{ marginTop: "40px" }}>All Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Status</th>
              <th>Change</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>{order.customerName}</td>
                <td>{order.product}</td>
                <td>{order.quantity}</td>
                <td>{order.status}</td>
                <td>
                  {order.status !== "Delivered" && (
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(index, e.target.value)}
                    >
                      <option>Pending</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  )}
                </td>
                <td>
                  <button className="edit" onClick={() => handleEdit(index)}>Edit</button>
                  <button className="delete" onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderManager;
