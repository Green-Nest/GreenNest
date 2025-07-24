import React from 'react';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const plantersAndTools = [
  {
    name: "Ceramic Pot Set",
    image: "/ceramicpots.jpg",
    price: "₹599",
  },
  {
    name: "Gardening Tool Kit",
    image: "/toolkit.jpg",
    price: "₹449",
  },
  {
    name: "Self-Watering Planter",
    image: "/selfwatering.jpg",
    price: "₹399",
  },
  {
    name: "Hand Shovel & Rake",
    image: "/shovelrake.jpg",
    price: "₹249",
  },
  {
    name: "Plastic Hanging Planter",
    image: "/hangingplanter.jpg",
    price: "₹199",
  },
  {
    name: "Metal Wall Pot",
    image: "/metalpot.jpg",
    price: "₹349",
  },
  {
    name: "Mini Gardening Scissors",
    image: "/miniscissors.jpg",
    price: "₹149",
  },
  {
    name: "Soil Moisture Meter",
    image: "/moisturemeter.jpg",
    price: "₹299",
  },
];

const PlantersAndTools = () => {
  return (
    <>
      <Navbar />
      <div
        className="py-5 text-center text-white"
        style={{
          background: "linear-gradient(135deg, #f7e8c1, #d2f1c1)",
          minHeight: "40vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1 className="display-4 fw-bold">Planters & Tools</h1>
        <p className="lead">Everything you need to grow and care for your plants, beautifully</p>
      </div>

      <div className="container my-5">
        <div className="row g-4">
          {plantersAndTools.map((item, index) => (
            <div className="col-md-3" key={index}>
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.name}
                  style={{ height: '300px', objectFit: 'cover' }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="text-success fw-bold">{item.price}</p>
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

export default PlantersAndTools;
