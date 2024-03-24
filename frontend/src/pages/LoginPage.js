import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from "react-router-dom";
import "../FuelQuoteForm.css";
import mainPageImage from '../img/yes.png';

const LoginPage = () => {

  let { loginUser } = useContext(AuthContext)
  return (
    <div className="login-container">
      <div className="login-image-section">
        <div className="image-text-content">
          <h2>Smart+</h2>
          <p>Discover Fuel Rates <br />with our great quote tool</p>
        </div>
        <img className="login-image" src={mainPageImage} alt="Start" />
      </div>
      <div className="login-form-section">
        <div className="login-form-content">
          <h1>Welcome to Smart+</h1>
          <p>New Here? <Link to="/register" className="text-success">Create Account</Link></p>

          <form onSubmit={loginUser}>
            <div className="login-form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="Enter username" required />
            </div>
            <div className="login-form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="Enter password" required />
            </div>
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
