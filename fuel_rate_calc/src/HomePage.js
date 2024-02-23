import React from 'react';
import './FuelQuoteForm.css';
import mainPageImage from './img/mainpage.jpg';

const HomePage = () => {
  return (
    <div>
      <main>
        <img src={mainPageImage} alt="Gas Station at Night" className="responsive-image" />
      </main>
    </div>
  );
};

export default HomePage;
