// Navbar.js
import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import '../FuelQuoteForm.css'; 
import { NavLink } from "react-router-dom";
function Navbar() {
  let { user, logoutUser } = useContext(AuthContext);

  const handleLogout = (e) => {
    e.preventDefault(); // Prevent default link behavior
    logoutUser(); // Call the logout function
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : undefined}>
            Home
          </NavLink>
        </li>
        {user && (
          <li>
            <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : undefined}>
              Profile
            </NavLink>
          </li>
        )}
        <li>
          {user ? (
            <a href="/login" onClick={handleLogout}>Log out</a>
          ) : (
            <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : undefined}>
              Log in
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;