import React from "react";
import { Link } from "react-router-dom";
import "./FuelQuoteForm.css";

const Login = () => {
  return (
    <div>
      <div className="title">
        <h2>Login</h2>
      </div>
      <div className="form-container">
        <form className="fuel-quote-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" className="form-control" />
          </div>

          <div className="button-container">
            <button type="submit" className="button-login">
              Login
            </button>
          </div>
          <div className="button-container">
            <Link to="/register" style={{ textDecoration: "none" }}>
              <button type="button" className="button-register">
                Register
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
