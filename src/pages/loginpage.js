import React from 'react';
import './loginpage.css';
import backgroundImage from '../assets/backimage.jpg';

function LoginPage() {
  return (
    <div className="main-container">
      <img src={backgroundImage} alt="Background" className="background-img" />
      <div className="login-text">Log in Form</div>
      <div className="email-input-container">
        <input type="email" placeholder="Email / Username" className="email-input" />
      </div>
      <div className="password-input-container">
        <input type="password" placeholder="Enter your password" className="password-input" />
      </div>
      <div className="forgotpassword-text">Forgot password?</div>
      <div className="rememberme-container">
        <input type="checkbox" id="rememberme-checkbox" className="rememberme-checkbox" />
        <label htmlFor="rememberme-checkbox" className="rememberme-label">Remember me</label>
      </div>
      <div className="Teacher-login-button-container">
        <button className="Teacher-login-button">Continue as Teacher</button>
      </div>
      <div className="Student-login-button-container">
        <button className="Student-login-button">Continue as Student</button>
      </div>
    </div>
  );
}

export default LoginPage;
