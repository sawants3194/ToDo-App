import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import '../styles.css';
import { signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: "", [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch((error) => console.log("signin request failed", error));
  };

  const performRedirect = () => {
    if (didRedirect || isAuthenticated()) {
      return <Redirect to="/taskscreen" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      error && (
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <div className="alert alert-danger">{error}</div>
          </div>
        </div>
      )
    );
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                onChange={handleChange("email")}
                value={email}
                className="form-control"
                type="email"
                required
                style={{ color: '#333', backgroundColor: '#f8f9fa' }} // Styling for text visibility
              />
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                value={password}
                className="form-control"
                type="password"
                required
                style={{ color: '#333', backgroundColor: '#f8f9fa' }} // Styling for text visibility
              />
            </div>
            <button
              onClick={onSubmit}
              className="btn btn-success btn-block"
              disabled={loading} // Disable the button during loading
            >
              Submit
            </button>
          </form>
          <Link className="nav-link offset-sm-3 text-right" to="/user/recover">
            Forgot Password?
          </Link>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign In page" description="A page for user to sign in!">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
    </Base>
  );
};

export default Signin;
