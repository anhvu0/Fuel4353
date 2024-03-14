import React, { useState, useContext, useEffect } from 'react';
import ProfileHook from '../context/ProfileHook';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import "../FuelQuoteForm.css";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBBtn
} from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import LoadingSpinner from "../components/Loading";
import LoadingButton from "../components/LoadingButton";

const QuoteForm = () => {
  const { profile, profileLoaded } = ProfileHook();
  const { authTokens } = useContext(AuthContext);
  const navigate = useNavigate();
  const [gallonsRequested, setGallonsRequested] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [pricePerGallon, setPricePerGallon] = useState('2.50'); // Assuming a mock price per gallon
  const [totalAmountDue, setTotalAmountDue] = useState('');
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    // When the profile is loaded, construct the delivery address
    if (profileLoaded && profile) {
      const fullAddress = `${profile.addressOne} ${profile.addressTwo}, ${profile.city}, ${profile.state} ${profile.zip_code}`;
      setDeliveryAddress(fullAddress.trim()); // Trim in case some fields are empty
    }
  }, [profile, profileLoaded]);


  useEffect(() => {
    // Calculate the total amount due whenever gallons requested or price per gallon changes
    if (gallonsRequested && pricePerGallon) {
      const total = (parseFloat(gallonsRequested) * parseFloat(pricePerGallon)).toFixed(2);
      setTotalAmountDue(total);
    }
  }, [gallonsRequested, pricePerGallon]);

  const handleSubmit = async (e, setLoading) => {
    e.preventDefault();
    setLoading(true);
    if (!profile) {
      alert('You must be logged in to submit a quote.');
      navigate('/login');
      return;
    }

    const quoteData = {
      user: profile.user,
      gallons_requested: gallonsRequested,
      delivery_address: deliveryAddress,
      delivery_date: deliveryDate,
      price_per_gallon: pricePerGallon,
      total_amount_due: totalAmountDue,
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/quotes/`, {
          method: 'POST', 
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authTokens.access}`, 
          },
          body: JSON.stringify(quoteData),
      });

      if (response.ok) {
        {/*const data = await response.json();*/}
        toast.success('Quote submitted successfully.');
        setTimeout(() => navigate('/quotehistory'), 600);
      } else {
        // If the server responded with a client error (e.g., 400) or server error (e.g., 500)
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit quote.');
      }
  } catch (error) {
      toast.error(error.message || 'An error occurred while submitting the quote.');
  }
    // Submit the quoteData to the backend API
    console.log('Submitting quote:', quoteData);
  };

  return (
    <section style={{ backgroundColor: '#eee' }}>
    {profileLoaded ? (
    <MDBContainer className="py-5 fluid">
    <MDBRow>     
      <MDBCol lg="2"></MDBCol>
      <MDBCol lg="8">
      <MDBCard>
      <MDBCardBody>
          <div className="title">
            <h3>Request a Fuel Quote</h3>
          </div>
            <hr />
      <form onSubmit={(e) => handleSubmit(e, setLoading)}>
      <MDBRow>
            <MDBCol sm="3">
            <MDBCardText className='text-start fw-bold'>Delivery Address</MDBCardText>
            </MDBCol>
            <MDBCol sm="6">
            <MDBCardText className='text-start'>{deliveryAddress}</MDBCardText>
            </MDBCol>
        </MDBRow>
        <hr />
        <MDBRow>
            <MDBCol sm="3">
            <MDBCardText className='text-start fw-bold'>Delivery Date</MDBCardText>
            </MDBCol>
            <MDBCol sm="4">
            <input
            type="date"
            id="deliveryDate"
            class="form-control"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            required
            />
            </MDBCol>
        </MDBRow>
        <hr />
        <MDBRow>
            <MDBCol sm="3">
            <MDBCardText className='text-start fw-bold'>Gallons Requested</MDBCardText>
            </MDBCol>
            <MDBCol sm="4">
            <input
            type="number"
            min="0"
            id="gallonsRequested"
            class="form-control"
            value={gallonsRequested}
            onChange={(e) => setGallonsRequested(e.target.value)}
            required
           />
           </MDBCol>
        </MDBRow>
        <hr />
        
        <MDBRow>
            <MDBCol sm="3">
            <MDBCardText className='text-start fw-bold'>Price/Gallon</MDBCardText>
            </MDBCol>
            <MDBCol sm="4">
            <input
            type="text"
            id="pricePerGallon"
            class="form-control"
            value={pricePerGallon}
            disabled={true} // This field is not editable
            />
            </MDBCol>
        </MDBRow>
        <hr />
        <MDBRow>
            <MDBCol sm="3">
            <MDBCardText className='text-start fw-bold'>Total Amount Due</MDBCardText>
            </MDBCol>
            <MDBCol sm="4">
            <input
            type="text"
            id="totalAmountDue"
            class="form-control"
            value={totalAmountDue}
            disabled={true} // This field is not editable
            />
            </MDBCol>
        </MDBRow>
        <hr />
        {/*<MDBBtn type="submit" class="btn btn-success" data-mdb-ripple-init>Submit Quote</MDBBtn>*/}
        <LoadingButton type="submit" loading={loading}>
              Submit
            </LoadingButton>
        </form>
        </MDBCardBody>
        </MDBCard>  
        </MDBCol>  
        </MDBRow>
        </MDBContainer>
        ) : (
          <>
          <LoadingSpinner />
          </>
      )}
        </section>
  );
};

export default QuoteForm;
