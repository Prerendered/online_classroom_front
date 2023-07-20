import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">Online Classroom</h1>
      <div className="navbar-buttons">
        <div className="dot"></div>
        <a href="#">Home</a>
        <a href="#">Courses</a>
        <a href="#">Log out</a>
        <div className="animation start-home"></div>
      </div>
    </nav>
  );
};

export default Navbar;
