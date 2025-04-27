import './App.css'
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer'
import Header from './Components/Header'
import Cards from './Components/Cards'
import Register from './Components/Register';
import Login from './Components/Login';
import Cart from './Components/Cart';
import {useEffect, useState } from 'react';

function App() {
const [isAuthenticated, setIsAuthenticated] = useState(false); // user state
const [username, setUsername] = useState(""); // Username state

useEffect(() => {
  const storedAuth = localStorage.getItem("isAuthenticated") === "true";
  const storedUsername = localStorage.getItem("username");

  if (storedAuth && storedUsername) {
    setIsAuthenticated(true);
    setUsername(storedUsername);
  }
}, []);

  return (
    <>
      <BrowserRouter>
        <Header isAuthenticated={isAuthenticated} username={username} setIsAuthenticated={setIsAuthenticated} />
        <div className="container">
          <Routes>
            <Route path="/" element={<Cards />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/register" element={<Register />} ></Route>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} />}></Route>
          </Routes>
        </div>
        
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
