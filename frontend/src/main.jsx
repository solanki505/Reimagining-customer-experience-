import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import './style.css'; 
import HomePage from './Homepage.jsx';
import SignIn from './SignUp.jsx'; 
import Login from './Login.jsx';
import ThreeDPage from './ThreeDPage.jsx';
import ModelPage from './ModelPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/3d" element={<ThreeDPage />} />
        <Route path="/model/:uid" element={<ModelPage />} />
        {/* Add more routes like /signup, /solutions, etc. here */}
      </Routes>
    </HashRouter>
  </React.StrictMode> 
);