import React from 'react';
import { trefoil } from 'ldrs'
import { MDBCard, MDBCardBody, MDBCardText } from 'mdb-react-ui-kit';

const LoadingSpinner = () => {
  trefoil.register()
  return (
    <MDBCard className="text-center">
      <MDBCardBody>
        <MDBCardText>
        <l-trefoil
          size="60"
          stroke="2"
          stroke-length="0.15"
          bg-opacity="0.1"
          speed="1.4" 
          color="black" 
        ></l-trefoil>
          <p>Loading...</p>
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  );
};
export default LoadingSpinner;