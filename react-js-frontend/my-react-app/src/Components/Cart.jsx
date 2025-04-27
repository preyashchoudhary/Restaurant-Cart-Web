// Cart.jsx
import React, { useEffect, useState } from 'react';
import { getCart, removeCart } from '../Services/ItemsService';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState('');
  const userId = localStorage.getItem('userId');
  const navigator = useNavigate(); // Assuming you have useNavigate imported

  useEffect(() => {
    if (userId) {
      fetchCartItems();
    } else {
      setMessage('Please login to view your cart.');
    }
  }, [userId]);

  const fetchCartItems = async () => {
    try {
      const response = await getCart(userId);
      setCartItems(response.data || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setMessage('Failed to load cart items.');
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await removeCart(userId, itemId);
      setMessage('Item removed from cart.');
      setTimeout(() => setMessage(''), 1000); 
      fetchCartItems(); // refresh cart after removal
    } catch (error) {
      console.error('Error removing item:', error);
      setMessage('Failed to remove item.');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.item.price * item.quantity, 0);
  };

  return (

<div className="container-lg my-5 min-vh-100">
  <h2 className="text-center mb-4">Your Cart</h2>
  <button className="btn btn-success text-end" onClick={() => navigator('/')}>Back to Home</button>
  {message && <p className="alert alert-info">{message}</p>}

  {cartItems.length === 0 ? (
    <p className="text-center">Your cart is empty.</p>
  ) : (
    <>
      <table className="table table-bordered table-hover text-center align-middle">
        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price (₹)</th>
            <th>Total (₹)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((itemWrapper, index) => (
            <tr key={index}>
              <td>
                <img
                  src={itemWrapper.item.image}
                  alt={itemWrapper.item.name}
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  className="rounded"
                />
              </td>
              <td>{itemWrapper.item.name}</td>
              <td>{itemWrapper.quantity}</td>
              <td>{itemWrapper.item.price}</td>
              <td>{itemWrapper.item.price * itemWrapper.quantity}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleRemove(itemWrapper.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-end">
        <h4>Total Amount: ₹{calculateTotal()}</h4>
        <button className="btn btn-success">Make Payment</button>
      </div>
    </>
  )}
</div>

  );
};

export default Cart;
