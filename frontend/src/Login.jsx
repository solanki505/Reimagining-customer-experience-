import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css"; 
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Login successful!");
      redirect("/");
    } else {
      const errorData = await response.json();
      alert(errorData.message || "Login failed!");
    }
  } catch (error) {
    alert("An error occurred. Please try again.");
  }
};


  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign In</button>

        <p className="signup-link">
          Don’t have an account? <Link to="/signin">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
