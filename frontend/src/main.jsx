import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import './style.css'; 
import HomePage from './Homepage.jsx';
import SignIn from './SignUp.jsx'; 
import Login from './Login.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} /> 
        <Route path="/login" element={<Login />} /> {/* 👈 SignIn route */}
        {/* Add more routes like /signup, /solutions, etc. here */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode> 
);