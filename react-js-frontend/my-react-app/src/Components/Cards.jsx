import React, { useEffect, useState } from 'react';
import { listItems, addCart } from '../Services/ItemsService';
import { useNavigate } from 'react-router-dom';

const Cards = () => {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

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
      return;
    }
    try {
      const response = await addCart(Number.parseInt(userId), item.id, 1);
      setMessage('Item added to cart successfully!');
      setTimeout(() => {
        setMessage('');
      }, 1000);
      console.log('Item added to cart:', item);
      console.log('AddCart Response:', response.data);
    } catch (error) {
      setMessage('Failed to add item to cart!');
      console.error('AddCart Error:', error.response?.data || error.message);
    }
  };

  // Filter items based on search input
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-lg">
      <h2 className="text-center">Menu Items</h2>

      {/* Search input */}
      <div className="mb-4 d-flex justify-content-center">
        <input
          type="text"
          className="form-control"
          placeholder="Search items by name... "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            maxWidth: '400px',
            borderRadius: '25px',
            boxShadow: '0 0 5px rgba(0,0,0,0.1)',
            paddingTop: '10px',
            border: '2px solid #e100ff',
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingBottom: '10px',
          }}
        />
      </div>

      {message && <p className="alert alert-info">{message}</p>}

      <div className="card-container">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
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
                  style={{ width: '100%' }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No items match your search.</p>
        )}
      </div>
    </div>
  );
};

export default Cards;
