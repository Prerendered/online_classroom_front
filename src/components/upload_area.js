import React, { useState } from "react";
import { Box, Button, Grid, styled, Typography, Input } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import "../App.css";

const UploadArea = () => {
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
    <Box
      className="dropzone-container"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
      }}
    >
      <Box
        className="drop-zone"
        epic
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: 10,
        }}
      >
        {file ? (
          <Typography className="drop-custom0">
            File selected: {file.name}
          </Typography>
        ) : (
          <Typography className="drop-custom">
            Drag and drop file here
            <Typography className="drop-custom2">or</Typography>
          </Typography>
        )}
        <Input
          type="file"
          id="fileInput"
          inputProps={{ accept: ".mp4" }}
          onChange={handleFileInputChange}
        />
      </Box>
      {/* Upload button */}
      <Box className="upload-button-container" sx={{ margin: 10 }}>
        <Button
          variant="contained"
          className="upload-button"
          sx={{
            bgcolor: "black",
            color: "white",
            "&:hover": { bgcolor: "#00ADB5", color: "white" },
          }}
          onClick={handleUpload}
        >
          Upload Video
        </Button>
      </Box>
    </Box>
  );
};

export default UploadArea;
