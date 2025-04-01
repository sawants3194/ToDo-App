import React, { lazy, Suspense, useState } from "react";
import { signup } from "../auth/helper/index";
import { Link } from "react-router-dom";
// import "../styles.css"
const Base = lazy(() => import("../core/Base"));

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: "",
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, success: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  const successMessage = () => (
    <div className="alert alert-success" style={{ display: success ? "" : "none" }}>
      SignUp Successful. Please <Link to="/user/signin">Login Here</Link>
    </div>
  );

  const errorMessage = () => (
    <div className="alert alert-warning" style={{ display: error ? "" : "none" }}>
      {error}
    </div>
  );

  const SignUpForm = () => (
    <div className="signup-container">
      <div className="signup-form">
        <form onSubmit={onSubmit}>
          <h2 className="form-title">Create Account</h2>
          <div className="form-group">
            <label>Name</label>
            <input
              onChange={handleChange("name")}
              value={name}
              className="form-control"
              type="text"
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              onChange={handleChange("email")}
              value={email}
              className="form-control"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              onChange={handleChange("password")}
              value={password}
              className="form-control"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="btn btn-success btn-block">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Base title="SignUp Page">
        {SignUpForm()}
        {successMessage()}
        {errorMessage()}
      </Base>
    </Suspense>
  );
};

export default Signup;
