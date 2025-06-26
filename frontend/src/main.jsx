import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Navbar from './Navbar.jsx';
import './style.css'; 
import HomePage from './Homepage.jsx';"./Homepage.jsx";
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="page-wrapper">
      <Navbar />
      <main className="content">
        <HomePage /> 
      </main>
    </div>
  </React.StrictMode>
  
);