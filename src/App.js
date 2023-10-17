import './styles.css';

import React from 'react';
import { Routes, Route } from "react-router-dom";
import ViewVideos from './pages/viewvideos.js';
import LoginPage from './pages/loginpage.js';
import UploadVideos from './pages/uploadvids.js';
import UploadMats from './pages/uploadmats.js';
import StudentForum from './pages/forum_student.js';
import TeacherForum from './pages/forum_teacher.js';
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
        <Route path='view-video/:name' element={<ViewVideos/>}></Route>  {/* here the /:name makes it so i can pass strings to the path  */}        
        <Route path='upload-materials' element={<UploadMats />}></Route>
        <Route path='upload-videos/:name' element={<UploadVideos/>}></Route>  
        <Route path='forum/student' element={<StudentForum/>}></Route>
        <Route path='forum/teacher' element={<TeacherForum/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
