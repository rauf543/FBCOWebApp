// frontend/src/components/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Auth/Login';
import Registration from './Auth/Registration';
import StockDashboard from './StockManagement/StockDashboard';

const App = () => {
    return (
        <Router>
            <div className="app">
                <nav>
                    <ul>
                        <li><a href="/">Login</a></li>
                        <li><a href="/register">Registration</a></li>
                        <li><a href="/stock-management">Stock Management</a></li>
                    </ul>
                </nav>

                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/stock-management" element={<StockDashboard />} />
                </Routes>

                <footer>
                    <p>&copy; 2023 Dessert Stock Management. All rights reserved.</p>
                </footer>
            </div>
        </Router>
    );
};

export default App;