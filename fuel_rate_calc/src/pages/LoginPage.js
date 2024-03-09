import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from "react-router-dom";
import "../FuelQuoteForm.css";
import mainPageImage from '../img/winner.png';

const LoginPage = () => {

  let {loginUser} = useContext(AuthContext)
  return (
    <div className="login-container">
    <div className="login-image-section">
      <div className="image-text-content">
        <h2>Smart+</h2>
        <p>Discover Fuel Rates <br/>with great quote tools</p>
      </div>
      <img className="login-image" src={mainPageImage} alt="Start" />
    </div>
    <div className="login-form-section">
      <div className="login-form-content">
        <h1>Welcome to Smart+</h1>
        <p>New Here? <Link to="/register">Create Account</Link></p>
    
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


    /*<div className="form-container">
      <div className="two-column-layout">
        
        <div className="form-column">
          <div className="title">
            <h2>Log in</h2>
          </div>
          <form className="fuel-quote-form" onSubmit={loginUser}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input type="text" name="username" placeholder="Enter username" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" placeholder="Enter password" />
            </div>

            <div className="button-container">
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <button type="button" className="button-cancel">
                  Register
                </button>
              </Link>
              <button type="submit" className="button-login">
                Log in
              </button>
            </div>
          </form>
        </div>
        <div className="image-column">
          <img src={mainPageImage} alt="Image" />
        </div>
      </div>
    </div>
     
  );
};*/

export default LoginPage;
