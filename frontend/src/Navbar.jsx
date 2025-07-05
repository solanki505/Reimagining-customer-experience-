import React, { useState, useEffect } from "react";
import "./style.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(sessionStorage.getItem("isLoggedIn") === "true");
    // Optionally, add a storage event listener for multi-tab sync
    const handleStorage = () => {
      setIsLoggedIn(sessionStorage.getItem("isLoggedIn") === "true");
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);
  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLogout = async() => {
    sessionStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    const response=await fetch("http://localhost:8000/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
    window.location.href = "/signin";
  };
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
        {isLoggedIn && (
          <>
            <li><a href="/ai-assist">AI Assistant</a></li>
            <li><a href="/ar-experience">AR/VR Experience</a></li>
            <li><a href="/insights">Customer Insights</a></li>
            <li><a href="/checkout">Smart Checkout</a></li>
          </>
        )}
        {!isLoggedIn ? (
          <li><Link to="/signin">Sign In</Link></li>
        ) : (
          <li>
            <button
              onClick={handleLogout}
              style={{ background: "none", border: "none", color: "inherit", cursor: "pointer" }}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
