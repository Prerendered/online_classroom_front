import React from 'react';
import { Routes, Route } from "react-router-dom";
import ViewVideos from './pages/viewvideos.js';
import LoginPage from './pages/loginpage.js';
import UploadVideos from './pages/uploadvids.js';
import Errorpage from './pages/errorpage.js';
import UploadMats from './pages/uploadmats.js';
import Progress from './pages/manage_progress.js';
import StudentDashboard from './pages/student_dashboard.js';
import TeacherDashboard from './pages/teacher_dashboard.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginPage/>}></Route>
        <Route path='student-dashboard' element={<StudentDashboard/>}></Route>
        <Route path='teacher-dashboard' element={<TeacherDashboard/>}></Route>
        <Route path='progress' element={<Progress/>}></Route>
        <Route path='view-video/:name' element={<ViewVideos/>}></Route>  {/*here the /:name makes it so i can pass strings to the path*/}
        <Route path='upload-materials' element={<UploadMats />}></Route>
        <Route path='progress' element={<Progress/>}></Route>
        <Route path='error' element={<Errorpage/>}></Route> 
        <Route path='upload-videos' element={<UploadVideos/>}></Route> 
      </Routes>
    </div>
  );
}

export default App;
