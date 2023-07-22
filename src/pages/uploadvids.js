import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import '../App.css';
import '../components/navbar.css';
import Navbar from '../components/navbar.js';
import './uploadvids.css';

const UploadVideos = () => {
  const [file, setFile] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    // Handle file upload logic here
    console.log('File uploaded:', file);
  };

  return (
    <div>
      <Navbar />
      
    </div>
  );
};

export default UploadVideos;
