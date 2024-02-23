import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';


function CustomerProfile(){

    const navigate = useNavigate();

    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [addressOne, setaddressOne] = useState('');
    const [addressTwo, setaddressTwo] = useState('');
    const [city, setcity] = useState('');
    const [state, setstate] = useState('');
    const [zipCode, setzipCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Profile Updated Successfully')
    };

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


    return (
        <div>
        <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Customer Profile Information</h5>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input type="text" className="form-control" id="firstName" placeholder="First Name" value={firstName} onChange={(e) => setfirstName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" className="form-control" id="lastName" placeholder="Last Name" value={lastName} onChange={(e) => setlastName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="addressOne">Address 1</label>
                  <input type="text" className="form-control" id="addressOne" placeholder="Address 1" value={addressOne} onChange={(e) => setaddressOne(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="addressTwo">Address 2</label>
                  <input type="text" className="form-control" id="addressTwo" placeholder="Address 2" value={addressTwo} onChange={(e) => setaddressTwo(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input type="text" className="form-control" id="city" placeholder="City" value={city} onChange={(e) => setcity(e.target.value)} required />
                </div>
                <div className="form-group">
                <label htmlFor="state">State</label>
                    <select className="form-control" id="state" value={state} onChange={(e) => setstate(e.target.value)} required>
                        <option value="" disabled>Select state</option>
                        {states.map((state) => (
                            <option key={state.code} value={state.code}>{state.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="zipCode">Zip code</label>
                    <input
                        type="text"
                        className="form-control"
                        id="zipCode"
                        placeholder="Zip code"
                        value={zipCode}
                        onChange={(e) => setzipCode(e.target.value)}
                        maxLength="9"
                        minLength="5"
                        required
                    />
                </div>
                <input type="submit" className="btn btn-primary btn-block" value="Update" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    )
}

export default CustomerProfile;