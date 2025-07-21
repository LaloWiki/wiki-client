import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');

  // Si no hay token para redirigir a login 
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  

  return children; 
}

export default PrivateRoute;
