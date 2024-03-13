import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';
import {
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardBody,
  } from 'mdb-react-ui-kit';
import LoadingSpinner from '../components/Loading';

const QuoteHistory = () => {
  const { authTokens } = useContext(AuthContext);
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/quote-history/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authTokens.access}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setQuotes(data); 
        } else {
          // Handle errors, e.g., unauthorized access, no quotes found, etc.
          toast.error('Failed to fetch quotes.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
        toast.error('An error occurred while fetching the quotes.');
      } finally {
        setIsLoading(false); // Update loading state here
      }
    };

    if (authTokens) {
      fetchQuotes();
    }
  }, [authTokens]);

  return (
    <section style={{ backgroundColor: '#eee' }}>
    <MDBContainer className="py-5 fluid">
    <MDBRow>     
      <MDBCol lg="1"></MDBCol>
      
      <MDBCol lg="10" >
      {isLoading ? (
            // Replace <LoadingSpinner /> with your actual spinner component
            <LoadingSpinner /> // This assumes you have a LoadingSpinner component
          ) : (
      <MDBCard>
      <MDBCardBody>
      <div className="title">
            <h3>Your Quote History</h3>
          </div>
            <hr />
      <MDBTable class="table table-striped table-hover">
            <MDBTableHead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Delivery Date</th>
                <th scope="col">Delivery Address</th>
                <th scope="col">Gallons Requested</th>
                <th scope="col">Price/Gallon</th>
                <th scope="col">Total Amount Due</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {quotes.map((quote, index) => (
                <tr key={quote.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{quote.delivery_date}</td>
                    <td class="text-start">{quote.delivery_address}</td>
                    <td>{quote.gallons_requested}</td>
                    <td>${quote.price_per_gallon}</td>
                    <td>${quote.total_amount_due}</td>
                </tr>
                ))}
            </MDBTableBody>
       </MDBTable>
        </MDBCardBody>
        </MDBCard>  
        )}
        </MDBCol>        
        </MDBRow>
        </MDBContainer>
        </section>
  );
};

export default QuoteHistory;
