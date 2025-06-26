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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your login logic or backend call here
    console.log("User logged in:", formData);
    alert("Login successful! (mock)");
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
