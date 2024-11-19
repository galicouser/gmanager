import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

// ProtectedRoute component to check if the user is authenticated
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check token in localStorage

  if (!token) {
    return <Navigate to="/" />; // Redirect to login if not authenticated
  }

  return children;
};

// Component to prevent logged-in users from accessing login/register pages
const PreventAuthRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    return <Navigate to="/dashboard" />; // Redirect to dashboard if already logged in
  }

  return children;
};

const App = () => {
  return (
    <div>
      <Routes>
        {/* If user is logged in, they cannot access Login/Register pages */}
        <Route 
          path="/" 
          element={
            <PreventAuthRoute>
              <Login />
            </PreventAuthRoute>
          } 
        />
        
        <Route 
          path="/register" 
          element={
            <PreventAuthRoute>
              <Register />
            </PreventAuthRoute>
          } 
        />
        
        {/* Protected Route for Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* Add other routes here if needed */}
      </Routes>
    </div>
  );
};

export default App;
