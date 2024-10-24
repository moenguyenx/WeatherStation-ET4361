import React from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse
} from 'mdb-react-ui-kit';

export default function Navbar()
{
    return (
        <>
          <MDBNavbar expand='lg' light bgColor='light'>
            <MDBContainer fluid>
              <MDBNavbarBrand href='#'>HUST Weather Station</MDBNavbarBrand>
                <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>

                  <MDBNavbarItem className='active'>
                    <MDBNavbarLink aria-current='page' href='/'>
                      Dashboard
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink href='/chart'>Analitics</MDBNavbarLink>
                  </MDBNavbarItem>
                  
                </MDBNavbarNav>
            </MDBContainer>
          </MDBNavbar>
        </>
      );
}