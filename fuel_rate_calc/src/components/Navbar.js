// Navbar.js
import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import '../FuelQuoteForm.css'; 
import { NavLink } from "react-router-dom";

function Navbar() {
  let { user, logoutUser } = useContext(AuthContext)
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/"  className={({ isActive }) => isActive ? 'active' : undefined}>
            Home
          </NavLink>
        </li>
        <li>
        {user ? (
             <NavLink onClick={logoutUser}>Logout</NavLink>
          ) : (
          <NavLink to="/login"  className={({ isActive }) => isActive ? 'active' : undefined}>
            Login
          </NavLink>)}
        </li>
        {/*<li>
          <NavLink to="/fuel-quote-form" className={({ isActive }) => isActive ? 'active' : undefined}>
            Fuel Quote Form
          </NavLink>
        </li>
        <li>
          <NavLink to="/fuel-quote-history" className={({ isActive }) => isActive ? 'active' : undefined}>
            Quote History
          </NavLink>
        </li>
        <li>
          <NavLink to="/customer-profile"  className={({ isActive }) => isActive ? 'active' : undefined}>
            Profile (after login)
          </NavLink>
        </li>*/}
      </ul>
    </nav>
  );
}

export default Navbar;
