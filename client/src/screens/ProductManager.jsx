import React, { useState, useEffect } from "react";
import "./ProductManager.css";

function ProductManager() {
  const [products, setProducts] = useState([]);

  const product = {
    name: "mango tree",
    category: "outdoor",
    price: 100,
    stock: 23,
    description: "summer season fruit tree",
    image: "C:\\Users\\user\\Pictures\\Saved Pictures\\god.jpg",
  }
  products.push(product)

  const [formData, setFormData] = useState({
    name: "",
    category: "Indoor",
    price: "",
    stock: "",
    description: "",
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
    setShow("form d-none")
    e.preventDefault();
    if (editingIndex !== null) {
      const updated = [...products];
      updated[editingIndex] = formData;
      setProducts(updated);
      setEditingIndex(null);
    } else {
      setProducts([...products, formData]);
    }

    setFormData({
      name: "",
      category: "Indoor",
      price: "",
      stock: "",
      description: "",
    });
  };

  const handleEdit = (index) => {
    setShow("form")
    setFormData(products[index]);
    setEditingIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this plant?")) {
      const updated = products.filter((_, i) => i !== index);
      setProducts(updated);
      if (editingIndex === index) {
        setEditingIndex(null);
        setFormData({
          name: "",
          category: "Indoor",
          price: "",
          stock: "",
          description: "",
        });
      }
    }
  };

  const [show, setShow] = useState("form d-none")
  console.log("show value: " + {show})
  return (
    <div className="product-manager">
      <h1>🌿 Product Management</h1>

      <form className={show} onSubmit={handleSubmit}>
        <h2>{editingIndex !== null ? "Edit Plant" : "Add New Plant"}</h2>

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

        <button type="submit">{editingIndex !== null ? "Update Plant" : "Add Plant"}</button>
      </form>

      <h2 style={{ marginTop: "40px" }}>All Plants</h2>

      {products.length === 0 ? (
        <p>No plants added yet.</p>
      ) : (
        <table className="plant-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((plant, index) => (
              <tr key={index}>
                <td>{plant.name}</td>
                <td>{plant.category}</td>
                <td>${plant.price}</td>
                <td>{plant.stock}</td>
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

export default ProductManager;
