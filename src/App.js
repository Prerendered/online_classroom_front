import React from 'react';
import Navbar from './components/navbar.js';
import Video from './pages/videoplayer.js';
import './App.css';

function App() {
  return (
    <div className="App">
        <Navbar />
      {/* <UploadMats /> */}
        <Video />   {/* error in this, removed everything for now*/}

      {/* <ViewVideos/> */}
      {/* <LoginPage/> */}



    </div>
  );
}

export default App;
