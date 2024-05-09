// frontend/src/components/Auth/PrivateRoute.js

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { verifyToken } from '../../services/authService'; // Adjust the import path as needed

const PrivateRoute = ({ roles }) => {
  const isAuthenticated = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  console.log(userRole)
  //console.log(roles)
  // Check if user is not authenticated
  const data = verifyToken()
  console.log(data)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if the user's role matches any of the roles required for this route
  if (roles && !roles.includes(userRole)) {
    // If user's role is not authorized, redirect to an unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }

  // If authenticated and authorized, render the child components
  return <Outlet />;
  
};

export default PrivateRoute;