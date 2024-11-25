import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login.js';
import Signup from './components/auth/Signup.js';
import Dashboard from './components/dashboard/Dashboard.js';
import PrivateRoute from './components/private/PrivateRoute.js';

function App() {
  return (
    <Router>
      <Routes>
        {/* Automatically redirect from "/" to "/login" */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protect the dashboard route with PrivateRoute */}
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
      </Routes>
    </Router>
  );
}

export default App;
