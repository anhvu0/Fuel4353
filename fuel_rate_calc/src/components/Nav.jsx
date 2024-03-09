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
  MDBIcon
} from 'mdb-react-ui-kit';

export default function Navx() {
  let { user, logoutUser } = useContext(AuthContext);
  const [openNav, setOpenNav] = useState(false);
  const handleLogout = (e) => {
    e.preventDefault(); // Prevent default link behavior
    logoutUser(); // Call the logout function
  };

  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/'>SMART+</MDBNavbarBrand>
        <MDBNavbarToggler
          type='button'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenNav(!openNav)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar open={openNav}>
          <MDBNavbarNav>
            <MDBNavbarItem>
              <MDBNavbarLink aria-current='page' href='/'>
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/profile'>Profile</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
            {user ? (
            <MDBNavbarLink href="/login" onClick={handleLogout}>Log out</MDBNavbarLink>
            ) : (
            <MDBNavbarLink href="/login">
              Log in
            </MDBNavbarLink>
              )}
            </MDBNavbarItem>
            <MDBNavbarItem>
              {/*<MDBNavbarLink disabled href='#' tabIndex={-1} aria-disabled='true'>
                Disabled
              </MDBNavbarLink>*/}
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}