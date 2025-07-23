import React from 'react';
import Navbar from '../components/Navbar';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const categories = [
    {
      title: "Indoor Plants",
      image: "/indoorplant.png",

    },
    {
      title: "Outdoor Plants",
      image: "/outdoorplant.png",

    },
    {
      title: "Planters & Tools",
      image: "/planters.png",

    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div
        className="py-5 text-center text-white"
        style={{
          background: "linear-gradient(135deg, #a8e6cf, #dcedc1)",
          minHeight: "50vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1 className="display-4 fw-bold">Welcome to GreenNest</h1>
        <p className="lead">Bringing Nature Closer to You — Indoor & Outdoor Plants, Tools and More</p>
      </div>

      {/* Categories Section */}
      <div className="container my-5">
        <h2 className="text-center mb-4 text-success">Explore Our Categories</h2>
        <div className="row g-4">
          {categories.map((item, index) => (
            <div className="col-md-4" key={index}>
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.title}
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title text-center">{item.title}</h5>
                  <div className="text-center mt-3">
                    <a href="#" className="btn btn-success btn-sm">
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
