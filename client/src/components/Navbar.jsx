// src/components/Navbar.js
import React from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
    <div className="container">
      <a className="navbar-brand fw-bold text-success" href="#">GreenNest</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="mainNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {['Home','Shop','About','Contact'].map((x) => (
            <li className="nav-item" key={x}>
              <a className={`nav-link${x==='Home'?' active':''}`} href="#">{x}</a>
            </li>
          ))}
        </ul>
        <form className="d-flex me-3">
          <input className="form-control me-2" type="search" placeholder="Search plants..." />
        </form>
        <div className="d-flex align-items-center">
          <a href="#" className="position-relative me-3 text-dark">
            <FaShoppingCart size={20} />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">3</span>
          </a>
          <a href="#" className="btn btn-outline-success btn-sm">
            <FaUser className="me-1" /> Login
          </a>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
