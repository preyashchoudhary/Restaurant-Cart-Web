import React, { useState } from 'react';
import { register } from '../Services/ItemsService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigator = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await register(formData.username, formData.email, formData.password);
        setMessage('Registration successful!');
        console.log('Response:', response.data);
      if(response.status == 200) {
        navigator('/login');
      }
      } catch (error) {
        setMessage('Registration failed, User Already Registered!');
        console.error('Error:', error.response?.data || error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2 className="form-title">Register</h2>
      {message && <p className="message">{message}</p>}
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          className={`form-control ${errors.username ? 'is-invalid' : ''}`}
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <small className="text-danger">{errors.username}</small>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <small className="text-danger">{errors.email}</small>}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <small className="text-danger">{errors.password}</small>}
      </div>
      <button type="submit" className="btn btn-primary">Register</button>
    </form>
  );
};

export default Register;
