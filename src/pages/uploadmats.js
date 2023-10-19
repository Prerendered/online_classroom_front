import React, { useState } from "react";
import { Button } from "@mui/material";
import "../App.css";
import Navbar from "../components/navbar.js";
import "./uploadmats.css";

const UploadMats = () => {
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
    console.log("File uploaded:", file);
  };

  return (
    <div>
      <Navbar />
      <h1 className="header">Upload Learning Materials</h1>
      <div className="full-content">
        {/* Drop zone container */}
        <div className="dropzone-container">
          <div
            className="drop-zone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {file ? (
              <p className="drop-custom0">File selected: {file.name}</p>
            ) : (
              <p className="drop-custom">
                Drag and drop file here
                <p className="drop-custom2">or</p>
              </p>
            )}
            <input
              type="file"
              id="fileInput"
              accept=".pdf"
              onChange={handleFileInputChange}
            />
          </div>
          {/* upload button */}
          <div className="upload-button-container">
            <Button
              variant="contained"
              className="upload-button"
              style={{ backgroundColor: "#00adb5", color: "white" }}
              onClick={handleUpload}
            >
              Upload
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadMats;
