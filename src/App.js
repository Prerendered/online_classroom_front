import React from 'react';
import ViewVideos from './pages/viewvideos.js';
import LoginPage from './pages/loginpage.js';
import UploadVideos from './pages/uploadvids.js';
import UploadMats from './pages/uploadmats.js';
import Video from './pages/videoplayer.js';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <UploadMats /> */}
      <Video />   {/* error in this, removed everything for now*/}
      {/* <ViewVideos/> */}
      {/* <LoginPage/> */}
    </div>
  );
}

export default App;
