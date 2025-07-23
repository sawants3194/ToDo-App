import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

// Refactored currentTab function for class name instead of inline styles
const currentTab = (history, path) => {
  return history.location.pathname === path ? "active-tab" : "";
};

const Menu = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-dark fixed-top">
      <li className="nav-item">
        <Link className={`nav-link ${currentTab(history, "/")}`} to="/">
          Home
        </Link>
      </li>
      
      {isAuthenticated() && (
        <>
          <li className="nav-item">
            <Link className={`nav-link ${currentTab(history, "/taskscreen")}`} to="/taskscreen">
              Tasks
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${currentTab(history, "/add-task")}`} to="/add-task">
              Create Task
            </Link>
          </li>
        </>
      )}
      
      {!isAuthenticated() && (
        <>
          <li className="nav-item">
            <Link className={`nav-link ${currentTab(history, "/user/signup")}`} to="/user/signup">
              Signup
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${currentTab(history, "/user/signin")}`} to="/user/signin">
              Sign In
            </Link>
          </li>
        </>
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
