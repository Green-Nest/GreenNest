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
      {/* <Navbar /> */}
           <div className="position-relative text-white" style={{ minHeight: '40vh' }}>
  {/* Blurred background */}
  <div
    className="position-absolute w-100 h-100"
    style={{
      backgroundImage: "url('bgg.jpg')",
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
    <h1 className="display-4 fw-bold">Indoor Plants</h1>
    <p className="lead">
      Green up your space with our selection of air-purifying indoor plants
    </p>
  </div>
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
