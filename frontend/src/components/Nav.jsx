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
          className='navbar-toggler'
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
          <div className="navbar-flex-container"> {/* Flex container for navbar content */}
            <MDBNavbarNav fullWidth={false} className='mr-auto mb-2 mb-lg-0 bg-gradient' >
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
            </MDBNavbarNav>
            {user && (
              <div className='d-flex align-items-center justify-content-center'>
                <span className='navbar-text me-3' style={{ color: 'var(--bs-warning)' }}>Hello, {user.username}!</span>
                <MDBBtn outline rounded color="secondary" onClick={handleLogout}>Log out</MDBBtn>
              </div>
            )}

          </div>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}