import React from 'react';
import ViewVideos from './pages/viewvideos.js';
import LoginPage from './pages/loginpage.js';
import UploadVideos from './pages/uploadvids.js';
import UploadMats from './pages/uploadmats.js';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <UploadMats /> */}
      {/* <UploadVideos />   */} {/* error in this shit */}
      <LoginPage/>
    </div>
  );
}

export default App;
