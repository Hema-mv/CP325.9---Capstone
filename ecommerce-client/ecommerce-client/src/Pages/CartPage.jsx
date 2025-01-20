import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/cart.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const options = Array.from({ length: 100 }, (_, i) => i + 1);
  const navigate = useNavigate();
  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    console.log('fetchCartItems', localStorage.getItem('cartItems'));
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    const groupedItems = items.reduce((acc, item) => {
      const existingItem = acc.find(i => i._id === item._id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        acc.push({ ...item });
      }
      return acc;
    }, []);
    setCartItems(groupedItems);
    console.log('fetchgroupedCartItems', groupedItems);
  };

  const handleQuantityChange = (index, newQuantity) => {
    const newCartItems = [...cartItems];
    alert(newQuantity)
    newCartItems[index].quantity = newQuantity;
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  const handleRemoveItem = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };
  const handleCheckout = () => {
    console.log('Proceeding to checkout with items:', cartItems);
    navigate('/checkout');
  };
  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h2>{item.name}</h2>
                <p>${item.price}</p>
                {/* <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                /> */}
<div>
<select id="quantity" value={item.quantity} 
            onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value))}> {options.map((option) => ( <option key={option} value={option}> {option} </option> ))} 
            </select> </div>
                <button onClick={() => handleRemoveItem(index)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty</p>
      )}
      <div className="cart-total">
        <h2>Total: ${calculateTotal()}</h2>
      </div>
      <button className="checkout-button" onClick={handleCheckout} >
        Checkout
      </button>
    </div>
    
  );
};

export default CartPage;
