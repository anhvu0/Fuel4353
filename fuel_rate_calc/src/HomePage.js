import React from 'react';
import './FuelQuoteForm.css';
import mainPageImage from './img/mainpage.jpg';
import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <header>
        <h2>Welcome to Our Service</h2>
      </header>
      <main>
        <img src={mainPageImage} alt="Gas Station at Night" className="responsive-image" />
      </main>
      <h1>Smart Fuel Rates</h1>
  <nav>
    <ul>
      <li>
        <NavLink to="/"  className={({ isActive }) => isActive ? 'active' : undefined}>
          Home
        </NavLink>
      </li>
      <li>
        {/*<a href="/login">Login/Register</a>*/}
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
      <NavLink to="/customer-profile" className={({ isActive }) => isActive ? 'active' : undefined}>
        Customer Profile will be handled after logging in
      </NavLink>
      </li>
    </ul>
  </nav>
    </div>
  );
};

export default HomePage;
