import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const sampleProducts = [
  {
    id: 1,
    name: 'Fiddle Leaf Fig',
    category: 'indoor',
    description: 'Perfect for bright indoor corners.',
    price: 34.99,
    image: "/fiddleleaffig.jpg",
  },
  {
    id: 2,
    name: 'Mini Succulent Set',
    category: 'succulent',
    description: 'Low maintenance and cute decor.',
    price: 14.99,
    image: "/minisucculentset.jpg",
  },
  {
    id: 3,
    name: 'Peace Lily',
    category: 'flowering',
    description: 'Cleans air and blooms indoors.',
    price: 19.99,
    image: "/peacelily.jpg",
  },
  {
    id: 4,
    name: 'Bonsai Tree',
    category: 'outdoor',
    description: 'Elegant and mindful plant art.',
    price: 45.00,
    image: "/bonsaitree.jpg",
  },
  {
    id: 5,
    name: 'Fiddle Leaf Fig',
    category: 'indoor',
    description: 'Perfect for bright indoor corners.',
    price: 34.99,
    image: "/fiddleleaffig.jpg",
  },
  {
    id: 6,
    name: 'Mini Succulent Set',
    category: 'succulent',
    description: 'Low maintenance and cute decor.',
    price: 14.99,
    image: "/minisucculentset.jpg",
  },
  {
    id: 7,
    name: 'Peace Lily',
    category: 'flowering',
    description: 'Cleans air and blooms indoors.',
    price: 19.99,
    image: "/peacelily.jpg",
  },
  {
    id: 8,
    name: 'Bonsai Tree',
    category: 'outdoor',
    description: 'Elegant and mindful plant art.',
    price: 45.00,
    image: "/bonsaitree.jpg",
  },
];

const ProductsPage = ({ username }) => {
  const [products, setProducts] = useState(sampleProducts);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('all');

  useEffect(() => {
    let filtered = [...sampleProducts];

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(p => p.category === categoryFilter);
    }

    if (sortOrder === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setProducts(filtered);
  }, [categoryFilter, sortOrder]);

  return (
    <div>
      <header className="header">
        <h1>🌱 GreenLife Plants</h1>
        <div className="welcome">Welcome, <strong>{username}</strong>!</div>
      </header>

      <div className="container">
        <div className="filters">
          <select onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="indoor">Indoor</option>
            <option value="outdoor">Outdoor</option>
            <option value="succulent">Succulents</option>
            <option value="flowering">Flowering</option>
          </select>

          <select onChange={(e) => setSortOrder(e.target.value)}>
            <option value="all">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;