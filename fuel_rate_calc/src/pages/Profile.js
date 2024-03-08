import React, { useState, useContext, useEffect } from 'react';
import '../FuelQuoteForm.css';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Profile(){
    const {authTokens } = useContext(AuthContext);
    const navigate = useNavigate();
    const [profileExists, setProfileExists] = useState(false);
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState(''); // Single address field
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');

    const states = [
        { code: "AL", name: "Alabama" }, { code: "AK", name: "Alaska" },
        { code: "AZ", name: "Arizona" }, { code: "AR", name: "Arkansas" },
        { code: "CA", name: "California" }, { code: "CO", name: "Colorado" },
        { code: "CT", name: "Connecticut" }, { code: "DE", name: "Delaware" },
        { code: "FL", name: "Florida" }, { code: "GA", name: "Georgia" },
        { code: "HI", name: "Hawaii" }, { code: "ID", name: "Idaho" },
        { code: "IL", name: "Illinois" }, { code: "IN", name: "Indiana" },
        { code: "IA", name: "Iowa" }, { code: "KS", name: "Kansas" },
        { code: "KY", name: "Kentucky" }, { code: "LA", name: "Louisiana" },
        { code: "ME", name: "Maine" }, { code: "MD", name: "Maryland" },
        { code: "MA", name: "Massachusetts" }, { code: "MI", name: "Michigan" },
        { code: "MN", name: "Minnesota" }, { code: "MS", name: "Mississippi" },
        { code: "MO", name: "Missouri" }, { code: "MT", name: "Montana" },
        { code: "NE", name: "Nebraska" }, { code: "NV", name: "Nevada" },
        { code: "NH", name: "New Hampshire" }, { code: "NJ", name: "New Jersey" },
        { code: "NM", name: "New Mexico" }, { code: "NY", name: "New York" },
        { code: "NC", name: "North Carolina" }, { code: "ND", name: "North Dakota" },
        { code: "OH", name: "Ohio" }, { code: "OK", name: "Oklahoma" },
        { code: "OR", name: "Oregon" }, { code: "PA", name: "Pennsylvania" },
        { code: "RI", name: "Rhode Island" }, { code: "SC", name: "South Carolina" },
        { code: "SD", name: "South Dakota" }, { code: "TN", name: "Tennessee" },
        { code: "TX", name: "Texas" }, { code: "UT", name: "Utah" },
        { code: "VT", name: "Vermont" }, { code: "VA", name: "Virginia" },
        { code: "WA", name: "Washington" }, { code: "WV", name: "West Virginia" },
        { code: "WI", name: "Wisconsin" }, { code: "WY", name: "Wyoming" },
        { code: "DC", name: "District of Columbia" }, { code: "PR", name: "Puerto Rico" }
    ];

    useEffect(() => {
      const fetchProfile = async () => {
          if (authTokens) {
              const response = await fetch('http://127.0.0.1:8000/api/profile/', {
                  method: 'GET',
                  headers: {
                      'Authorization': `Bearer ${authTokens.access}`,
                  },
              });

              if (response.ok) {
                  setProfileExists(true);
                  // Optionally, populate form fields with existing profile data
              } else if (response.status === 404) {
                  setProfileExists(false);
              } else {
                  // Handle other potential errors or statuses
              }
          }
      };

      fetchProfile();
  }, [authTokens]);

    const handleSubmit = async (e) => {
      e.preventDefault();

      const method = profileExists ? 'PATCH' : 'POST';

      // Prepare your profile data object according to your backend expectations
      const profileData = {
          first_name: firstName,
          last_name: lastName,
          address: address,
          city: city,
          state: state,
          zip_code: zipCode,
      };

      // Use the authTokens for the Authorization header
      if (authTokens) {
          try {
              const response = await fetch('http://127.0.0.1:8000/api/profile/', {
                  method: method, // Use PATCH or POST depending on your backend
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${authTokens.access}`, // Use the access token
                  },
                  body: JSON.stringify(profileData),
              });

              if (response.ok) {
                toast.success('Profile updated successfully.');
                setProfileExists(true); // Ensure future submissions use PATCH
                setTimeout(() => navigate('/'), 1600);
            } else {
                throw new Error('Failed to update profile.');
            }
        } catch (error) {
            toast.error(error.message || 'An error occurred.');
        }
    } else {
        toast.error("You're not logged in.");
    }
};


    return (
      <div className="form-container">
      <div className="title">
          <h2>Customer Information</h2>
      </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address 1:</label>
            <input type="text" id="address" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input type="text" id="city" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
          </div>
          <div className="form-group">
          <label htmlFor="state">State:</label>
              <select id="state" value={state} onChange={(e) => setState(e.target.value)} required>
                  <option value="" disabled>Select state</option>
                  {states.map((state) => (
                      <option key={state.code} value={state.code}>{state.name}</option>
                  ))}
              </select>
          </div>
          <div className="form-group">
              <label htmlFor="zipCode">Zip code:</label>
              <input
                  type="text"
                  id="zipCode"
                  placeholder="Zip code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  maxLength="9"
                  minLength="5"
                  required
              />
          </div>
          <button type="submit">Update</button>
        </form>

      </div>
    )
}

export default Profile;