// frontend/src/components/Auth/PrivateRoute.js

import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, roles, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  console.log(privateRoute)

  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? (
          roles && !roles.includes(userRole) ? (
            <Navigate to="/unauthorized" replace />
          ) : (
            <Component />
          )
        ) : (
          <Navigate to="/login" replace state={{ from: rest.location }} />
        )
      }
    />
  );
};

export default PrivateRoute;