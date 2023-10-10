import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Grid, TextField, Typography, Input } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useParams } from "react-router-dom";

import "../App.css";

const UploadArea = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [titleDialogOpen, setTitleDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorDialogMessage, setErrorDialogMessage] = useState("");
  const [file, setFile] = useState(null);
  const [videoName, setVideoName] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const { name } = useParams(); // Getting the 'name' from the URL

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

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleTitleDialogOpen = () => {
    setTitleDialogOpen(false);
  };

  const handleCloseErrorDialog = () => {
    setErrorDialogOpen(false);
  };

  const handleUpload = async () => {
    if (!file) {
      setErrorDialogMessage("Please select a file to upload.");
      setErrorDialogOpen(true);
      return;
    }

    if (videoName.trim() === "") {
      setErrorDialogMessage("Please add a title to the video.");
      setErrorDialogOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unpgrady"); // replace 'unpgrady' with the name of your upload preset if different
    formData.append("context", `alt=${videoDescription}|caption=${videoName}`);
    formData.append("public_id", `video/${name}`); // Set custom public_id

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dalwgxr3j/video/upload`, // replace 'your_cloud_name' with your Cloudinary cloud name
        formData
      );
      console.log("Video uploaded successfully:", response.data);
      setDialogOpen(true);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  return (
    <Grid
      container
      sx={{ height: "80vh", justifyContent: "center", alignItems: "center" }}
    >
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Video uploaded successfully</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog}>OK</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={titleDialogOpen} onClose={handleTitleDialogOpen}>
        <DialogTitle>Title added successfully</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog}>OK</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={errorDialogOpen}
        onClose={handleCloseErrorDialog}
        sx={{
          "& .MuiPaper-root": { backgroundColor: "#EEEEEE", width: "25%" },
        }}
      >
        <DialogTitle>Error</DialogTitle>
        <Typography variant="h6" sx={{ margin: 2 }} align="center">
          {errorDialogMessage}
        </Typography>
        <DialogActions>
          <Button onClick={handleCloseErrorDialog}>OK</Button>
        </DialogActions>
      </Dialog>
      <Grid
        item
        xs
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "75%",
          margin: "2%",
        }}
      >
        <div>
          <Typography gutterBottom variant="h4" component="div" align="left">
            Topic name: {name}
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="vid_title"
            label="Video Title"
            name="vid_title"
            value={videoName}
            onChange={(e) => setVideoName(e.target.value)}
            autoFocus
          />

          <TextField
            id="vid_desc"
            label="Video description"
            multiline
            fullWidth
            rows={4}
            variant="filled"
            value={videoDescription}
            onChange={(e) => setVideoDescription(e.target.value)}
          />
        </div>
      </Grid>
      <Grid
        item
        xs={8}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
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
              inputProps={{ accept: ".mp4,.webm,.mov" }}
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
      </Grid>
    </Grid>
  );
};

export default UploadArea;
