import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../context/authStore";

export default function ProtectedRoute({ children }) {
 
  const initialized = useAuthStore((s) => s.initialized);
  const token = useAuthStore((s) => s.token);

  
  if (!initialized) return <div className="p-6 text-gray-600">Loading...</div>;

  if (!token) return <Navigate to="/signin" replace />;

  return children;
}
