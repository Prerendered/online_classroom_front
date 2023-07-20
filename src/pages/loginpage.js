import React from 'react';
import './loginpage.css';
import {Container, Col, Image, Card, Form, Button, Row} from 'react-bootstrap';
import backgroundImage from '../assets/backimage.jpg';

function LoginPage() {

  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '100vh', // Set a height to cover the entire viewport (adjust as needed)
  };

  return(
    <Container fluid style={containerStyle}>
      <Row> 
        <Col > </Col>
        <Col xs={6}>
          <Card>
            <Card.Body>
              <Card.Title>Enter your login details</Card.Title>
              <Form>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label >Email / Username</Form.Label>
                  <Form.Control type="email" placeholder="Enter your Email or Username" />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter your password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>
                <div className='text-center'>
                  <Button variant="primary" type="submit">Log in</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col > </Col>
      </Row>    
    </Container>
  )
}








// function LoginPage() {
//   return (
//     <div className="container my-5">
//       <div className="row justify-content-center">
//         <div className='col-md-6'>
          
//         </div>
//         <div className="col-md-6">
//           <div className="card">
//             <div className="card-body">
//               <h3 className="card-title text-center mb-4">Login</h3>
//               <form>
//                 <div className="form-group mb-3">
//                   <label htmlFor="email">Email / Username</label>
//                   <input type="email" id="email" className="form-control" placeholder="Enter your email or username" />
//                 </div>
//                 <div className="form-group mb-3">
//                   <label htmlFor="password">Password</label>
//                   <input type="password" id="password" className="form-control" placeholder="Enter your password" />
//                 </div>
//                 <div className="form-check mb-3">
//                   <input type="checkbox" id="rememberMe" className="form-check-input" />
//                   <label htmlFor="rememberMe" className="form-check-label">Remember me</label>
//                 </div>
//                 <button type="submit" className="btn btn-primary btn-block">Login</button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default LoginPage;
