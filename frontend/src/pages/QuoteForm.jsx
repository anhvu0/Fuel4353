import React, { useState, useEffect } from 'react';
import ProfileHook from '../context/ProfileHook';
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

import LoadingSpinner from "../components/Loading";
import ProfileUpdateCard from '../components/ProfileUpdateCard';
import QuoteFormHook from '../context/QuoteFormHook';

const QuoteForm = () => {
  const { profile, profileLoaded } = ProfileHook();
  const [gallonsRequested, setGallonsRequested] = useState('');
  const [gallonsError, setGallonsError] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const { handleGetQuote, handleSubmitQuote, isLoading, suggestedPrice, totalAmountDue } = QuoteFormHook(profile);
  const [LockedInput, setLockedInput] = useState(false);
  const [pricePerGallon, setPricePerGallon] = useState('');;

  useEffect(() => {
    // When the profile is loaded, construct the delivery address
    if (profileLoaded && profile) {
      const fullAddress = `${profile.addressOne} ${profile.addressTwo}, ${profile.city}, ${profile.state} ${profile.zip_code}`;
      setDeliveryAddress(fullAddress.trim()); // Trim in case some fields are empty
    }
  }, [profile, profileLoaded]);

  useEffect(() => {//Get the current price per gallon from back end
    const fetchPricePerGallon = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/ppg/`);
        if (!response.ok) {
          throw new Error('Failed to fetch the current price per gallon.');
        }
        const data = await response.json();
        setPricePerGallon(data.current_price_per_gallon); //
        //console.log('Price per gallon:', data.current_price_per_gallon);
      } catch (error) {
        console.error('Error fetching price per gallon:', error);
      }
    };

    fetchPricePerGallon();
  }, []);

  const handleGallonsChange = (e) => {
    const value = e.target.value;
    const intValue = parseInt(value, 10);

    if (value === '' || (!isNaN(intValue) && intValue.toString() === value)) {
      setGallonsRequested(intValue);
      setGallonsError(''); // Clear error if input is valid
    } else {
      // Set error message if the input is not an integer
      setGallonsError('Gallons requested must be an integer');
    }
  };
  // Calculate today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  return (
    <section style={{ backgroundColor: '#eee' }}>

      <MDBContainer className="py-5 fluid">
        <MDBRow>
          <MDBCol lg="2"></MDBCol>
          <MDBCol lg="8">
            {!profileLoaded ? (
              <LoadingSpinner />
            ) : (
              profile ? (
                <MDBCard>
                  <MDBCardBody>
                    <div className="title">
                      <h3>Request a Fuel Quote</h3>
                    </div>
                    <hr />
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const quoteData = {
                        user: profile.user,
                        gallons_requested: gallonsRequested,
                        delivery_address: deliveryAddress,
                        delivery_date: deliveryDate,
                        price_per_gallon: pricePerGallon,
                        total_amount_due: totalAmountDue,
                      };
                      handleSubmitQuote(quoteData);
                    }}>
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
                        <MDBCol sm="5">
                          <input
                            type="date"
                            id="deliveryDate"
                            className="form-control"
                            min={today}
                            value={deliveryDate}
                            onChange={(e) => setDeliveryDate(e.target.value)}
                            disabled={LockedInput} // Disable if gallons requested is not
                            required
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText className='text-start fw-bold'>Gallons Requested</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="5">
                          <input
                            type="number"
                            min="0"
                            id="gallonsRequested"
                            className={`form-control ${gallonsError ? 'is-invalid' : ''}`}
                            value={gallonsRequested}
                            onChange={handleGallonsChange}
                            required
                            disabled={LockedInput}
                          />
                          {gallonsError && <div className="error-msg">{gallonsError}</div>}
                        </MDBCol>
                      </MDBRow>
                      <hr />

                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText className='text-start fw-bold'>Price/Gallon</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="5">
                          <div className="input-group">
                            <span className="input-group-text">$</span>
                            <input
                              type="text"
                              id="pricePerGallon"
                              className="form-control"
                              value={pricePerGallon || 'N/A'}
                              disabled={true} // This field is not editable
                            />
                          </div>
                        </MDBCol>
                      </MDBRow>
                      <hr />

                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText className='text-start fw-bold'>Suggested Price</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="5">
                          <div className="input-group">
                            <span className="input-group-text">$</span>
                            <input
                              type="text"
                              id="suggestedPrice"
                              className="form-control"
                              value={suggestedPrice}
                              disabled={true} // This field is not editable
                              readOnly
                            />
                          </div>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText className='text-start fw-bold'>Total Amount Due</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="5">
                          <div className="input-group">
                            <span className="input-group-text">$</span>
                            <input
                              type="text"
                              id="totalAmountDue"
                              className="form-control"
                              value={totalAmountDue}
                              disabled={true} // This field is not editable
                              readOnly
                            />
                          </div>
                        </MDBCol>
                      </MDBRow>
                      <hr />

                      <MDBRow>
                        <MDBCol md="3">
                        </MDBCol>

                        <MDBCol md="4">
                          <p>Step 1</p>
                          <MDBBtn onClick={() => {
                            handleGetQuote(gallonsRequested);
                            setLockedInput(true); // Lock the field after fetching the quote
                          }}
                            class="btn btn-success"
                            disabled={!gallonsRequested || isLoading || LockedInput
                            }
                            style={{ backgroundColor: '#20d489' }}>Get Quote</MDBBtn>
                        </MDBCol>

                        <MDBCol md="4">
                          <p>Step 2</p>
                          <MDBBtn type='submit' class="btn btn-success"
                            style={{ backgroundColor: '#20d489' }}
                            disabled={
                              !gallonsRequested ||
                              !deliveryDate ||
                              !suggestedPrice ||
                              !totalAmountDue ||
                              isLoading // Optional: Also disable the button while loading
                            }>Submit Quote</MDBBtn>
                        </MDBCol>
                      </MDBRow>
                    </form>
                  </MDBCardBody>
                </MDBCard>
              ) : (
                <ProfileUpdateCard />
              )

            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default QuoteForm;
