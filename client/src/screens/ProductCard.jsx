import React from 'react';

const ProductCard = ({ product }) => {
    console.log("img: " + product.image)
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      {/* <img src="/images/fiddle_leaf_fig.jpg" alt="plant1" /> */}
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="price">₹{product.price.toFixed(2)}</div>
      <button className="btn-add">Add to Cart</button>
    </div>
  );
};

export default ProductCard;