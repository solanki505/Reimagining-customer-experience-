import React, { useState, useEffect } from "react";
import "./style.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    setIsLoggedIn(sessionStorage.getItem("isLoggedIn") === "true");
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
    // Optionally, add a storage event listener for multi-tab sync
    const handleStorage = () => {
      setIsLoggedIn(sessionStorage.getItem("isLoggedIn") === "true");
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };
  
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
          <>
            <li><Link to="/signin">Sign In</Link></li>
            <li className="theme-toggle-container">
              <label className="theme-toggle-switch">
                <input 
                  type="checkbox" 
                  checked={isDarkMode} 
                  onChange={toggleTheme}
                  aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                />
                <span className="slider">
                  <span className="slider-icon">{isDarkMode ? "🌙" : "☀️"}</span>
                </span>
              </label>
            </li>
          </>
        ) : (
          <>
            <li>
              <button
                onClick={handleLogout}
                className="logout-btn"
              >
                Logout
              </button>
            </li>
            <li className="theme-toggle-container">
              <label className="theme-toggle-switch">
                <input 
                  type="checkbox" 
                  checked={isDarkMode} 
                  onChange={toggleTheme}
                  aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                />
                <span className="slider">
                  <span className="slider-icon">{isDarkMode ? "🌙" : "☀️"}</span>
                </span>
              </label>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
