// src/App.js
import React, { useState } from "react";
import "./AdminPage.css";

function AdminPage() {
  const [formData, setFormData] = useState({
    name: "",
    category: "Indoor",
    price: "",
    stock: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Plant Added:", formData);
    alert("Plant added successfully!");
    setFormData({
      name: "",
      category: "Indoor",
      price: "",
      stock: "",
      description: "",
      image: null,
    });
  };

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>🌿 Admin Page 🌿</h2>
        <nav>
          <a href="/adminDashboard">Dashboard</a>
          <a href="/productManager">Products</a>
          <a href="/orderManager">Orders</a>
          <a href="/customerManager">Customers</a>
        </nav>
      </aside>

      <main className="main">
        <h1>Welcome, Admin</h1>

        <div className="dashboard">
          <div className="card">
            <h3>Total Sales</h3>
            <p>₹4,500</p>
          </div>
          <div className="card">
            <h3>Orders</h3>
            <p>120</p>
          </div>
          <div className="card">
            <h3>Low Stock</h3>
            <p>5 products</p>
          </div>
        </div>

        {/* <h2>Add New Plant</h2> */}
        <form className="form d-none" onSubmit={handleSubmit}>
          <label>Plant Name</label>
          <input name="name" value={formData.name} onChange={handleChange} required />

          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option>Indoor</option>
            <option>Succulent</option>
            <option>Outdoor</option>
          </select>

          <label>Price ($)</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />

          <label>Stock</label>
          <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />

          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />

          <label>Image Upload</label>
          <input type="file" name="image" onChange={handleChange} />

          <button type="submit">Add Plant</button>
        </form>
      </main>
    </div>
  );
}

export default AdminPage;
