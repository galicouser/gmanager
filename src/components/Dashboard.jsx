import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const navigate = useNavigate();
  
  const user = localStorage.getItem("email") || "User"; // Get email or username from localStorage
  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    localStorage.removeItem("email"); // Optionally, remove email or username
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Top Navbar */}
        <nav className="col-12 navbar navbar-expand-lg navbar-light bg-light">
          <div className="d-flex justify-content-between w-100">
            <span className="navbar-brand">Welcome, {user}</span>
            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </div>
        </nav>

        {/* Main Dashboard Content */}
        <div className="col-12 mt-4">
          <h2>Dashboard</h2>
          <p>Welcome to the Dashboard</p>
          
          {/* Dummy Buttons */}
          <div className="row">
            <div className="col-md-1 mb-3">
              <button className="btn btn-primary btn-block w-100">
                Goto Mexc
              </button>
            </div>
            {/* <div className="col-md-4 mb-3">
              <button className="btn btn-success btn-block w-100">
                Settings
              </button>
            </div>
            <div className="col-md-4 mb-3">
              <button className="btn btn-warning btn-block w-100">
                Notifications
              </button>
            </div> */}
          </div>

          {/* More Content */}
          {/* <div className="mt-4">
            <h3>Additional Information</h3>
            <p>Here you can add more content about the user dashboard.</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
