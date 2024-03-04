// Footer.js
import React from 'react';
import '../FuelQuoteForm.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <span>© {new Date().getFullYear()} CS4353 - Group 52. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
