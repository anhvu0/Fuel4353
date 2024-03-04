import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from "react-router-dom";
import "../FuelQuoteForm.css";

const Register = () => {
  const { registerUser } = useContext(AuthContext);


  return (
      <div className="form-container">
      <div className="title">
        <h2>Register</h2>
        <p>Let us help you!</p>
      </div>
        <form className="fuel-quote-form" onSubmit={registerUser}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" 
            name="username" 
            className="retrieve-address" placeholder="enter username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              className="retrieve-address"
              placeholder="*************"
              required
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
  );
};

export default Register;
