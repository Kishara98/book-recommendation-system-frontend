// src/components/Signup.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../axios.js'; // Import your axios instance
import '../../css/auth/Signup.css'; // Import the shared CSS file for styling

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/auth/signup', { 
        email, 
        password, 
        userName
      });

      // On successful signup, redirect to the login page
      console.log('Signup successful:', response.data);
      navigate('/login');
    } catch (err) {
      setError('Signup failed! Please try again.');
      console.error('Error during signup:', err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">📚 Join Book Haven</h2>
        <p className="login-subtitle">Start your journey of discovering and recommending amazing books!</p>
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleSignup} className="login-form">
          <div className="login-input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="login-input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
            />
          </div>
          <div className="login-input-group">
            <label>Username</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Choose a username"
              required
            />
          </div>
          <button type="submit" className="login-button">Sign Up</button>
        </form>
        <p className="login-footer">
          Already have an account? <Link to="/login" className="login-link">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
