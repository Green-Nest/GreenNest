import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

export default function About() {
  return (
    <>
      <Navbar />
      <div
        className="position-relative text-white"
        style={{ minHeight: "40vh" }}
      >
        {/* Blurred background */}
        <div
          className="position-absolute w-100 h-100"
          style={{
            backgroundImage: "url('p3.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(2px)",
            transform: "scale(1.00)", // avoid blur edges
            zIndex: 1,
          }}
        ></div>

        {/* Centered text */}
        <div
          className="position-absolute top-50 start-50 translate-middle text-center"
          style={{ zIndex: 2 }}
        >
          <h1 className="display-4 fw-bold">About GreenNest</h1>
          <p className="lead">
            Our mission is to make every home a green sanctuary.
          </p>
        </div>
      </div>

      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src="plants.jpg"
              className="img-fluid rounded shadow"
              alt="GreenNest about"
            />
          </div>
          <div className="col-md-6">
            <h3>Who We Are</h3>
            <p>
              GreenNest is your one-stop destination for all things green — from
              air-purifying indoor plants to vibrant outdoor species and
              essential gardening tools. We believe plants can bring positivity,
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
              Join the GreenNest family and transform your space into a lush
              paradise!
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
