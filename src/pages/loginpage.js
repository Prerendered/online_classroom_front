import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';

function LoginPage() {
  return (
    <MDBContainer fluid>
      <MDBRow>

        <MDBCol sm='6'>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 '>

            <h3 className="fw-bold mt-5 p-5" style={{letterSpacing: '1px'} }>Log in</h3>

            <MDBInput wrapperClass='mb-3 mx-5 w-100' label='Email address' id='typeEmail' type='email' size="lg"/>  
            
            <MDBInput wrapperClass='mb-3 mx-5 w-100' label='Password' id='typePassword' type='password' size="lg"/>

            <MDBBtn rounded className="butt-custom mb-4 px-5 mx-5 w-100"  color='dark' rippleColor='light' size='lg'>Login</MDBBtn>
            <p className="small mb-5 pb-lg-3 ms-5"><a class="text-muted" href="#!">Forgot password?</a></p>

          </div>

        </MDBCol>

        <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <img src="https://images.unsplash.com/photo-1658235081483-8f06aa0882cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            alt="Login image" className="w-101" style={{objectFit: 'cover', objectPosition: 'left'}} />
        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default LoginPage;