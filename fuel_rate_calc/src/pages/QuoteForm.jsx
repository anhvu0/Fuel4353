import React, { useState, useEffect } from 'react';
import ProfileHook from '../context/ProfileHook';
import { useNavigate } from 'react-router-dom';
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

const QuoteForm = () => {
  const { profile, profileLoaded } = ProfileHook();
  const navigate = useNavigate();
  const [gallonsRequested, setGallonsRequested] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [pricePerGallon, setPricePerGallon] = useState('2.50'); // Assuming a mock price per gallon
  const [totalAmountDue, setTotalAmountDue] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profile) {
      alert('You must be logged in to submit a quote.');
      navigate('/login');
      return;
    }

    const quoteData = {
      user: profile.user, // Assuming you have user ID in profile
      gallonsRequested,
      deliveryAddress,
      deliveryDate,
      pricePerGallon,
      totalAmountDue,
    };

    // Submit the quoteData to the backend API
    console.log('Submitting quote:', quoteData);
    // After submission logic goes here...
  };

  return (
    <section style={{ backgroundColor: '#eee' }}>
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
      <form onSubmit={handleSubmit}>
      <MDBRow>
            <MDBCol sm="3">
            <MDBCardText className='text-start fw-bold'>Delivery Address</MDBCardText>
            </MDBCol>
            <MDBCol sm="6">
            <MDBCardText>
           {/*<input
            type="text"
            id="deliveryAddress"
            class="form-control"
            value={deliveryAddress}
            disabled={true} // This field is not editable
            />*/} 
            {deliveryAddress}
            </MDBCardText>
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
        <MDBBtn type="submit" class="btn btn-success" data-mdb-ripple-init>Submit Quote</MDBBtn>
        </form>
        </MDBCardBody>
        </MDBCard>  
        </MDBCol>  
        </MDBRow>
        </MDBContainer>
        </section>
  );
};

export default QuoteForm;
