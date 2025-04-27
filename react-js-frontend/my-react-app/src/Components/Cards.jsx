import React, { useEffect, useState } from 'react';
import { listItems, addCart } from '../Services/ItemsService';
import { useNavigate } from 'react-router-dom';

const Cards = () => {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // assuming userId is saved after login

  useEffect(() => {
    getAllItems();
  }, []);

  const getAllItems = async () => {
    try {
      const response = await listItems();
      if (response && response.data) {
        setItems(response.data);
        console.log('Items fetched:', response.data);
      } else {
        console.error('Invalid response structure:', response);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleAddCart = async (item) => {
    if (!userId) {
      setMessage('Please login to add items to cart.');
      navigate('/login');   
      setMessage('Please login to add items to cart.');       
      return;
    }
    try {
      console.log('Adding item to cart:', item);
      console.log('User ID:', userId);
      console.log(typeof Number.parseInt(userId));
      const response = await addCart(Number.parseInt(userId), item.id, 1);
      setMessage('Item added to cart successfully!');
      
      setTimeout(() => {
        setMessage('');
      }, 1000); // Clear message after 1 seconds
    

      console.log('Item added to cart:', item);
      console.log('AddCart Response:', response.data);
      // if (response.status === 200) {
      //   navigate('/cart');
      // }
    } catch (error) {
      setMessage('Failed to add item to cart!');
      console.error('AddCart Error:', error.response?.data || error.message);
    }
  };

  return (
    <div className="container-lg">
      <h2 className="text-center">Menu Items</h2>
      {message && <p className="alert alert-info">{message}</p>}
      <div className="card-container">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="card">
              <img src={item.image} alt={item.name} className="card-image" />
              <div className="card-content">
                <h3>
                  {item.name} <span className="price">₹{item.price}</span>
                </h3>
                <p>{item.description}</p>
                <button
                  onClick={() => handleAddCart(item)}
                  type="button"
                  className="btn btn-dark"
                  style={{ width: '100%' }}>Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No items available</p>
        )}
      </div>
    </div>
  );
};

export default Cards;