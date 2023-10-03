import React, { useState } from "react";
import axios from 'axios';
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

  const handleUpload = async () => {
    const authToken = "801940911266-nn1g9cfe1r084drg5v6o75rq1r59tedn.apps.googleusercontent.com"; // Obtain this token via OAuth 2.0

    const videoMetadata = {
      snippet: {
        title: "Test", // Replace with title from your other page
        description: "Test", // Replace with description from your other page
        categoryId: "22", // The YouTube video category ID
      },
      status: {
        privacyStatus: "unlisted", // Set video privacy status
      },
    };

    const videoUploadConfig = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      // Step 1: Initialize the video upload
      const initUploadResponse = await axios.post(
        "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
        videoMetadata,
        videoUploadConfig
      );

      const uploadUrl = initUploadResponse.headers.location;

      // Step 2: Upload the video file
      const fileUploadConfig = {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": file.type,
          "X-Upload-Content-Length": file.size,
        },
      };

      const uploadResponse = await axios.put(uploadUrl, file, fileUploadConfig);

      console.log("Video uploaded successfully:", uploadResponse.data);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
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
          inputProps={{ accept: ".mp4,.webm" }}
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
