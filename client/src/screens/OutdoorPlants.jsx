import React from 'react';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const outdoorPlants = [

     {
    name: "Armria formosa",
    image: "/armeria-formosa.jpg",
    price: "₹549",
  },
  {
    name: "Oakleaf Hydrangea",
    image: "/oakleafhydrangea.jpg",
    price: "₹499",
  },
  {
    name: "Begonia",
    image: "/begonia.jpg",
    price: "₹399",
  },
  {
    name: "Sedum",
    image: "/sedum.jpg",
    price: "₹299",
  },
   {
    name: "Persian Shield",
    image: "/persianshield.jpg",
    price: "₹349",
  },
  {
    name: "Hosta First Frost",
    image: "/HostaFirstFrost.jpg",
    price: "₹599",
  },
  {
    name: "Laten Rose",
    image: "/latenrose.jpg",
    price: "399",
  },
  {
    name: "Caladium",
    image: "/caladium.jpg",
    price: "₹499",
  },
  {
    name: "Areca Palm",
    image: "/arecapalm.jpg",
    price: "₹549",
  },
  {
    name: "Bougainvillea",
    image: "/bougainvillea.jpg",
    price: "₹399",
  },
  {
    name: "Hibiscus",
    image: "/hibiscus.jpg",
    price: "₹299",
  },
  {
    name: "Money Plant (Outdoor)",
    image: "/outdoor_moneyplant.jpg",
    price: "₹199",
  },

];

const OutdoorPlants = () => {
  return (
    <>
      <Navbar />
     <div className="position-relative text-white" style={{ minHeight: '40vh' }}>
  {/* Blurred background */}
  <div
    className="position-absolute w-100 h-100"
    style={{
      backgroundImage: "url('bg.jpg')",
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
    <h1 className="display-4 fw-bold">Outdoor Plants</h1>
    <p className="lead">
      Bring life to your garden with our beautiful outdoor plant collection
    </p>
  </div>
</div>




      <div className="container my-5">
        <div className="row g-4">
          {outdoorPlants.map((plant, index) => (
            <div className="col-md-3" key={index}>
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={plant.image}
                  className="card-img-top"
                  alt={plant.name}
                  style={{ height: '300px', objectFit: 'cover' }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{plant.name}</h5>
                  <p className="text-success fw-bold">{plant.price}</p>
                  <button className="btn btn-outline-success btn-sm">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OutdoorPlants;
