// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('authToken');  // Check if the user is authenticated

  // If not authenticated, redirect to login; otherwise, render the element
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
