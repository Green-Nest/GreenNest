// src/CustomerManager.js
import React, { useState } from "react";
import "./CustomerManager.css";

function CustomerManager() {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
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

    if (editingIndex !== null) {
      const updated = [...customers];
      updated[editingIndex] = formData;
      setCustomers(updated);
      setEditingIndex(null);
    } else {
      setCustomers([...customers, formData]);
    }

    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  const handleEdit = (index) => {
    setFormData(customers[index]);
    setEditingIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      const updated = customers.filter((_, i) => i !== index);
      setCustomers(updated);
      if (editingIndex === index) {
        setEditingIndex(null);
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
        });
      }
    }
  };

  return (
    <div className="customer-manager">
      <h1>👥 Customer Management</h1>

      <form className="form d-none" onSubmit={handleSubmit}>
        <h2>{editingIndex !== null ? "Edit Customer" : "Add New Customer"}</h2>

        <label>Name</label>
        <input name="name" value={formData.name} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Phone</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

        <label>Address</label>
        <textarea name="address" value={formData.address} onChange={handleChange} />

        <button type="submit">{editingIndex !== null ? "Update Customer" : "Add Customer"}</button>
      </form>

      <h2 style={{ marginTop: "40px" }}>All Customers</h2>

      {customers.length === 0 ? (
        <p>No customers added yet.</p>
      ) : (
        <table className="customer-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={index}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.address}</td>
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

export default CustomerManager;
