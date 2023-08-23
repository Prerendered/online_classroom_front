import React from 'react';
import '../App.css';
import '../components/navbar.js';
import '../components/navbar.css';
import Navbar from '../components/navbar.js';
import Video from './videoplayer.js';
import Subtitle from './subject-title.js';

const viewVideos = () => {
  return (
    <div>
      <Navbar />
      <Subtitle />
      <div className="app">
        <Video />
      </div>
    </div>
  );
};

export default viewVideos;
