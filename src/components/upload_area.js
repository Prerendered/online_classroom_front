import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Grid, TextField, Typography, Input } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import { useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InfoIcon from '@mui/icons-material/Info';

import "../App.css";

const theme = createTheme({
  typography: {
    fontFamily: "'Roboto Condensed', sans-serif",
  },
});

const UploadArea = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [titleDialogOpen, setTitleDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorDialogMessage, setErrorDialogMessage] = useState("");
  const [file, setFile] = useState(null);
  const [videoName, setVideoName] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const { name } = useParams(); // Getting the 'name' from the URL

  const [exerciseDialogOpen, setExerciseDialogOpen] = useState(false);
  const [exerciseQuestions, setExerciseQuestions] = useState([
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
  ]);

  const [exerciseAnswers , setExerciseAnswers] = useState([
    { answer: ""},
    { answer: ""},
    { answer: ""},
    { answer: ""},
    { answer: ""},
  ]);

  const [infoDialogOpen, setInfoDialogOpen] = useState(false);

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

  const handleExerciseDialogOpen = () => {
    setExerciseDialogOpen(true);
  };

  const handleExerciseDialogClose = () => {
    setExerciseDialogOpen(false);
  }

  const handleInfoDialogOpen = () => {
    setInfoDialogOpen(true);
  };

  const handleInfoDialogClose = () => {
    setInfoDialogOpen(false);
  };

  const handleQuestionChange = (index, event, field) => {
    const newQuestions = [...exerciseQuestions];
    newQuestions[index][field] = event.target.value;
    setExerciseQuestions(newQuestions);
  };

  const handleAnswerChange = (index, event, field) => {
    const newAnswers = [...exerciseAnswers];
    newAnswers[index][field] = event.target.value;
    setExerciseAnswers(newAnswers);
  };

  const handleExerciseUpload = async () => {
    // Create an array of exercise objects based on the questions and answers
    const exerciseData = exerciseQuestions.map((question, index) => ({
      question: question.question,
      answer: exerciseAnswers[index].answer,
      subject: videoName,
      completed: false, // Assuming it should always be true
    }));

    // check if the user has filled all the questions and answer fields if not send a error message
    for (const exercise of exerciseData) {
      if (exercise.question.trim() === "") {
        setErrorDialogMessage("Question is required");
        setErrorDialogOpen(true);
        return;
      }

      if (exercise.answer.trim() === "") {
        setErrorDialogMessage("Answer is required");
        setErrorDialogOpen(true);
        return;
      }

      if (videoName.trim() === "") {
        setErrorDialogMessage("Please add a title to the video.");
        setErrorDialogOpen(true);
        return;
      }
    }

    try {
      // Send a POST request for each exercise object in the array
      for (const exercise of exerciseData) {
        const response = await axios.post("https://online-classroom-backend.onrender.com/api/exercises/save", exercise);

        if (response.status === 200) {
          // Exercise saved successfully
          console.log("Exercise saved successfully:", response.data);
        } else {
          console.error("Failed to save the exercise.");
        }
      }
      // Close the dialog
      handleExerciseDialogClose();
    } catch (error) {
      console.error("Error saving exercise:", error);
    }
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
      <ThemeProvider theme={theme}>
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

          <Dialog open={exerciseDialogOpen} onClose={handleExerciseDialogClose} sx={{ width: "50%" }}>
            <DialogTitle>Submit Exercise</DialogTitle>
            {exerciseQuestions.map((question, index) => (
                <div key={index} sx={{ margin: "2px" }}>
                  <Typography variant="body1"  sx={{ marginLeft: "2%", marginRight: "2%" }} ></Typography>
                  <TextField
                      name={`question-${index}`}
                      label={`Question ${index + 1}`}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      onChange={(event) => handleQuestionChange(index, event, "question")}
                      value={question.question}
                      sx={{ margin: "2px" }}
                  />
                  <TextField
                      name={`answer-${index}`}
                      label={`Answer for Question ${index + 1}`}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      sx={{ margin: "3px" }}
                      onChange={(event) => handleAnswerChange(index, event, "answer")}
                      value={exerciseAnswers[index].answer}
                  />
                </div>
            ))}
            <DialogActions>
              <Button onClick={handleExerciseDialogClose}>Cancel</Button>
              <Button onClick={handleExerciseUpload}>Confirm</Button>
            </DialogActions>
          </Dialog>

          <Dialog open={infoDialogOpen} onClose={handleInfoDialogClose}>
            <DialogTitle>Exercise Submission Instructions</DialogTitle>
            <Typography variant="body1" sx={{ margin: "16px" }}>
              Here are the instructions for submitting the exercise:
              <ol>
                <li>Upload 5 questions and provide one answer for each question.</li>
                <li>If a question has a static answer, you can use 'true' or 'false' as the answer.</li>
                <li>Make sure that all fields are filled for each question and answer.</li>
              </ol>
            </Typography>
            <DialogActions>
              <Button onClick={handleInfoDialogClose}>OK</Button>
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
              <Typography gutterBottom variant="h4" component="div" align="left" fontWeight={'bold'} fontSize={50} fontFamily={"Roboto Condensed, sans-serif"}>
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
                  flexDirection
                      : "column",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 8,
                  borderRadius:'20px',
                  borderColor:'black',
                  borderWidth:"2px"
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
              <Box className="upload-button-container" sx={{ margin: 4 }}>
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
                <Button
                  variant="contained"
                  className="upload-button"
                  sx={{
                    bgcolor: "black",
                    color: "white",
                    "&:hover": { bgcolor: "#00ADB5", color: "white" },
                    margin: "10px",
                    marginLeft: "30px"
          
                  }}
                  onClick={handleExerciseDialogOpen}
              >
                Submit Exercise
              </Button>
              <Button

                  variant="contained"
                  className="info-button"
                  sx={{
                    bgcolor: "black",
                    color: "white",
                    "&:hover": { bgcolor: "#00ADB5", color: "white" },
                    
                    minWidth: 0, // Set the minimum width to zero to make the icon button small
                  }}
                  onClick={handleInfoDialogOpen}
              >
                <InfoIcon />

              </Button>

              
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
  );
};

export default UploadArea;
