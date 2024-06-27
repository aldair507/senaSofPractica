import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAdmin } from '../hooks/context/AdminContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAdmin();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user?.rol_idrol)) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
