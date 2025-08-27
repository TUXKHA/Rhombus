// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from './UserContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, initialized } = useUser();

  // ✅ Wait until user context is fully initialized
  if (!initialized) return <div>Loading...</div>;

  // ❌ Not logged in
  if (!user) return <Navigate to="/" replace />;

  // ❌ Role not allowed
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // ✅ All good
  return children;
};

export default ProtectedRoute;
