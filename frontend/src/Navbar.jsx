import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <span className="logo">Retail Reimagined</span>
        <button className="hamburger" onClick={toggleMenu}>
          &#9776;
        </button>
      </div>
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li><a href="/">Home</a></li>
        <li><a href="/solutions">Solutions</a></li>
        <li><a href="/ai-assist">AI Assistant</a></li>
        <li><a href="/ar-experience">AR/VR Experience</a></li>
        <li><a href="/insights">Customer Insights</a></li>
        <li><a href="/checkout">Smart Checkout</a></li>
        <li><Link to="/signin">Sign In</Link></li> 
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
