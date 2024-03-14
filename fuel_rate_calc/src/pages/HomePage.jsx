import ProfileHook from "../context/ProfileHook";
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

export default function HomePage() {
    const { profile, profileLoaded } = ProfileHook();
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
                <h3>Your Profile</h3>
              </div>
                <hr />
                <MDBRow>
                  <MDBCol sm="4">
                    <MDBCardText className='text-start fw-bold'>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="8">
                    <MDBCardText className='text-start'>{profile.full_name} {profile.last_name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="4">
                    <MDBCardText className='text-start fw-bold'>Address 1</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="8">
                    <MDBCardText className='text-start'>{profile.addressOne}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="4">
                    <MDBCardText className='text-start fw-bold'>Address 2</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="8">
                    <MDBCardText className='text-start'>{profile.addressTwo}</MDBCardText>
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
                    <MDBCardText className='text-start fw-bold'>Zip Code</MDBCardText>
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
        <MDBContainer className="py-5 fluid">
        <MDBRow>     
          <MDBCol lg="4"></MDBCol>
          <MDBCol lg="6"></MDBCol>
        <MDBCard>
      <MDBCardBody>
        <MDBCardText>
        Please update your profile information BEFORE requesting a quote.
        </MDBCardText>
        <MDBBtn href='/profile' type="button" class="btn btn-success" data-mdb-ripple-init>Edit Profile</MDBBtn>
      </MDBCardBody>
    </MDBCard>
    </MDBRow>
    </MDBContainer>
    )
) : (
  <>
  <LoadingSpinner />
  </>
)}
    </section>
  );
}