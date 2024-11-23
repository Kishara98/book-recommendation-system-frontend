// src/components/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';  // Assuming you're using axios for API requests

const Dashboard = () => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = async () => {
    try {
      // Send a request to the backend to log out the user
      const response = await axios.post('/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.authToken}`, // Send token in Authorization header
        }
      });
      console.log(response, 'response>>');
      // If the logout is successful, clear the JWT token
      localStorage.removeItem('authToken');
      
      // Redirect to the login page after logging out
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error.message);
      alert('An error occurred while logging out.');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Welcome to your Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
