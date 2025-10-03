import React, { useState } from 'react';
import Products from '../components/products/Products';
import Navbar from '../components/Navbar/navbar';
import Footer from '../components/footer/footer';
import './categories.css';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'all',
    'furniture',
    'home-decoration',
    'lighting',
    'kitchen-accessories'
  ];

  return (
    <>
      <main>
        <Navbar />
        <div className="categories-container">
        <aside className="sidebar">
          <h5>Categories</h5>
          <ul>
            {categories.map((cat) => (
              <li
                key={cat}
                className={selectedCategory === cat ? 'active' : ''}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.replace('-', ' ')}
              </li>
            ))}
          </ul>
        </aside>
        <main className="main-content">
          <Products selectedCategory={selectedCategory} />
        </main>
      </div>
        <Footer />
      </main>
    </>  
  );
};

export default Categories;