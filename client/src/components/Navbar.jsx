// src/components/Navbar.js
import React from 'react';
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
    <div className="container">
      <Link className="navbar-brand fw-bold text-success" to="/">
        GreenNest
      </Link>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="mainNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" to="/">Home</Link>
          </li>

          {/* Shop Dropdown Start */}
          <li className="nav-item dropdown shop-hover">
  <a
    className="nav-link dropdown-toggle"
    href="#"
    id="shopDropdown"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    Shop
  </a>
  <ul className="dropdown-menu" aria-labelledby="shopDropdown">
    <li><Link className="dropdown-item" to="/indoor-plants">Indoor Plants</Link></li>
    <li><Link className="dropdown-item" to="/outdoor-plants">Outdoor Plants</Link></li>
    <li><Link className="dropdown-item" to="/planters-tools">Planters & Tools</Link></li>
  </ul>
</li>

          {/* Shop Dropdown End */}

          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact</Link>
          </li>
        </ul>

        <form className="d-flex me-3">
          <input className="form-control me-2" type="search" placeholder="Search plants..." />
        </form>

        <div className="d-flex align-items-center">
          <a href="#" className="position-relative me-3 text-dark">
            <FaShoppingCart size={20} />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">3</span>
          </a>
          <Link to="/login" className="btn btn-outline-success btn-sm">
            <FaUser className="me-1" /> Login
          </Link>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
