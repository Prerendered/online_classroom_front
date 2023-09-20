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
import StudentPage from './pages/forum_student.js';
import TeacherPage from './pages/forum_teacher.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<StudentPage />} />
        <Route path="/teacher" element={<TeacherPage />} />
      </Routes>
    </div>
  );
}

export default App;
