// Header.js
import React from 'react';
import '../FuelQuoteForm.css'; 

function Header() {
  return (
    <header>
      <h1>Smart Fuel Rates</h1>
      </header>
  );
}

export default Header;
{/*import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import '../FuelQuoteForm.css'; 

const Header = () => {
  let { user, logoutUser } = useContext(AuthContext)
  return (
      <div>
          <Link to="/">Home</Link>
          <span> | </span>
          {user ? (
              <p onClick={logoutUser}>Logout</p>
          ) : (
              <Link to="/login" >Login</Link>
          )}
          {user && <p>Hello {user.username}!</p>}

      </div>
  )
}

export default Header*/}