import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Orders.css'; // Importing the CSS file

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('Pending');
  const [orderStatus, setOrderStatus] = useState('Pending');
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:8000/orders', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get('http://localhost:8000/cart', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setCart(res.data);
        calculateTotalPrice(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCart();
  }, []);

  const calculateTotalPrice = (cart) => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const placeOrder = async () => {
    // Validate stock availability
    const outOfStockItems = [];
    for (const item of cart) {
      const res = await axios.get(`http://localhost:8000/products/${item.productId}`);
      if (res.data.stock < item.quantity) {
        outOfStockItems.push(item.productId);
      }
    }

    if (outOfStockItems.length > 0) {
      alert('Some items are out of stock!');
      return;
    }

    try {
      const userId = localStorage.getItem('userId');
      const orderData = {
        userId,
        products: cart.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice,
        shippingAddress,
        paymentStatus,
        orderStatus,
      };

      const res = await axios.post('http://localhost:8000/orders', orderData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      await axios.delete('http://localhost:8000/cart', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      alert('Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      console.error(err);
      alert('Failed to place order!');
    }
  };

  return (
    <div className="orders-container">
      <h2 className="orders-title">Orders</h2>
      <div className="order-form">
        <label>Shipping Address</label>
        <input
          type="text"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          required
        />
        <button onClick={placeOrder}>Place Order</button>
      </div>
      {orders.map((order) => (
        <div key={order._id} className="order-item">
          <p className="order-text">Total Price: ${order.totalPrice}</p>
          <p className="order-text">Shipping Address: {order.shippingAddress}</p>
          <p className={`order-status ${order.orderStatus.toLowerCase()}`}>Status: {order.orderStatus}</p>
        </div>
      ))}
    </div>
  );
};

export default Orders;
