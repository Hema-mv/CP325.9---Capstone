import React, { useState, useEffect } from 'react';
import { fetchAllProducts } from '../Utilities/product-Service';
import '../Styles/page.css';

const defaultImage = 'https://via.placeholder.com/150'; // Default image URL

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const options = Array.from({ length: 10 }, (_, i) => i + 1);

  useEffect(() => {
    fetchProducts();
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCart(storedCart);

    const rootElement = document.getElementById('root'); if (rootElement) 
      { rootElement.style.height = '100%'; 
        rootElement.style.margin = '0'; 
        rootElement.style.display = 'block'; 
        rootElement.style.flexDirection = 'column'; 
        rootElement.style.backgroundColor = '#f4f4f4'; 
    
     } 
  }, []);
 
  const fetchProducts = async () => {
    try {
      const productsData = await fetchAllProducts();
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities({
      ...quantities,
      [productId]: newQuantity,
    });
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product._id] || 1;
    const existingItemIndex = cart.findIndex(item => item._id === product._id);
    let updatedCart;

    if (existingItemIndex !== -1) {
      updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
    } else {
      updatedCart = [...cart, { ...product, quantity }];
    }
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    console.log('updatedCart', updatedCart);
    console.log(`Added ${product.name} to cart with quantity ${quantity}`);
  };

  return (
    <div className="homepage">
      <h1 className="homepagetitle">New line Clothing</h1><br/>
      <ul className="homepagelist">
        {products.map((product) => (
          <li key={product._id} className="homepage__item">
            <img
              src={product.image || defaultImage}
              alt={product.name}
              className="homepage-image"
            />
            <div className="homepageitem-details">
              <h2 className="homepageitem-title">{product.name}</h2>
              <p className="homepageitem-description">{product.description}</p>
              <p className="homepageitem-price">${product.price}</p>
              <div>
                <label class="homepageitem-qty" htmlFor="quantity">Quantity:</label>
                <select
                  id="quantity"
                  value={quantities[product._id] || 1}
                  onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value))}
                >
                  {options.map((option) => (
                    <option key={option} value={option}> {option} </option> ))} 
            </select> </div>
              <button
                className="homepageitem-button"
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