import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">Online Classroom</h1>
      <div className="navbar-buttons">
        <div className="dot"></div>
        <a href="#">Courses</a>
        <a href="#">Forum</a>
        <Link to="/">Log out</Link>
        <div className="animation start-home"></div>
      </div>
    </nav>
  );
};

export default Navbar;
