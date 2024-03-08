import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from "react-router-dom";
import "../FuelQuoteForm.css";
import mainPageImage from '../img/mainpage.jpg';

const LoginPage = () => {

  let {loginUser} = useContext(AuthContext)
  return (
    <div className="form-container">
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
};

export default LoginPage;
