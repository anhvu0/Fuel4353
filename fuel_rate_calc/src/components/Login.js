import React, { useState } from 'react'
import {useNavigate, Link } from "react-router-dom";
import "../FuelQuoteForm.css";

const Login = (props) => {
  const [userName, setuserName] = useState('')
  const [password, setPassword] = useState('')
  const [userNameError, setuserNameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  const onButtonClick = () => {

    setuserNameError('')
    setPasswordError('')

    if ('' === userName) {
      setuserNameError('Please enter your user name')
      return
    }
  
    if (userName.length < 3) {
      setuserNameError('Username must be 4 characters or more')
      return
    }
  
    if ('' === password) {
      setPasswordError('Please enter a password')
      return
    }
  
    if (password.length < 7) {
      setPasswordError('The password must be 8 characters or longer')
      return
    }
  }

  return (
      <div className="form-container">
      <div className="title">
        <h2>Welcome Back!</h2>
        <p>Hello again! Please enter your details</p>
      </div>
        <form className="fuel-quote-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input 
            value={userName} 
            type="text" 
            id="username" 
            className="form-control" 
            placeholder="enter username"
            onChange={(ev) => setuserName(ev.target.value)} />
            <label className="errorLabel">{userNameError}</label>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input 
            value={password}
            type="password" 
            id="password" 
            className="form-control" 
            placeholder="**********"
            onChange={(ev) => setPassword(ev.target.value)}
            />
            <label className="errorLabel">{passwordError}</label>
          </div>

          <div className="button-container">
            <input type="button" className="inputButton" 
              onClick={onButtonClick} value={'Log in'} />
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
  );
};

export default Login;
