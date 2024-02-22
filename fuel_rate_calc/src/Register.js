import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./FuelQuoteForm.css";

const Register = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    // Handle registration logic
  };

  return (
    <div>
      <div className="title">
        <h2>Register</h2>
        <p>Let us help you!</p>
      </div>
      <div className="form-container">
        <form className="fuel-quote-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" className="retrieve-address" placeholder="enter username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="retrieve-address"
              value={password}
              onChange={handlePasswordChange}
              placeholder="*************"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              className="retrieve-address"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="************"
            />
          </div>
          <button type="submit">Register</button>
          <div className="button-container">
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button type="button" className="button-back_to_login">
                Back to Login
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
