import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function Navx() {
  let { user, logoutUser } = useContext(AuthContext);
  const [openNavCentred, setOpenNavCentred] = useState(false);
  const handleLogout = (e) => {
    e.preventDefault(); 
    logoutUser(); 
  };

  return (
    <MDBNavbar expand='lg' className='shadow-3 text-dark'>
      <MDBContainer fluid className='justify-content-start'>
       <MDBNavbarBrand href='/'>SMART+</MDBNavbarBrand>
        <MDBNavbarToggler
          type='button'
          data-target='#navbarCenteredExample'
          aria-controls='navbarCenteredExample'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenNavCentred(!openNavCentred)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar open={openNavCentred} center id='navbarCenteredExample'>
          <MDBNavbarNav fullWidth={false} className='mb-2 mb-lg-0 bg-gradient' >
            <MDBNavbarItem >
              <MDBNavbarLink aria-current='page' href='/'>
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/profile'>Profile</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/quoteform'>Get a Quote</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/quotehistory'>Quote History</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem className='align-items-end'>
          {user ? (
            <MDBBtn type="button" outline color="secondary" className='m-0' href="#" onClick={handleLogout}>Log out</MDBBtn>
            ) : (
            <MDBNavbarLink href="/login">
              Log in
            </MDBNavbarLink>
              )}</MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}