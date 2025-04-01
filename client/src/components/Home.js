import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
const Base = lazy(() => import("../core/Base"));

const Home = () => {
  const containerStyle = {
    textAlign: 'center',
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const headingStyle = {
    color: '#333',
    fontSize: '2rem',
    marginBottom: '20px',
  };

  const paragraphStyle = {
    color: '#555',
    fontSize: '1rem',
    marginBottom: '15px',
  };

  const linkStyle = {
    color: '#4CAF50',
    textDecoration: 'none',
    fontWeight: 'bold',
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Base>
        <div style={containerStyle}>
          <h2 style={headingStyle}>Welcome to the Siddhesh Todo App!</h2>
          <p style={paragraphStyle}>This is the home page of the Todo App.</p>
          <p style={paragraphStyle}>
            If you don't have an account, Please{' '}
            <Link to="/user/signup" style={linkStyle}>
              Sign up
            </Link>{' '}
            here.
          </p>
          <p style={paragraphStyle}>
            Already have an account?{' '}
            <Link to="/user/signin" style={linkStyle}>
              Login
            </Link>{' '}
            here.
          </p>
        </div>
      </Base>
    </Suspense>
  );
};

export default Home;
