// frontend/src/components/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link, Outlet } from 'react-router-dom';
import Login from './Auth/Login';
import Registration from './Auth/Registration';
import StockDashboard from './StockManagement/StockDashboard';
import { logout } from '../services/authService';
import PrivateRoute from './Auth/PrivateRoute'

const App = () => {
  const isAuthenticated = localStorage.getItem('token');

  const handleLogout = () => {
    logout();
    // Redirect to the login page after logout
    window.location.href = '/';
  };

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
          <Route path="/stock-management" element={<PrivateRoute roles={['manager']} />}>
            <Route path="" element={<StockDashboard />} />
          </Route>
        </Routes>

        <footer>
          <p>&copy; 2023 Dessert Stock Management. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;