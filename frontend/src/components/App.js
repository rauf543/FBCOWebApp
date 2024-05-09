// frontend/src/components/App.js

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link, Outlet, useNavigate  } from 'react-router-dom';
import Login from './Auth/Login';
import Registration from './Auth/Registration';
import StockDashboard from './StockManagement/StockDashboard';
import { logout } from '../services/authService';
import { verifyToken } from '../services/authService';


const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const data = await verifyToken(token);
          if (data.isValid) {
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Error verifying token:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, []);

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    console.log('hi')
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            {!isAuthenticated && (
              <>
                <li>
                  <Link to="/">Login</Link>
                </li>
                <li>
                  <Link to="/register">Registration</Link>
                </li>
              </>
            )}
            {isAuthenticated && (
              <>
                <li>
                  <Link to="/stock-management">Stock Management</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/stock-management" /> : <Login />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/stock-management" /> : <Registration />} />
          <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
          <Route path="/stock-management" element={isAuthenticated ? < StockDashboard/> : <  Navigate to="/"  />} />
        </Routes>

        <footer>
          <p>&copy; 2023 Dessert Stock Management. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;