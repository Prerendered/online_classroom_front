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
import Viewvideos from "./pages/viewvideos.js";

function App() {
  return (
    <div className="App">
      {/* <ViewVideos/> */}
      <Viewvideos/>
      {/* <Routes>
        <Route path='/' element={<LoginPage/>}></Route>
        <Route path='student-dashboard' element={<StudentDashboard/>}></Route>
        <Route path='teacher-dashboard' element={<TeacherDashboard/>}></Route>
        <Route path='progress' element={<Progress/>}></Route>
        <Route path='view-video' element={<ViewVideos/>}></Route>
        <Route path='upload-materials' element={<UploadMats />}></Route>
        <Route path='progress' element={<Progress/>}></Route>
        <Route path='error' element={<Errorpage/>}></Route> 
      </Routes> */}
    </div>
  );
}

export default App;
