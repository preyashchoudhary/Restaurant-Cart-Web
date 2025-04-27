import React, { useState } from "react";
import { login } from '../Services/ItemsService';
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated, setUsername }) => {
  const navigator = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = "Username is required";
    } 
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await login(formData.username, formData.password);
        setMessage("Login successful!");
        console.log("Response:", response.data);
        if (response.status === 200) {
          //localStorage.setItem("token", response.data.token);
          setIsAuthenticated(true); // Update authentication state
          setUsername(formData.username); // Pass username to App
        
          console.log("User ID:", response.data.id);
          console.log(typeof response.data.id);
          const userId = localStorage.setItem('userId', response.data.id);
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("username", formData.username);
          navigator('/');

        }
      } catch (error) {
        setMessage("Login failed. Please check your credentials.");
        console.error("Error:", error.response?.data || error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2 className="form-title">Login</h2>
      {message && <p className="message">{message}</p>}
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          className={`form-control ${errors.username ? "is-invalid" : ""}`}
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <small className="text-danger">{errors.username}</small>}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <small className="text-danger">{errors.password}</small>}
      </div>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
};

export default Login;
