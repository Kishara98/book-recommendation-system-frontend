import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div style={{ textAlign: 'center' }}>
    <h1>Welcome!</h1>
    <p>
      <Link to="/login">Login</Link> or <Link to="/signup">Sign up</Link> to continue.
    </p>
  </div>
);

export default Home;
