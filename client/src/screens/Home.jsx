import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Home = () => {
 const categories = [
  {
    title: "Indoor Plants",
    image: "/indoorplant.png",
    link: "/indoor-plants"
  },
  {
    title: "Outdoor Plants",
    image: "/outdoorplant.png",
    link: "/outdoor-plants"
  },
  {
    title: "Planters & Tools",
    image: "/planters.png",
    link: "/planters-tools"
  },
  {
    title: "Indoor Plants",
    image: "/indoorplant.png",
    link: "/indoor-plants"
  },
  {
    title: "Outdoor Plants",
    image: "/outdoorplant.png",
    link: "/outdoor-plants"
  },
  {
    title: "Planters & Tools",
    image: "/planters.png",
    link: "/planters-tools"
  },
  {
    title: "Indoor Plants",
    image: "/indoorplant.png",
    link: "/indoor-plants"
  },
  {
    title: "Outdoor Plants",
    image: "/outdoorplant.png",
    link: "/outdoor-plants"
  },
  {
    title: "Planters & Tools",
    image: "/planters.png",
    link: "/planters-tools"
  },
];

  return (
    <>
      {/* <Navbar /> */}
           <div className="position-relative text-white" style={{ minHeight: '40vh' }}>
  {/* Blurred background */}
  <div
    className="position-absolute w-100 h-100"
    style={{
      backgroundImage: "url('green.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "blur(2px)",
      transform: "scale(1.05)", // avoid blur edges
      zIndex: 1,
    }}
  ></div>

  {/* Centered text */}
  <div
    className="position-absolute top-50 start-50 translate-middle text-center"
    style={{ zIndex: 2 }}
  >
    <h1 className="display-4 fw-bold">Welcome to GreenNest</h1>
    <p className="lead">
      Bringing Nature Closer to You — Indoor & Outdoor Plants, Tools and More
    </p>
  </div>
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
                    <Link to={item.link} className="btn btn-success btn-sm">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Home;
