import React, { useState, useEffect } from 'react';
import { fetchAllProducts } from '../Utilities/product-Service';
import '../Styles/page.css';

const defaultImage = 'https://via.placeholder.com/150'; // Default image URL

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const productsData = await fetchAllProducts();
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddToCart = (product) => {
    console.log(`Added ${product.name} to cart`);
    // Add your add to cart logic here
  };

  return (
    <div className="homepage">
      <h1 className="homepage__title">Home Page</h1>
      <ul className="homepage__list">
        {products.map(product => (
          <li key={product.id} className="homepage__item">
            <img
              src={product.image || defaultImage}
              alt={product.name}
              className="homepage__item-image"
            />
            <div className="homepage__item-details">
              <h2 className="homepage__item-title">{product.name}</h2>
              <p className="homepage__item-description">{product.description}</p>
              <p className="homepage__item-price">${product.price}</p>
              <button
                className="homepage__item-button"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;