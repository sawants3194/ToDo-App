import React from 'react';
import { Link } from 'react-router-dom';
import Base from '../core/Base';

const Home = () => {
  return (
    <Base>
    <div>
      <h2>Welcome to the Siddhesh Todo App!</h2>
      <p>This is the home page of the Todo App.</p>
      <p>
        If you don't have an account, Please<Link to="/user/signup">Sign up</Link> here.
      </p>
      <p> 
        Already have an account? <Link to="/user/signin">Login</Link> here.
      </p>
    </div>
    </Base>
  );
};

export default Home;
