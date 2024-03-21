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
  //const { authTokens } = useContext(AuthContext);
  //const navigate = useNavigate();
  const [gallonsRequested, setGallonsRequested] = useState('');
  const [gallonsError, setGallonsError] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [pricePerGallon] = useState('1.50'); // Assuming a mock price per gallon
  const { handleGetQuote, handleSubmitQuote, isLoading, suggestedPrice, totalAmountDue } = QuoteFormHook(profile);
  const [LockedInput, setLockedInput] = useState(false);

  useEffect(() => {
    // When the profile is loaded, construct the delivery address
    if (profileLoaded && profile) {
      const fullAddress = `${profile.addressOne} ${profile.addressTwo}, ${profile.city}, ${profile.state} ${profile.zip_code}`;
      setDeliveryAddress(fullAddress.trim()); // Trim in case some fields are empty
    }
  }, [profile, profileLoaded]);

  /* const handleSubmit = async (e) => {
     e.preventDefault();
 
     if (!profile) {
       toast.error('You must update your profile to submit a quote.');
       setTimeout(() => navigate('/profile/'), 1600);
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
         const data = await response.json();
         toast.success(data.message || 'Quote submitted successfully.');
         setTimeout(() => navigate('/quotehistory'), 1600);
       } else {
 
         const errorData = await response.json();
         throw new Error(errorData.error || 'Failed to submit quote.');
       }
     } catch (error) {
       toast.error(error.message || 'An error occurred while submitting the quote.');
     }
     // Submit the quoteData to the backend API
     //console.log('Submitting quote:', quoteData);
   };
 
   const handleGetQuote = async () => {
     setIsLoading(true);
     if (!profile) {
       toast.error('You must update your profile to submit a quote.');
       setTimeout(() => navigate('/profile/'), 1600);
       return;
     }
     const quoteData = {
       location: profile.state,
       gallons_requested: gallonsRequested,
     };
 
     try {
       const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/getquote/`, {
         method: 'POST',
         headers: {
           'Authorization': `Bearer ${authTokens.access}`,
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(quoteData),
       });
 
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
 
       const data = await response.json();
       setSuggestedPrice(data.suggested_price);
       setTotalAmountDue(data.total_amount_due);
     } catch (error) {
       console.error("Fetch error:", error);
       toast.error("An error occurred while fetching the quote.");
     }
 
     setIsLoading(false); // Stop loading indicator
   };*/
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
                          {/*<input
                            type="number"
                            min="0"
                            id="gallonsRequested"
                            className="form-control"
                            value={gallonsRequested}
                            onChange={(e) => setGallonsRequested(Number(e.target.value))}
                            required
                            disabled={LockedInput}
                          />*/}
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
                              value={pricePerGallon}
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
