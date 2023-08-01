import React from 'react';
import { Routes, Route } from "react-router-dom";
import ViewVideos from './pages/viewvideos.js';
import LoginPage from './pages/loginpage.js';
import UploadVideos from './pages/uploadvids.js';
import UploadMats from './pages/uploadmats.js';
import Progress from './pages/manage_progress.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <UploadVideos />   */} {/* error in this shit */}
        <Route path='/' element={<LoginPage/>}></Route>
        <Route path='view-video' element={<ViewVideos/>}></Route>
        <Route path='upload-materials' element={<UploadMats />}></Route>
        <Route path='progress' element={<Progress/>}></Route>

      </Routes>
    </div>
  );
}

export default App;
