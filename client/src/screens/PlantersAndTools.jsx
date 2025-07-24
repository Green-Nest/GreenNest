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
           <div className="position-relative text-white" style={{ minHeight: '40vh' }}>
  {/* Blurred background */}
  <div
    className="position-absolute w-100 h-100"
    style={{
      backgroundImage: "url('planters&.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "blur(4px)",
      transform: "scale(1.00)", // avoid blur edges
      zIndex: 1,
    }}
  ></div>

  {/* Centered text */}
  <div
    className="position-absolute top-50 start-50 translate-middle text-center"
    style={{ zIndex: 2 }}
  >
    <h1 className="display-4 fw-bold">Planters & Tools</h1>
    <p className="lead">
      Everything you need to grow and care for your plants, beautifully
    </p>
  </div>
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
