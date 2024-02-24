import React, { useState } from 'react';
import './FuelQuoteForm.css';

const FuelQuoteForm = () => {
  // State variables to store form data
  const [gallonsRequested, setGallonsRequested] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [suggestedPrice, setSuggestedPrice] = useState(0);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Calculate total amount due
    const totalAmountDue = gallonsRequested * suggestedPrice;
    // Display calculated total amount due
    alert(`Total Amount Due: $${totalAmountDue.toFixed(2)}`);
  };

  return (
    <div>
    
  <div className="form-container">
  <div className="title">
        <h2>Fuel Quote Form</h2>
      </div>
    <div className="fuel-quote-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="gallonsRequested">Gallons Requested:</label>
          <input
            type="number"
            id="gallonsRequested"
            value={gallonsRequested}
            onChange={(e) => setGallonsRequested(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Delivery Address:</label>
          <input
            type="text"
            className="retrieve-address"
            value="4800 Calhoun Rd, Houston, TX 77004" // Non-editable, comes from client profile
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="deliveryDate">Delivery Date:</label>
          <input
            type="date"
            id="deliveryDate"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="suggestedPrice">Suggested Price / gallon:</label>
          <input
            type="number"
            id="suggestedPrice"
            value={suggestedPrice}
            onChange={(e) => setSuggestedPrice(e.target.value)}
            readOnly // Price will be calculated by Pricing Module
          />
        </div>
        <div className="form-group">
          <label>Total Amount Due:</label>
          <input
            type="number"
            value={(gallonsRequested * suggestedPrice).toFixed(2)}
            readOnly // Calculated (gallons * price)
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
  </div>
  );
};

export default FuelQuoteForm;
