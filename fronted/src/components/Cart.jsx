import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/cart.css'; // Import the external CSS file

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('User not authenticated');
          setLoading(false);
          return;
        }

        const res = await axios.get('http://localhost:8000/cart', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200) {
          setCartItems(res.data);
        } else {
          setError('No cart data available');
        }

        setLoading(false);
      } catch (err) {
        if (err.response?.status === 401) {
          setError('Authentication failed: Invalid or expired token');
        } else {
          setError('Error fetching cart items');
        }
        setLoading(false);
        console.error(err);
      }
    };

    fetchCartItems();
  }, []);

  if (loading) {
    return <p className="loading-text">Loading...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div className="cart-item-container" key={item._id}>
            <p className="item-text">{item.productName}</p>
            <p className="quantity-text">Quantity: {item.quantity}</p>
            <p className="item-price">Price: ${item.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
