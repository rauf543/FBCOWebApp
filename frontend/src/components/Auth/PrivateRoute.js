// frontend/src/components/Auth/PrivateRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { verifyToken } from '../../services/authService';

const PrivateRoute = ({ allowedRoles }) => {
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

  if (isLoading) {
    // Display a loading state while verifying the token
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // If user is not authenticated, redirect to the login page
    return <Navigate to="/" replace />;
  }

  // If authenticated, render the child components
  return <Outlet />;
};

export default PrivateRoute;