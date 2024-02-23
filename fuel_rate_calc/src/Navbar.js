// Navbar.js
import React from 'react';
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    
    <nav>
        <header>
          <h1>Smart Fuel Rates</h1>
        </header>
      <ul>
        <li>
          <NavLink to="/"  className={({ isActive }) => isActive ? 'active' : undefined}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login"  className={({ isActive }) => isActive ? 'active' : undefined}>
            Login/Register
          </NavLink>
        </li>
        <li>
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
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
