import React from 'react';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const indoorPlants = [
    {
    name: "Pothos (Money Plant)",
    image: "/moneyplant.jpg",
    price: "₹249",
  },
  {
    name: "Chinese Evergreen",
    image: "/chineseevergreen.jpg",
    price: "₹399",
  },
  {
    name: "Jade Plant (Crassula ovata)",
    image: "/Crassula_ovata.jpg",
    price: "₹399",
  },
  {
    name: " Monstera (Monstera deliciosa)",
    image: "/monstera.jpg",
    price: "₹399",
  },
  {
    name: "Snake Plant",
    image: "/snakeplant.jpg",
    price: "₹399",
  },
  {
    name: "Peace Lily",
    image: "/peacelily.jpg",
    price: "₹499",
  },
  {
    name: "ZZ Plant",
    image: "/zzplant.jpg",
    price: "₹349",
  },
  {
    name: "Spider Plant",
    image: "/spiderplant.jpg",
    price: "₹299",
  },
  {
    name: "Areca Palm",
    image: "/arecapalm.jpg",
    price: "₹599",
  },
  {
    name: "Aloe Vera",
    image: "/aloevera.jpg",
    price: "₹199",
  },
  {
    name: "Rubber Plant",
    image: "/rubberplant.jpg",
    price: "₹449",
  },
  {
    name: "Boston Fern",
    image: "/bostonfern.jpg",
    price: "₹349",
  },
];

const IndoorPlants = () => {
  return (
    <>
      <Navbar />
        <div
    className="py-5 text-center text-dark"
    style={{
      backgroundColor: "#f8f1e4", // classic beige tone
      minHeight: "40vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      borderBottom: "4px solid #4a7c59", // dark green accent border
    }}
  >
    <h1 className="display-4 fw-bold" style={{ color: "#4a7c59" }}>
      Indoor Plants
    </h1>
    <p className="lead" style={{ color: "#555" }}>
      Green up your space with our selection of air-purifying indoor plants
    </p>
  </div>

      <div className="container my-5">
        <div className="row g-4">
          {indoorPlants.map((plant, index) => (
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

export default IndoorPlants;
