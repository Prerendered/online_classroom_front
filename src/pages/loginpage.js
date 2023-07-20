import React from 'react';
import './loginpage.css';
import backImage from '../assets/white_pencil.jpg';

function LoginPage() {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className='col-md-6'>
          Image placeholder
          {/* <img src={backImage} alt="Background" className="img-fluid" /> */}
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Login</h3>
              <form>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email / Username</label>
                  <input type="email" id="email" className="form-control" placeholder="Enter your email or username" />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" className="form-control" placeholder="Enter your password" />
                </div>
                <div className="form-check mb-3">
                  <input type="checkbox" id="rememberMe" className="form-check-input" />
                  <label htmlFor="rememberMe" className="form-check-label">Remember me</label>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
