import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token || !allowedRoles.includes(role)) {
    // If the user doesn't have the right role, redirect to a default page (e.g., login or dashboard)
    return <Navigate to="/" />;
  }

  // If the user has the correct role, render the children (protected route)
  return children;
};

export default ProtectedRoute;
