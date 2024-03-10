import React, { useState, useEffect, useContext } from 'react';
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

export default function HomePage() {

    const { user, authTokens, logoutUser } = useContext(AuthContext);
    let [profile, setProfile] = useState(null);
    let [profileLoaded, setProfileLoaded] = useState(false);

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        try {
            let response = await fetch('http://127.0.0.1:8000/api/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
            });

            if (response.status === 200) {
                let data = await response.json();
                setProfile(data);
            } else if (response.status === 401) {
                logoutUser();
            }
            setProfileLoaded(true); // Indicates the profile fetch attempt was made
        } catch (error) {
            console.error("An error occurred while fetching the profile:", error);
            setProfileLoaded(true);
        }
    };
  return (
    <section style={{ backgroundColor: '#eee' }}>
    {profileLoaded ? (
        profile ? (
      <MDBContainer className="py-5 fluid">
        <MDBRow>     
          <MDBCol lg="3"></MDBCol>
          <MDBCol lg="6">
            <MDBCard className="mb-4">
              <MDBCardBody>
              <div className="title">
                <h3>Profile</h3>
              </div>
                <hr />
                <MDBRow>
                  <MDBCol sm="4">
                    <MDBCardText className='text-start fw-bold'>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="8">
                    <MDBCardText className='text-start'>{profile.first_name} {profile.last_name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="4">
                    <MDBCardText className='text-start fw-bold'>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="8">
                    <MDBCardText className='text-start'>{profile.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="4">
                    <MDBCardText className='text-start fw-bold'>Address 1</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="8">
                    <MDBCardText className='text-start'>{profile.address}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="4">
                    <MDBCardText className='text-start fw-bold'>City</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="8">
                    <MDBCardText className='text-start'>{profile.city}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="4">
                    <MDBCardText className='text-start fw-bold'>State</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="8">
                    <MDBCardText className='text-start'>{profile.state}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="4">
                    <MDBCardText className='text-start fw-bold'>Zip</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="8">
                    <MDBCardText className='text-start'>{profile.zip_code}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      ) : (
        <MDBCard>
      <MDBCardBody>
        <MDBCardText>
        Please update your profile information.
        </MDBCardText>
        <MDBBtn href='/profile' type="button" class="btn btn-secondary" data-mdb-ripple-init>Edit Profile</MDBBtn>
      </MDBCardBody>
      
    </MDBCard>
    
    )
) : (
    <p>Loading profile...</p> // This can now safely be omitted if not needed
)}
    </section>
  );
}