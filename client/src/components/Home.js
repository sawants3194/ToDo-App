import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Home = () => {
  return (
    <div>
      <Navbar/>
      <h2>Welcome to the Todo App!</h2>
      <p>This is the home page of the Todo App.</p>
      <p>
        If you don't have an account, <Link to="/signup">Sign up</Link> here.
      </p>
      <p> 
        Already have an account? <Link to="/login">Login</Link> here.
      </p>
    </div>
  );
};

export default Home;
