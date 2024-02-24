import React from 'react';
import './FuelQuoteForm.css';

const FuelQuoteHistory = () => {
  // Sample data for demonstration
  const quotes = [
    { id: 1, gallonsRequested: 100, deliveryDate: '2022-01-01', suggestedPrice: 2.5, totalAmountDue: 250, deliveryAddress: '4302 University Drive, Houston, TX 77204' },
    { id: 2, gallonsRequested: 150, deliveryDate: '2022-01-15', suggestedPrice: 2.6, totalAmountDue: 390, deliveryAddress: '2700 Bay Area Blvd, Houston, TX 77058' },
    { id: 3, gallonsRequested: 200, deliveryDate: '2023-01-25', suggestedPrice: 3.0, totalAmountDue: 600, deliveryAddress: '4800 Calhoun Rd, Houston, TX 77004'}
    // Add more quote data as needed
  ];

  return (
    <div className="form-container">
        <h2>Fuel Quote History</h2>
        <div className="fuel-quote-history-container">
        <table className="fuel-quote-history-table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Gallons Requested</th>
                <th>Delivery Date</th>
                <th>Delivery Address</th>
                <th>Suggested Price / gallon</th>
                <th>Total Amount Due</th>
            </tr>
            </thead>
            <tbody>
            {quotes.map(quote => (
                <tr key={quote.id}>
                <td>{quote.id}</td>
                <td>{quote.gallonsRequested}</td>
                <td>{quote.deliveryDate}</td>
                <td>{quote.deliveryAddress}</td>
                <td>{quote.suggestedPrice}</td>
                <td>{quote.totalAmountDue}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>
  );
};

export default FuelQuoteHistory;
