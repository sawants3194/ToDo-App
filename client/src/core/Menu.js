import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-dark">
      <li className="nav-item">
        <Link style={currentTab(history, "/")} className="nav-link" to="/">
          Home
        </Link>
      </li>
      
      
      {isAuthenticated() && (
        <li className="nav-item">
        <Link
          style={currentTab(history, "/taskscreen")}
          className="nav-link"
          to="/taskscreen"
        >
          Tasks
        </Link>
      </li>
      )}

{isAuthenticated() && (
        <li className="nav-item">
        <Link
          style={currentTab(history, "/add-task")}
          className="nav-link"
          to="/add-task"
        >
          Create Task
        </Link>
      </li>
      )}
      
      {!isAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/user/signup")}
              className="nav-link"
              to="/user/signup"
            >
              Signup
            </Link>
          </li>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/user/signin")}
              className="nav-link"
              to="/user/signin"
            >
              Sign In
            </Link>
          </li>
        </Fragment>
      )}
      {isAuthenticated() && (
        <li className="nav-item">
          <span
            className="nav-link text-warning"
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Signout
          </span>
        </li>
      )}     
    </ul>
  </div>
);

export default withRouter(Menu);
