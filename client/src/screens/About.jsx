import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function About() {
  return (
    <>
      <Navbar />

      <div
        className="py-5 text-center text-white"
        style={{
          background: 'linear-gradient(135deg, #a8e6cf, #dcedc1)',
        }}
      >
        <h1 className="display-5 fw-bold">About GreenNest</h1>
        <p className="lead">Our mission is to make every home a green sanctuary.</p>
      </div>

      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src="https://img.freepik.com/free-photo/green-plants-decorating-modern-room-interior_53876-128366.jpg"
              className="img-fluid rounded shadow"
              alt="GreenNest about"
            />
          </div>
          <div className="col-md-6">
            <h3>Who We Are</h3>
            <p>
              GreenNest is your one-stop destination for all things green — from air-purifying indoor plants
              to vibrant outdoor species and essential gardening tools. We believe plants can bring positivity,
              wellness, and beauty to any space.
            </p>
            <h4 className="mt-4">What We Offer</h4>
            <ul>
              <li>Indoor and Outdoor Plants</li>
              <li>Planters and Gardening Tools</li>
              <li>Expert Tips for Plant Care</li>
              <li>Fast and Safe Delivery</li>
            </ul>
            <p className="mt-3">
              Join the GreenNest family and transform your space into a lush paradise!
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
