import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
} from '@mui/material';

const Video = () => {
  const [video, setVideo] = useState(null);

  useEffect(() => {
    fetchVideo();
  }, []);

  const fetchVideo = async () => {
    try {
      const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=JnTa9XtvmfI&key=AIzaSyCwFCtsVRp1947x3ljK41KSinRFvnzwUlc`
      );

      setVideo(response.data.items[0]);
    } catch (error) {
      console.error('Error fetching video:', error);
    }
  };

  // State to store user's answers to math questions
  const [answers, setAnswers] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
  });

  // Function to handle user's answers
  const handleAnswerChange = (event) => {
    const { name, value } = event.target;
    setAnswers({ ...answers, [name]: value });
  };

  // Function to handle the submit button click
  const handleSubmit = () => {
    // You can now access the user's answers in the 'answers' state
    console.log(answers);

    // Check if the user's answers are correct and display an alert
    if (
      answers.q1 === '2' &&
      answers.q2 === '4' &&
      answers.q3 === '6' &&
      answers.q4 === '8' &&
      answers.q5 === '10'
    ) {
      alert('You got all the answers right!');

    } else {
      alert('One or more of your answers are incorrect. Please try again.');
    }


  };

  if (!video) {
    return <div>Loading...</div>;
  }

  return (
      <Grid container spacing={2} justifyContent="flex-end" paddingTop={"10%"} paddingLeft={4}>
        {/* Video Player */}
        <Grid item xs={12} md={8}>
          <div className="video-container">
            <div className="video-wrapper">
              <iframe
                  className="video-iframe"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.snippet.title}
                  frameBorder="0"
                  allowFullScreen
              ></iframe>
            </div>
          </div>
        </Grid>

        {/* Exercise Box */}
        <Grid item xs={12} md={4} paddingRight={2}>
          <Paper elevation={3} style={{ padding: '20px', paddingLeft: '60px' , }}>
            <Typography variant="h6">Math Questions</Typography>
            <TextField
                name="q1"
                label="1 + 1 = ?"
                fullWidth
                margin="center"
                variant="outlined"
                onChange={handleAnswerChange}
            />
            <TextField
                name="q2"
                label= "2 + 2 = ?"
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={handleAnswerChange}
            />
            <TextField
                name="q3"
                label= "3 + 3 = ?"
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={handleAnswerChange}
            />
            <TextField
                name="q4"
                label= "4 + 4 = ?"
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={handleAnswerChange}
            />
            <TextField
                name="q5"
                label= "5 + 5 = ?"
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={handleAnswerChange}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={{ marginTop: '16px' }}
            >
              Submit
            </Button>
          </Paper>
        </Grid>
      </Grid>
  );
};

export default Video;
