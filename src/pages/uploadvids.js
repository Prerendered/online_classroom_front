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
      <h1 className="header">Upload video</h1>
      <div className='full-content'>
        {/* description container  */}
        <div className='title-desc-container'>
          <h1 className="sub-header">Enter details</h1>
            <div className='Title-container'>
              <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                required
                className='title-label'
              />
            </div>
            <div className='desc-container'>
              <TextField
                id="outlined-basic"
                label="Description (optional)"
                variant="outlined"
                multiline
                rows={4}
                className='desc-label'
              />
            </div>
            <div className='upload-button-container'>
              <Button
                variant="contained"
                className="upload-button"
                style={{ backgroundColor: '#00adb5', color: 'white' }}
                onClick={handleUpload}
              >
                Upload
              </Button>
            </div>
        </div>  

        {/* preview container */}
        <div className="preview-container">
          <h1 className="smol-header">Preview</h1>
        </div>

        {/* Drop zone container */}
        <div className='dropzone-container'>
          <div className='drop-zone'
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {file ? (
              <p className='drop-custom0'>File selected: {file.name}</p>
            ) : (
              <p className='drop-custom'>Drag and drop file here 
                <p className='drop-custom2'>or</p>
              </p>
            )}
            <input
              type="file"
              id="fileInput"
              accept=".mp4, .mov, .avi, .mkv,"
              onChange={handleFileInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadVideos;
