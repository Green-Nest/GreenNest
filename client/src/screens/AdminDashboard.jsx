import React from "react";
import "./AdminDashboard.css";

function AdminDashboard() {
  // Simulated summary data
  const summary = {
    totalProducts: 58,
    totalCustomers: 129,
    totalOrders: 78,
    totalSales: 4520,
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
    <div className="dashboard-container">
      <h1>🌿 Admin Dashboard</h1>

      <div className="summary-cards">
        <div className="card">
          <h3>Total Products</h3>
          <p>{summary.totalProducts}</p>
        </div>
        <div className="card">
          <h3>Total Customers</h3>
          <p>{summary.totalCustomers}</p>
        </div>
        <div className="card">
          <h3>Total Orders</h3>
          <p>{summary.totalOrders}</p>
        </div>
        <div className="card">
          <h3>Total Sales</h3>
          <p>${summary.totalSales}</p>
        </div>
      </div>

      <div className="quick-links">
        <h2>Quick Access</h2>
        <div className="links">
          <a href="/productManager">Manage Products</a>
          <a href="/customerManager">Manage Customers</a>
          <a href="/ordersManager">Manage Orders</a>
        </div>
      </div>
    </div>
    </div>
  );
}

export default AdminDashboard;
