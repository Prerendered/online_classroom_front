import React from 'react';


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
