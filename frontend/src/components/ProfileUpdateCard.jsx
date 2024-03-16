import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBBtn
} from 'mdb-react-ui-kit';

const ProfileUpdateCard = () => {
  return (
    <MDBCard>
      <MDBCardBody>
        <MDBCardText>
          Please update your profile information before requesting a quote.
        </MDBCardText>
        <MDBBtn href='/profile' type="button" 
        className="btn btn-success" 
        style={{ backgroundColor: '#20d489' }}>Edit Profile</MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
};

export default ProfileUpdateCard;
