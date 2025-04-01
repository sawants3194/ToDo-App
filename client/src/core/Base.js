import React from "react";
import Menu from "./Menu";
import "../styles.css";

const Base = ({
  title = "My title Production build",
  description = "My description",
  className = "bg-dark text-white p-4",
  children,
}) => {
  return (
    <div>
      <Menu />
      <div className="container-fluid">
        {/* Jumbotron Section */}
        <div className="jumbotron bg-dark text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        
        {/* Main Content Area */}
        <div className={className}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Base;
